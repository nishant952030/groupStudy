import React, { useState } from 'react';
import { Group, MemberProgress } from '../types';
import { Users, Copy, Check, ShieldCheck, Sparkles, TrendingUp, Award } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Group Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{group.members.length} Study Buddy{group.members.length === 1 ? '' : 's'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {group.name}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Track daily progress together and hold each other accountable.
          </p>
        </div>

        {/* 6-Character Invite Code Box */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex flex-col items-start gap-1 w-full sm:w-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Group Invite Code
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <span className="font-mono text-xl font-black text-indigo-300 tracking-widest">
              {group.invite_code}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
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
      <div className="glass-card p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-950 border border-brand-800/50 flex items-center justify-center text-brand-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Group Completion Average Today</h4>
            <p className="text-slate-400 text-xs">Collective daily momentum across all members</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-brand-400">{totalGroupPercentage}%</span>
        </div>
      </div>

      {/* Member Accountability Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
          Member Daily Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memberProgressList.map(({ user, completedCount, totalCount, percentage }) => {
            const isMe = user.id === currentUserId;
            
            // Mini circular progress ring radius
            const r = 22;
            const c = 2 * Math.PI * r;
            const offset = c - (percentage / 100) * c;

            return (
              <div
                key={user.id}
                className={`glass-card p-5 rounded-2xl border transition flex items-center justify-between gap-4 ${
                  isMe ? 'border-brand-500/50 bg-slate-900/80' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border border-slate-700 object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100 text-sm sm:text-base truncate">
                        {user.name}
                      </span>
                      {isMe && (
                        <span className="bg-brand-500/20 text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-500/30">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs truncate mt-0.5">
                      Completed {completedCount} / {totalCount} tasks today
                    </p>
                  </div>
                </div>

                {/* Member Mini Progress Ring */}
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <svg className="w-14 h-14 transform -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r={r}
                      className="stroke-slate-800"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r={r}
                      className="stroke-brand-500 transition-all duration-500"
                      strokeWidth="5"
                      strokeDasharray={c}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-white">
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
