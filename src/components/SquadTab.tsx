import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Users, Loader2, UserMinus, Crown, Trophy } from 'lucide-react';
import { Squad, User, MemberStats } from '../types';
import { studyService } from '../services/studyService';

interface Props {
  squad: Squad;
  currentUserId: string;
  currentUser: User;
  onMemberRemoved: () => void;
}

export const SquadTab: React.FC<Props> = ({ squad, currentUserId, currentUser, onMemberRemoved }) => {
  const [stats, setStats] = useState<MemberStats[]>([]);
  const [members, setMembers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const isAdmin = squad.createdBy === currentUserId;

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const memberUsers = await studyService.getUsers(squad.members);
      setMembers(memberUsers);
      const membersList = Object.values(memberUsers);
      const memberStats = await studyService.getSquadMemberStats(squad.id, membersList);
      setStats(memberStats);
    } catch (e) {
      console.warn('[SquadTab] loadStats error:', e);
    } finally {
      setLoading(false);
    }
  }, [squad.id, squad.members.join(',')]);

  useEffect(() => { loadStats(); }, [loadStats]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(squad.invite_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveMember = async (memberId: string) => {
    setRemovingId(memberId);
    try {
      await studyService.removeMember(squad.id, memberId, currentUserId);
      setStats(prev => prev.filter(s => s.user.id !== memberId));
      setConfirmRemoveId(null);
      onMemberRemoved();
    } catch (e: any) {
      alert(e.message || 'Failed to remove member');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto pb-16">
      {/* ── Invite Code Card ── */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Invite Friends</p>
            <p className="text-xs text-zinc-400">Share this code with anyone you want to study with.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base font-bold font-mono text-zinc-100 tracking-widest bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg">
              {squad.invite_code}
            </span>
            <button
              onClick={handleCopyCode}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                copied
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
              title="Copy invite code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Leaderboard ── */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-200">Squad Progress</h3>
          <span className="ml-auto text-xs text-zinc-500 font-mono">{squad.members.length} members</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
          </div>
        ) : stats.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-zinc-500">No members found.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {stats.map((stat, idx) => {
              const isMe = stat.user.id === currentUserId;
              const isCreator = stat.user.id === squad.createdBy;
              const isConfirmingRemove = confirmRemoveId === stat.user.id;

              return (
                <div
                  key={stat.user.id}
                  className={`px-5 py-4 flex items-center gap-3.5 ${isMe ? 'bg-zinc-900/30' : ''}`}
                >
                  {/* Rank */}
                  <span className={`text-xs font-bold font-mono w-5 shrink-0 ${
                    idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-zinc-300' : idx === 2 ? 'text-amber-700' : 'text-zinc-600'
                  }`}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                  </span>

                  {/* Avatar */}
                  <img
                    src={stat.user.avatar}
                    alt={stat.user.name}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0"
                  />

                  {/* Name + Progress */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium truncate ${isMe ? 'text-zinc-100' : 'text-zinc-300'}`}>
                        {stat.user.name}
                        {isMe && <span className="ml-1 text-[10px] text-zinc-500">(you)</span>}
                      </span>
                      {isCreator && (
                        <span title="Squad Creator" className="inline-flex">
                          <Crown className="w-3 h-3 text-amber-400 shrink-0" />
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx === 0 ? 'bg-zinc-200' : 'bg-zinc-600'
                          }`}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                        {stat.solved}/{stat.total}
                      </span>
                    </div>
                  </div>

                  {/* Remove button (admin only, not self, not creator) */}
                  {isAdmin && !isMe && !isCreator && (
                    <div className="shrink-0">
                      {isConfirmingRemove ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setConfirmRemoveId(null)}
                            className="px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-800 border border-zinc-700 rounded transition cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRemoveMember(stat.user.id)}
                            disabled={removingId === stat.user.id}
                            className="px-2 py-1 text-[11px] text-red-300 hover:text-red-200 bg-red-950/40 border border-red-800/40 rounded transition cursor-pointer flex items-center gap-1 disabled:opacity-50"
                          >
                            {removingId === stat.user.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              'Remove'
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmRemoveId(stat.user.id)}
                          className="p-1.5 rounded text-zinc-600 hover:text-red-400 hover:bg-red-950/20 transition cursor-pointer"
                          title={`Remove ${stat.user.name} from squad`}
                        >
                          <UserMinus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
