import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJoinSquad: (code: string) => Promise<void>;
}

export const JoinSquadModal: React.FC<Props> = ({ isOpen, onClose, onJoinSquad }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await onJoinSquad(code.trim().toUpperCase());
      setCode('');
    } catch (err: any) {
      setError(err.message || 'Invalid invite code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#111113] border border-zinc-800 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-100">Join Squad</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Invite Code</label>
            <input
              type="text"
              placeholder="e.g. AB12CD"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              autoFocus
              maxLength={8}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition font-mono tracking-widest"
            />
            <p className="text-[11px] text-zinc-500">Ask your squad creator for the 6-character code.</p>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || code.trim().length < 5}
              className="flex-1 py-2 text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Joining...' : 'Join'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
