import React from 'react';
import { Loader2, Chrome } from 'lucide-react';

interface Props {
  onGoogleSignIn: () => void;
  isLoading: boolean;
  authError: string | null;
  onClearError: () => void;
}

export const LoginPage: React.FC<Props> = ({ onGoogleSignIn, isLoading, authError, onClearError }) => (
  <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4">
    <div className="w-full max-w-sm space-y-8">
      {/* Logo */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl font-bold text-zinc-100 mx-auto">
          S
        </div>
        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">SyncStudy</h1>
        <p className="text-sm text-zinc-400">Study Striver's 180 together with your squad.</p>
      </div>

      {/* Sign in card */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 space-y-4">
        {authError && (
          <div className="bg-red-950/40 border border-red-800/60 rounded-lg p-3 flex items-start justify-between gap-2">
            <p className="text-xs text-red-300">{authError}</p>
            <button onClick={onClearError} className="text-red-500 hover:text-red-300 text-xs shrink-0">✕</button>
          </div>
        )}

        <button
          onClick={onGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-sm transition disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Chrome className="w-4 h-4" />
          )}
          <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>

        <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
          By signing in you agree to study hard and help your friends.
        </p>
      </div>
    </div>
  </div>
);
