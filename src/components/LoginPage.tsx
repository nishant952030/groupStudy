import React from 'react';
import { Sparkles, Calendar, Zap, Users, ArrowRight, AlertCircle, X, ExternalLink, Flame, CheckCircle2, ShieldCheck, Map, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#07080D] flex flex-col justify-between relative overflow-hidden text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
      {/* Background dynamic ambient glow spheres */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-violet-600/25 via-indigo-600/20 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[450px] h-[450px] bg-fuchsia-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-[-5%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/30">
            <div className="w-full h-full bg-[#0E111C] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-400" />
            </div>
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-white">SyncStudy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Study Squad Tracker
          </span>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-4xl w-full mx-auto px-6 py-8 sm:py-12 z-10 text-center flex flex-col items-center">
        
        {/* Floating Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-300 text-xs font-bold mb-6 shadow-lg shadow-violet-950/50 backdrop-blur-xl">
          <Flame className="w-3.5 h-3.5 text-violet-400" />
          <span>Built for Job Switch & Exam Preparation</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight max-w-3xl leading-[1.08] mb-6">
          Set a plan once. <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            Track daily with friends.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-normal">
          Organize your roadmaps into ordered topics (Arrays, Trees, System Design) with clear subtasks. Each teammate starts at 0% and picks daily tasks at their own pace.
        </p>

        {/* Error Banner */}
        {authError && (
          <div className="w-full max-w-md mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-700/60 text-rose-200 text-sm relative text-left shadow-2xl backdrop-blur-xl">
            <button
              onClick={onClearError}
              className="absolute top-3 right-3 text-rose-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-2.5 pr-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
              <div className="space-y-1.5">
                <p className="font-bold text-white text-sm">Sign-In Notice</p>
                <p className="text-xs text-rose-200 leading-relaxed">{authError}</p>
                <p className="text-[11px] text-rose-300/80 pt-1">
                  You can explore full functionality immediately with <strong>Explore Demo Mode</strong>!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-16">
          <button
            onClick={onGoogleSignIn}
            disabled={isLoading}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-xl shadow-white/10 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-violet-600" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <button
            onClick={onDemoSignIn}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#121624] hover:bg-[#181D30] text-slate-200 hover:text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-white/[0.1] hover:border-violet-500/40 transition transform active:scale-95 cursor-pointer shadow-lg"
          >
            <span>Explore Demo</span>
            <ArrowRight className="w-4 h-4 text-violet-400" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl w-full text-left">
          
          <div className="glass-card-interactive p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-violet-950/80 border border-violet-700/50 flex items-center justify-center text-violet-400 mb-4 shadow-lg shadow-violet-950/50">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-1.5">Curriculum Roadmaps</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Organize your preparation by sequential topics with subtasks, LeetCode links, and estimated study hours.
            </p>
          </div>

          <div className="glass-card-interactive p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-950/50">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-1.5">Daily Focus Queue</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pick what you want to conquer today from your roadmap. Check them off with instant confetti and log private notes.
            </p>
          </div>

          <div className="glass-card-interactive p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950/50">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-1.5">Squad Accountability</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Share your 6-char group code. Every teammate starts with a clean slate and sees everyone's real-time progress.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-8 text-center text-xs text-slate-500 z-10 border-t border-white/[0.05]">
        SyncStudy &bull; Set a plan once, track it daily with friends.
      </footer>
    </div>
  );
};
