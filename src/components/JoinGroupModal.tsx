import React, { useState } from 'react';
import { Group } from '../types';
import { Users, Plus, KeyRound, X, Sparkles, Check, ArrowRight, Shield, Loader2 } from 'lucide-react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinGroup: (code: string) => Promise<void>;
  onCreateGroup: (name: string) => Promise<void>;
  userGroups: Group[];
  activeGroup: Group | null;
  onSelectGroup: (group: Group) => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  isOpen,
  onClose,
  onJoinGroup,
  onCreateGroup,
  userGroups,
  activeGroup,
  onSelectGroup
}) => {
  const [tab, setTab] = useState<'join' | 'create'>('join');
  const [inviteCode, setInviteCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await onJoinGroup(inviteCode.trim());
      setInviteCode('');
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to join group. Check the 6-character code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await onCreateGroup(newGroupName.trim());
      setNewGroupName('');
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create group.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/[0.12] p-5 sm:p-8 shadow-2xl relative bg-[#0E111C]/95">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>Squad Hub</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">Study Groups</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Connect with peers using a 6-character invite code or create a new study squad.
          </p>
        </div>

        {/* Existing Groups List */}
        {userGroups.length > 0 && (
          <div className="mb-6 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Your Active Groups
            </span>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {userGroups.map((g) => (
                <div
                  key={g.id}
                  onClick={() => {
                    onSelectGroup(g);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition select-none ${
                    activeGroup?.id === g.id
                      ? 'bg-violet-950/70 border-violet-500/80 text-white shadow-lg shadow-violet-950/40'
                      : 'bg-[#121626] border-white/[0.06] text-slate-300 hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Users className="w-4 h-4 text-violet-400 shrink-0" />
                    <span className="text-sm font-bold truncate">{g.name}</span>
                  </div>
                  {activeGroup?.id === g.id && (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex bg-[#121626] p-1 rounded-2xl border border-white/[0.08] mb-5 shadow-inner">
          <button
            onClick={() => { setTab('join'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'join' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Enter 6-Char Code
          </button>
          <button
            onClick={() => { setTab('create'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'create' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create New Group
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-700/60 text-rose-200 text-xs leading-relaxed">
            {errorMsg}
          </div>
        )}

        {tab === 'join' ? (
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Invite Code
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. SDE001"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full bg-[#101424] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-center tracking-widest font-mono text-xl font-black text-violet-300 uppercase placeholder-slate-600 focus:outline-none focus:border-violet-500 transition shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !inviteCode.trim()}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-2xl transition transform active:scale-98 shadow-xl shadow-violet-600/30 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Joining Squad...</span>
                </>
              ) : (
                <span>Join Group</span>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g. FAANG 2026 Sprint Squad"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-[#101424] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-violet-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newGroupName.trim()}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-2xl transition transform active:scale-98 shadow-xl shadow-violet-600/30 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Squad...</span>
                </>
              ) : (
                <span>Create Group</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
