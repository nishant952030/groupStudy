import React, { useState } from 'react';
import { Group } from '../types';
import { Users, Plus, KeyRound, X, Sparkles, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-bold text-white">Study Groups</h2>
          <p className="text-slate-400 text-xs">
            Connect with friends using a 6-character invite code or start a new group.
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
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    activeGroup?.id === g.id
                      ? 'bg-brand-950/60 border-brand-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Users className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <span className="text-sm font-semibold truncate">{g.name}</span>
                  </div>
                  {activeGroup?.id === g.id && (
                    <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            onClick={() => { setTab('join'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              tab === 'join' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Enter 6-Char Code
          </button>
          <button
            onClick={() => { setTab('create'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              tab === 'create' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create New Group
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-300 text-xs">
            {errorMsg}
          </div>
        )}

        {tab === 'join' ? (
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Invite Code
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. PHYS66"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-center tracking-widest font-mono text-lg font-bold text-indigo-300 uppercase placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !inviteCode.trim()}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
            >
              {isSubmitting ? 'Joining...' : 'Join Group'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g. Quantum Physics Masters"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newGroupName.trim()}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create Group'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
