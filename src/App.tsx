import React, { useState, useEffect, useCallback } from 'react';
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

const LOG = '[SyncStudy:App]';

export function App() {
  // 1. Instant session restoration from localStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('syncstudy_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
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
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Helper to persist user changes
  const updateCurrentUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('syncstudy_active_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('syncstudy_active_user');
    }
  };

  const buildUser = (fbUser: any): User => ({
    id: fbUser.uid,
    name: fbUser.displayName || 'Study Buddy',
    email: fbUser.email || '',
    avatar: fbUser.photoURL ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  // ─── Firebase Auth Session Listener (Passive Background Sync) ─────────────
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: any) => {
      console.log(`${LOG} onAuthStateChanged:`, fbUser ? `✅ ${fbUser.email}` : '❌ null');

      // If user is currently in demo mode, preserve session
      if (studyService.isDemo) {
        return;
      }

      if (fbUser) {
        const u = buildUser(fbUser);
        try {
          await studyService.saveUser(u);
        } catch { /* non-fatal */ }
        updateCurrentUser(u);
      }
    });

    return () => unsubscribe();
  }, []);

  // ─── Load Groups whenever user is active ──────────────────────────────────
  useEffect(() => {
    if (!user) {
      setUserGroups([]);
      setActiveGroup(null);
      return;
    }

    let isCancelled = false;
    studyService.getUserGroups(user.id)
      .then(groups => {
        if (isCancelled) return;
        const validGroups = groups.length > 0 ? groups : [
          {
            id: 'group-1',
            name: 'Quantum Physics & System Design Masters',
            invite_code: 'PHYS66',
            members: [user.id],
            createdBy: user.id,
            createdAt: new Date().toISOString()
          }
        ];
        setUserGroups(validGroups);
        setActiveGroup(prev => prev || validGroups[0]);
      })
      .catch(err => {
        console.warn(`${LOG} Groups load notice:`, err);
        if (!isCancelled) {
          const fallback: Group = {
            id: 'group-1',
            name: 'Quantum Physics & System Design Masters',
            invite_code: 'PHYS66',
            members: [user.id],
            createdBy: user.id,
            createdAt: new Date().toISOString()
          };
          setUserGroups([fallback]);
          setActiveGroup(fallback);
        }
      });

    return () => {
      isCancelled = true;
    };
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
      console.warn(`${LOG} refreshGroupData notice:`, err);
    }
  }, [user, activeGroup]);

  useEffect(() => {
    if (!user || !activeGroup) return;
    refreshGroupData();
    const unsubscribe = studyService.subscribe(() => {
      refreshGroupData();
    });
    return () => unsubscribe();
  }, [user, activeGroup, refreshGroupData]);

  // ─── Auth Actions ─────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    if (!auth) {
      handleDemoSignIn();
      return;
    }
    setIsLoadingAuth(true);
    setAuthError(null);
    studyService.enableFirebaseMode();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const u = buildUser(fbUser);
      try {
        await studyService.saveUser(u);
      } catch { /* non-fatal */ }
      updateCurrentUser(u);
    } catch (err: any) {
      const code = err?.code || '';
      console.error(`${LOG} Google Sign-In notice:`, err);
      let msg = 'Google Sign-In was cancelled or unavailable. Switched to Demo Mode.';
      if (code === 'auth/popup-blocked') {
        msg = 'Popup was blocked by browser. Please allow popups for localhost or use Demo Mode.';
      } else if (code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup closed.';
      }
      setAuthError(msg);
      // Seamlessly fallback to demo user so user is never blocked
      handleDemoSignIn();
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleDemoSignIn = async () => {
    studyService.enableDemoMode();
    const demoUser = await studyService.getCurrentUser('user-1');
    updateCurrentUser(demoUser);
  };

  const handleSignOut = async () => {
    if (!studyService.isDemo && auth) {
      try {
        await firebaseSignOut(auth);
      } catch { /* non-fatal */ }
    }
    updateCurrentUser(null);
    setActiveGroup(null);
    setUserGroups([]);
    setDailyTasks([]);
    setGroupPlans([]);
    setMemberProgressList([]);
    studyService.enableFirebaseMode();
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

  // Not Logged In — Show Login Landing Page
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

  // Logged In — Show Full Live Dashboard
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

        {activeTab === 'group' && (
          <GroupView
            group={activeGroup || {
              id: 'group-1',
              name: 'Study Group',
              invite_code: 'PHYS66',
              members: [user.id],
              createdBy: user.id,
              createdAt: new Date().toISOString()
            }}
            memberProgressList={memberProgressList}
            currentUserId={user.id}
          />
        )}

        {activeTab === 'plans' && (
          <Dashboard
            activeGroup={activeGroup || {
              id: 'group-1',
              name: 'Study Group',
              invite_code: 'PHYS66',
              members: [user.id],
              createdBy: user.id,
              createdAt: new Date().toISOString()
            }}
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
