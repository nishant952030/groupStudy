import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, Group, Plan, DailyPullTask, MemberProgress } from './types';
import { studyService } from './services/studyService';
import { auth, googleProvider } from './services/firebase';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { TodayView } from './components/TodayView';
import { GroupView } from './components/GroupView';
import { Dashboard } from './components/Dashboard';
import { PlanSetupWizard } from './components/PlanSetupWizard';
import { JoinGroupModal } from './components/JoinGroupModal';

const LOG = '[SyncStudy]';

export function App() {
  // ─── Instant session restoration from localStorage ─────────────────────────
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('syncstudy_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Also restore the service mode
        const mode = localStorage.getItem('syncstudy_mode');
        if (mode === 'demo') studyService.enableDemoMode();
        else studyService.enableFirebaseMode();
        console.log(`${LOG} Restored session: ${parsed.name} (${mode || 'firebase'} mode)`);
        return parsed;
      }
    } catch {}
    return null;
  });

  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'group' | 'plans'>('today');

  const [dailyTasks, setDailyTasks] = useState<DailyPullTask[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dailyPercentage, setDailyPercentage] = useState(0);

  const [memberProgressList, setMemberProgressList] = useState<MemberProgress[]>([]);
  const [groupPlans, setGroupPlans] = useState<Plan[]>([]);

  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Guard: when we explicitly sign in, block onAuthStateChanged(null) from overriding
  const signInInProgress = useRef(false);

  // ─── Persist user to localStorage ──────────────────────────────────────────
  const persistUser = useCallback((newUser: User | null, mode: 'firebase' | 'demo') => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('syncstudy_user', JSON.stringify(newUser));
      localStorage.setItem('syncstudy_mode', mode);
    } else {
      localStorage.removeItem('syncstudy_user');
      localStorage.removeItem('syncstudy_mode');
    }
  }, []);

  const buildUser = (fbUser: any): User => ({
    id: fbUser.uid,
    name: fbUser.displayName || 'Study Buddy',
    email: fbUser.email || '',
    avatar: fbUser.photoURL ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  // ─── Firebase Auth Listener (background session sync) ──────────────────────
  // This ONLY handles: page refresh with existing Firebase session
  // It does NOT handle: initial sign-in (that's done in handleGoogleSignIn)
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (fbUser: any) => {
      console.log(`${LOG} onAuthStateChanged:`, fbUser ? `✅ ${fbUser.email}` : '❌ null');

      // NEVER override during an active sign-in flow
      if (signInInProgress.current) {
        console.log(`${LOG} Sign-in in progress — ignoring auth state change`);
        return;
      }

      // NEVER override if user is in demo mode
      if (studyService.isDemo) {
        console.log(`${LOG} Demo mode active — ignoring auth state change`);
        return;
      }

      // NEVER set user to null if we already have a persisted session
      // (this prevents the COOP-induced spurious null from kicking out a valid user)
      if (!fbUser && user) {
        console.log(`${LOG} Ignoring null — we have an active user: ${user.name}`);
        return;
      }

      // Positive signal: Firebase has a valid session (e.g. page refresh)
      if (fbUser && !user) {
        console.log(`${LOG} Restoring Firebase session for: ${fbUser.email}`);
        const u = buildUser(fbUser);
        studyService.enableFirebaseMode();
        persistUser(u, 'firebase');
      }
    });

    return () => unsubscribe();
  }, [user, persistUser]);

  // ─── Load Groups whenever user changes ────────────────────────────────────
  useEffect(() => {
    if (!user) {
      setUserGroups([]);
      setActiveGroup(null);
      return;
    }

    console.log(`${LOG} Loading groups for: ${user.name} (${user.id})`);
    let isCancelled = false;

    studyService.getUserGroups(user.id)
      .then(groups => {
        if (isCancelled) return;
        console.log(`${LOG} Groups loaded: ${groups.length}`, groups.map(g => g.name));
        const validGroups = groups.length > 0 ? groups : [{
          id: 'group-1',
          name: 'Study Group',
          invite_code: 'SYNC01',
          members: [user.id],
          createdBy: user.id,
          createdAt: new Date().toISOString()
        }];
        setUserGroups(validGroups);
        setActiveGroup(prev => prev || validGroups[0]);
      })
      .catch(err => {
        console.warn(`${LOG} Groups load error:`, err);
        if (!isCancelled) {
          const fallback: Group = {
            id: 'group-1',
            name: 'Study Group',
            invite_code: 'SYNC01',
            members: [user.id],
            createdBy: user.id,
            createdAt: new Date().toISOString()
          };
          setUserGroups([fallback]);
          setActiveGroup(fallback);
        }
      });

    return () => { isCancelled = true; };
  }, [user]);

  // ─── Load daily tasks & plans whenever activeGroup changes ────────────────
  const refreshGroupData = useCallback(async () => {
    if (!user || !activeGroup) return;
    try {
      const [pullResult, membersProgress, plans] = await Promise.all([
        studyService.getDailyTasksForUser(activeGroup.id, user.id),
        studyService.getGroupMembersProgress(activeGroup.id),
        studyService.getGroupPlans(activeGroup.id),
      ]);
      setDailyTasks(pullResult.tasks);
      setCompletedCount(pullResult.userCompletedToday);
      setTotalCount(pullResult.userTotalToday);
      setDailyPercentage(pullResult.dailyPercentage);
      setMemberProgressList(membersProgress);
      setGroupPlans(plans);
    } catch (err) {
      console.warn(`${LOG} refreshGroupData error:`, err);
    }
  }, [user, activeGroup]);

  useEffect(() => {
    if (!user || !activeGroup) return;
    refreshGroupData();
    const unsub = studyService.subscribe(() => refreshGroupData());
    return () => unsub();
  }, [user, activeGroup, refreshGroupData]);

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH ACTIONS — THE BULLETPROOF SIGN-IN FLOW
  // ═══════════════════════════════════════════════════════════════════════════
  const handleGoogleSignIn = async () => {
    if (!auth) {
      console.warn(`${LOG} No Firebase auth — falling back to demo`);
      handleDemoSignIn();
      return;
    }

    console.log(`${LOG} ▶ Google Sign-In starting...`);
    signInInProgress.current = true;  // Block onAuthStateChanged interference
    setIsLoadingAuth(true);
    setAuthError(null);
    studyService.enableFirebaseMode();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      console.log(`${LOG} ✅ Google Sign-In success: ${fbUser.email}`);

      const u = buildUser(fbUser);

      // Save to Firestore (non-blocking)
      studyService.saveUser(u).catch(e => console.warn(`${LOG} saveUser:`, e));

      // Persist and set state — this is the ONLY place that sets the user for Google sign-in
      persistUser(u, 'firebase');
      console.log(`${LOG} ✅ User state set — dashboard should render now`);

    } catch (err: any) {
      const code = err?.code || '';
      console.error(`${LOG} ❌ Google Sign-In error [${code}]:`, err.message);

      // Only show error for real failures, not user-cancelled actions
      if (code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Sign-in failed. Try Demo Mode instead.');
      }
      // Do NOT auto-fallback to demo — let user choose
    } finally {
      setIsLoadingAuth(false);
      // Release the guard after a short delay to let React re-render
      setTimeout(() => {
        signInInProgress.current = false;
      }, 2000);
    }
  };

  const handleDemoSignIn = async () => {
    console.log(`${LOG} ▶ Demo Sign-In`);
    signInInProgress.current = true;
    studyService.enableDemoMode();
    const demoUser = await studyService.getCurrentUser('user-1');
    persistUser(demoUser, 'demo');
    console.log(`${LOG} ✅ Demo user set: ${demoUser.name}`);
    setTimeout(() => { signInInProgress.current = false; }, 2000);
  };

  const handleSignOut = async () => {
    console.log(`${LOG} ▶ Sign-out`);
    signInInProgress.current = true;
    if (!studyService.isDemo && auth) {
      try { await firebaseSignOut(auth); } catch {}
    }
    persistUser(null, 'firebase');
    setActiveGroup(null);
    setUserGroups([]);
    setDailyTasks([]);
    setGroupPlans([]);
    setMemberProgressList([]);
    studyService.enableFirebaseMode();
    setTimeout(() => { signInInProgress.current = false; }, 1000);
  };

  // ─── Group & Task Actions ─────────────────────────────────────────────────
  const handleCreateGroup = async (name: string) => {
    if (!user) return;
    const newGroup = await studyService.createGroup(name, user.id);
    setUserGroups(prev => [...prev, newGroup]);
    setActiveGroup(newGroup);
  };

  const handleJoinGroup = async (code: string) => {
    if (!user) return;
    const group = await studyService.joinGroup(code, user.id);
    setUserGroups(prev => prev.some(g => g.id === group.id) ? prev : [...prev, group]);
    setActiveGroup(group);
  };

  const handleToggleTask = async (taskId: string, currentStatus: 'pending' | 'completed') => {
    if (!user || !activeGroup) return;
    await studyService.toggleTaskCompletion(taskId, user.id, currentStatus, activeGroup.id);
    await refreshGroupData();
  };

  const handleCreatePlan = async (data: {
    title: string;
    type: 'fixed' | 'rolling';
    deadline?: string;
    tasks: { title: string; scheduled_date?: string }[];
  }) => {
    if (!user || !activeGroup) return;
    await studyService.createPlan(activeGroup.id, data.title, data.type, data.deadline, data.tasks, user.id);
    await refreshGroupData();
  };

  // ─── Rendering ────────────────────────────────────────────────────────────

  // Not signed in → Landing / Login page
  if (!user) {
    return (
      <LoginPage
        onGoogleSignIn={handleGoogleSignIn}
        onDemoSignIn={handleDemoSignIn}
        isLoading={isLoadingAuth}
        authError={authError}
        onClearError={() => setAuthError(null)}
      />
    );
  }

  // Signed in → Full Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        currentUser={user}
        activeGroup={activeGroup}
        userGroups={userGroups}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectGroup={setActiveGroup}
        onOpenJoinGroup={() => setIsJoinGroupOpen(true)}
        onOpenCreatePlan={() => setIsCreatePlanOpen(true)}
        onSignOut={handleSignOut}
        isDemo={studyService.isDemo}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'today' && (
          <TodayView
            tasks={dailyTasks}
            completedCount={completedCount}
            totalCount={totalCount}
            dailyPercentage={dailyPercentage}
            onToggleTask={handleToggleTask}
            groupName={activeGroup?.name || 'Study Group'}
          />
        )}
        {activeTab === 'group' && activeGroup && (
          <GroupView
            group={activeGroup}
            memberProgressList={memberProgressList}
            currentUserId={user.id}
          />
        )}
        {activeTab === 'plans' && activeGroup && (
          <Dashboard
            activeGroup={activeGroup}
            plans={groupPlans}
            onOpenCreatePlan={() => setIsCreatePlanOpen(true)}
            onOpenJoinGroup={() => setIsJoinGroupOpen(true)}
            onSelectPlanTab={() => setActiveTab('plans')}
          />
        )}
      </main>

      <PlanSetupWizard
        isOpen={isCreatePlanOpen}
        onClose={() => setIsCreatePlanOpen(false)}
        onSubmit={handleCreatePlan}
      />
      <JoinGroupModal
        isOpen={isJoinGroupOpen}
        onClose={() => setIsJoinGroupOpen(false)}
        onJoinGroup={handleJoinGroup}
        onCreateGroup={handleCreateGroup}
        userGroups={userGroups}
        activeGroup={activeGroup}
        onSelectGroup={setActiveGroup}
      />
    </div>
  );
}
