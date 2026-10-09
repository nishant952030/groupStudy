import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, Squad } from './types';
import { studyService } from './services/studyService';
import { auth, googleProvider } from './services/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { TodayView } from './components/TodayView';
import { RoadmapView } from './components/RoadmapView';
import { SquadTab } from './components/SquadTab';
import { CreateSquadModal } from './components/CreateSquadModal';
import { JoinSquadModal } from './components/JoinSquadModal';

export type AppTab = 'today' | 'roadmap' | 'squad';

export function App() {
  // ─── Auth state (restored from localStorage) ────────────────────────────
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('syncstudy_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [squads, setSquads] = useState<Squad[]>([]);
  const [activeSquad, setActiveSquad] = useState<Squad | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('today');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const signInInProgress = useRef(false);

  // ─── Persist user ────────────────────────────────────────────────────────
  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem('syncstudy_user', JSON.stringify(u));
    else localStorage.removeItem('syncstudy_user');
  }, []);

  const buildUser = (fbUser: any): User => ({
    id: fbUser.uid,
    name: fbUser.displayName || 'Study Buddy',
    email: fbUser.email || '',
    avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`
  });

  // ─── Firebase auth listener ──────────────────────────────────────────────
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, fbUser => {
      if (signInInProgress.current) return;
      if (fbUser && !user) {
        persistUser(buildUser(fbUser));
      }
    });
    return unsub;
  }, [user, persistUser]);

  // ─── Save user profile to Firestore on login ─────────────────────────────
  useEffect(() => {
    if (user) studyService.saveUser(user).catch(() => {});
  }, [user]);

  // ─── Load squads when user changes ──────────────────────────────────────
  const loadSquads = useCallback(async () => {
    if (!user) { setSquads([]); setActiveSquad(null); return; }
    try {
      const userSquads = await studyService.getUserSquads(user.id);
      setSquads(userSquads);
      setActiveSquad(prev => {
        if (!prev) return userSquads[0] || null;
        return userSquads.find(s => s.id === prev.id) || userSquads[0] || null;
      });
    } catch (e) {
      console.warn('[App] loadSquads failed:', e);
    }
  }, [user]);

  useEffect(() => { loadSquads(); }, [loadSquads]);

  // ─── Auth actions ────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    if (!auth) { setAuthError('Firebase not configured'); return; }
    signInInProgress.current = true;
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = buildUser(result.user);
      await studyService.saveUser(u);
      persistUser(u);
    } catch (err: any) {
      const code = err?.code || '';
      if (code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Sign-in failed');
      }
    } finally {
      setIsLoadingAuth(false);
      setTimeout(() => { signInInProgress.current = false; }, 2000);
    }
  };

  const handleSignOut = async () => {
    signInInProgress.current = true;
    if (auth) { try { await firebaseSignOut(auth); } catch {} }
    persistUser(null);
    setSquads([]);
    setActiveSquad(null);
    setTimeout(() => { signInInProgress.current = false; }, 1000);
  };

  // ─── Squad actions ───────────────────────────────────────────────────────
  const handleCreateSquad = async (name: string) => {
    if (!user) return;
    const squad = await studyService.createSquad(name, user.id);
    setSquads(prev => [...prev, squad]);
    setActiveSquad(squad);
    setIsCreateOpen(false);
    setActiveTab('roadmap');
  };

  const handleJoinSquad = async (code: string) => {
    if (!user) return;
    const squad = await studyService.joinSquad(code, user.id);
    setSquads(prev => prev.some(s => s.id === squad.id) ? prev : [...prev, squad]);
    setActiveSquad(squad);
    setIsJoinOpen(false);
    setActiveTab('roadmap');
  };

  const handleMemberRemoved = () => {
    loadSquads();
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <LoginPage
        onGoogleSignIn={handleGoogleSignIn}
        isLoading={isLoadingAuth}
        authError={authError}
        onClearError={() => setAuthError(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-zinc-700 selection:text-white">
      <Navbar
        user={user}
        squads={squads}
        activeSquad={activeSquad}
        activeTab={activeTab}
        onSetTab={setActiveTab}
        onSelectSquad={setActiveSquad}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8">
        {!activeSquad ? (
          // No squad yet
          <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-200">
              S
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-zinc-100">No squad yet</h2>
              <p className="text-sm text-zinc-400 max-w-xs">
                Create a squad or join one with an invite code to start studying together.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-sm transition cursor-pointer"
              >
                Create Squad
              </button>
              <button
                onClick={() => setIsJoinOpen(true)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-sm transition cursor-pointer"
              >
                Join with Code
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'today' && (
              <TodayView
                squad={activeSquad}
                currentUser={user}
                onNavigateToRoadmap={() => setActiveTab('roadmap')}
              />
            )}
            {activeTab === 'roadmap' && (
              <RoadmapView
                squad={activeSquad}
                currentUserId={user.id}
              />
            )}
            {activeTab === 'squad' && (
              <SquadTab
                squad={activeSquad}
                currentUserId={user.id}
                onMemberRemoved={handleMemberRemoved}
                currentUser={user}
              />
            )}
          </>
        )}
      </main>

      <CreateSquadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateSquad={handleCreateSquad}
      />
      <JoinSquadModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onJoinSquad={handleJoinSquad}
      />
    </div>
  );
}
