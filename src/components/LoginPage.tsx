import React from 'react';
import { Sparkles, Calendar, Zap, Users, ArrowRight, AlertCircle, X, ExternalLink } from 'lucide-react';

interface LoginPageProps {
  onGoogleSignIn: () => void;
  onDemoSignIn: () => void;
  isLoading?: boolean;
  authError?: string | null;
  onClearError?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onGoogleSignIn,
  onDemoSignIn,
  isLoading = false,
  authError,
  onClearError
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-6 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">SyncStudy</span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          Collaborative Tracker
        </span>
      </header>

      {/* Main Hero Content */}
      <main className="max-w-4xl w-full mx-auto px-6 py-12 z-10 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5 text-brand-400" />
          <span>Set a plan once, track it daily with friends</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15] mb-6">
          Stop getting overwhelmed by <br />
          <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            massive study schedules.
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
          SyncStudy automatically pulls daily bite-sized tasks from your macro group plans (Fixed or Rolling Backlog) directly into a clean daily checklist.
        </p>

        {/* Error Banner */}
        {authError && (
          <div className="w-full max-w-md mb-4 p-4 rounded-2xl bg-red-950/60 border border-red-700/60 text-red-300 text-sm relative">
            <button
              onClick={onClearError}
              className="absolute top-3 right-3 text-red-400 hover:text-red-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-2.5 pr-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
              <div className="space-y-2">
                <p className="font-semibold text-red-200">Google Sign-In Failed</p>
                <p className="text-xs text-red-300/90 leading-relaxed">{authError}</p>
                <div className="pt-1 border-t border-red-800/50 space-y-1">
                  <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Firebase Setup Checklist:</p>
                  <ol className="text-[11px] text-red-300/80 space-y-1 list-decimal list-inside">
                    <li>Go to <span className="font-mono">Firebase Console → Authentication → Sign-in Method</span></li>
                    <li>Enable the <strong>Google</strong> provider</li>
                    <li>Go to <span className="font-mono">Authentication → Settings → Authorized domains</span></li>
                    <li>Add <span className="font-mono">localhost</span> to the list</li>
                  </ol>
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-200 transition mt-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Open Firebase Console
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-14">
          <button
            onClick={onGoogleSignIn}
            disabled={isLoading}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-6 py-3.5 rounded-xl shadow-xl shadow-white/5 transition transform active:scale-98 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <button
            onClick={onDemoSignIn}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium px-5 py-3.5 rounded-xl border border-slate-800 transition cursor-pointer"
          >
            <span>Explore Demo Mode</span>
            <ArrowRight className="w-4 h-4 text-brand-400" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl w-full text-left">
          
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-brand-950 border border-brand-800/50 flex items-center justify-center text-brand-400 mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">Fixed or Rolling Plans</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Choose fixed calendar dates or an automated rolling backlog queue that keeps your target deadline intact.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">Smart "Today" Pull</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              App automatically queues 3-5 daily tasks and carries over overdue tasks so you never lose track.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800/50 flex items-center justify-center text-sky-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">Friend Accountability</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Invite friends with a simple 6-character code. See live progress rings for every group member.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-600 z-10">
        SyncStudy &copy; {new Date().getFullYear()} &bull; Set a plan once, track it daily with friends.
      </footer>
    </div>
  );
};
