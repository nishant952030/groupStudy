import React, { useState } from 'react';
import { Group, MemberProgress } from '../types';
import { Users, Copy, Check, TrendingUp, Sparkles, Shield, Flame } from 'lucide-react';

interface GroupViewProps {
  group: Group;
  memberProgressList: MemberProgress[];
  currentUserId: string;
}

export const GroupView: React.FC<GroupViewProps> = ({
  group,
  memberProgressList,
  currentUserId
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(group.invite_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group average completion calculation
  const totalGroupPercentage = memberProgressList.length > 0
    ? Math.round(
        memberProgressList.reduce((acc, m) => acc + m.percentage, 0) / memberProgressList.length
      )
    : 0;

  return (
    <div className="space-y-7 max-w-4xl mx-auto">
      
      {/* Group Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>{group.members.length} Study Teammates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            {group.name}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Track daily momentum together, review each other's progress, and stay committed.
          </p>
        </div>

        {/* 6-Character Invite Code Box */}
        <div className="bg-[#121626]/90 border border-white/[0.1] p-4 rounded-2xl flex flex-col items-start gap-1.5 w-full sm:w-auto shadow-lg relative z-10">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Squad Invite Code
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <span className="font-mono text-xl font-black text-violet-300 tracking-widest bg-violet-950/60 px-3 py-1 rounded-xl border border-violet-700/40">
              {group.invite_code}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-md shadow-violet-600/20 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Group Daily Accountability Summary Metric */}
      <div className="glass-card p-6 rounded-3xl border border-white/[0.08] flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-950 to-indigo-900/60 border border-violet-700/50 flex items-center justify-center text-violet-400 shadow-lg shadow-violet-950/50">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-display">Squad Completion Average Today</h4>
            <p className="text-slate-400 text-xs mt-0.5">Collective study momentum across all squad members</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-display font-black text-violet-300 font-mono">{totalGroupPercentage}%</span>
        </div>
      </div>

      {/* Member Accountability Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Squad Members Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memberProgressList.map(({ user, completedCount, totalCount, percentage }) => {
            const isMe = user.id === currentUserId;
            
            // Mini circular progress ring radius
            const r = 24;
            const c = 2 * Math.PI * r;
            const offset = c - (percentage / 100) * c;

            return (
              <div
                key={user.id}
                className={`p-5 rounded-3xl border transition-all duration-200 flex items-center justify-between gap-4 shadow-lg ${
                  isMe
                    ? 'border-violet-600/50 bg-gradient-to-r from-[#171C30] to-[#121626] ring-1 ring-violet-500/20'
                    : 'border-white/[0.08] bg-[#121626]/80 hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-violet-500/30 object-cover shrink-0"
                    />
                    {isMe && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-violet-500 border-2 border-[#0B0D14] rounded-full" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm sm:text-base truncate">
                        {user.name}
                      </span>
                      {isMe && (
                        <span className="bg-violet-950/80 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-700/60">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs truncate mt-0.5">
                      Completed {completedCount} subtasks today
                    </p>
                  </div>
                </div>

                {/* Member Mini Progress Ring */}
                <div className="relative flex items-center justify-center shrink-0">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r={r}
                      className="stroke-[#151928]"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r={r}
                      className="stroke-violet-500 transition-all duration-500"
                      strokeWidth="5"
                      strokeDasharray={c}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      fill="transparent"
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.5))'
                      }}
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-white font-mono">
                    {percentage}%
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
