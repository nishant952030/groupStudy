import React, { useState } from 'react';
import { Group, MemberProgress, Plan, TopicWithTasks, PlanTopic, PlanTask } from '../types';
import { studyService } from '../services/studyService';
import {
  Users, Copy, Check, TrendingUp, Sparkles, Shield, Flame,
  BookOpen, ChevronRight, X, Layers, CheckCircle2, Clock, Award, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroupViewProps {
  group: Group;
  memberProgressList: MemberProgress[];
  currentUserId: string;
}

interface MemberDetailModalState {
  user: MemberProgress['user'];
  plans: {
    plan: Plan;
    total: number;
    completed: number;
    percentage: number;
    topics: {
      topic: PlanTopic;
      total: number;
      completed: number;
      percentage: number;
      completedTasks: PlanTask[];
      inProgressTasks: PlanTask[];
    }[];
  }[];
  todayCompletedTasks: { task: PlanTask; completedAt?: string }[];
}

export const GroupView: React.FC<GroupViewProps> = ({
  group,
  memberProgressList,
  currentUserId
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedMemberModal, setSelectedMemberModal] = useState<MemberDetailModalState | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [cheeredMembers, setCheeredMembers] = useState<Record<string, boolean>>({});

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

  // Open detailed member study breakdown
  const handleInspectMember = async (member: MemberProgress['user']) => {
    setIsLoadingDetail(true);
    try {
      const detailed = await studyService.getMemberDetailedProgress(group.id, member.id);
      setSelectedMemberModal({
        user: member,
        plans: detailed.plans,
        todayCompletedTasks: detailed.todayCompletedTasks
      });
    } catch (err) {
      console.warn('Error inspecting member:', err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Cheer teammate interaction
  const handleCheerMember = (memberId: string, memberName: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6']
    });
    setCheeredMembers(prev => ({ ...prev, [memberId]: true }));
    setTimeout(() => {
      setCheeredMembers(prev => ({ ...prev, [memberId]: false }));
    }, 3000);
  };

  return (
    <div className="space-y-5 sm:space-y-7 max-w-4xl mx-auto">
      
      {/* Group Header Card */}
      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 sm:space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>{group.members.length} Study Teammates</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-display font-black text-white tracking-tight">
            {group.name}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Click on any teammate below to inspect their full topic-by-topic progress and daily completed problems!
          </p>
        </div>

        {/* 6-Character Invite Code Box */}
        <div className="bg-[#121626]/90 border border-white/[0.1] p-3.5 sm:p-4 rounded-2xl flex flex-col items-start gap-1.5 w-full sm:w-auto shadow-lg relative z-10">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Squad Invite Code
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <span className="font-mono text-lg sm:text-xl font-black text-violet-300 tracking-widest bg-violet-950/60 px-3 py-1 rounded-xl border border-violet-700/40">
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
      <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-violet-950 to-indigo-900/60 border border-violet-700/50 flex items-center justify-center text-violet-400 shadow-lg shadow-violet-950/50 shrink-0">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white font-display">Squad Completion Average Today</h4>
            <p className="text-slate-400 text-xs mt-0.5">Collective study momentum across all squad members</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-display font-black text-violet-300 font-mono">{totalGroupPercentage}%</span>
        </div>
      </div>

      {/* Member Accountability Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Squad Member Progress Profiles
          </h3>
          <span className="text-xs text-slate-500">Click any card to inspect full study breakdown</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memberProgressList.map(({ user, completedCount, totalCount, percentage }) => {
            const isMe = user.id === currentUserId;
            const hasCheered = Boolean(cheeredMembers[user.id]);
            
            // Mini circular progress ring radius
            const r = 24;
            const c = 2 * Math.PI * r;
            const offset = c - (percentage / 100) * c;

            return (
              <div
                key={user.id}
                onClick={() => handleInspectMember(user)}
                className={`p-5 rounded-3xl border transition-all duration-200 flex items-center justify-between gap-4 shadow-lg cursor-pointer group ${
                  isMe
                    ? 'border-violet-600/50 bg-gradient-to-r from-[#171C30] to-[#121626] ring-1 ring-violet-500/20 hover:border-violet-500'
                    : 'border-white/[0.08] bg-[#121626]/80 hover:border-violet-500/50 hover:bg-[#151A2E]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-violet-500/30 object-cover shrink-0 group-hover:scale-105 transition"
                    />
                    {isMe && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-violet-500 border-2 border-[#0B0D14] rounded-full" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm sm:text-base truncate group-hover:text-violet-300 transition">
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
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-cyan-400 font-semibold">
                      <Eye className="w-3 h-3" />
                      <span>Inspect Progress</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Cheer button */}
                  {!isMe && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheerMember(user.id, user.name);
                      }}
                      className={`p-2 rounded-xl border transition ${
                        hasCheered
                          ? 'bg-amber-950/80 border-amber-600 text-amber-300 scale-110'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-amber-300 hover:border-amber-500/50'
                      }`}
                      title={`Cheer ${user.name}!`}
                    >
                      <Flame className="w-4 h-4" />
                    </button>
                  )}

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

              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════ MODAL: Detailed Member Study Profile ══════════ */}
      {selectedMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/[0.12] shadow-2xl p-6 sm:p-7 relative max-h-[85vh] flex flex-col bg-[#0E111C]/95">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedMemberModal.user.avatar}
                  alt={selectedMemberModal.user.name}
                  className="w-12 h-12 rounded-full border-2 border-violet-500/40 object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-bold text-white">
                      {selectedMemberModal.user.name}'s Progress
                    </h3>
                    {selectedMemberModal.user.id === currentUserId && (
                      <span className="bg-violet-950/80 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-700/60">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Full curriculum topic-by-topic completion breakdown
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Plans and Topics breakdown */}
            <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
              
              {/* Today completed problems */}
              {selectedMemberModal.todayCompletedTasks.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Award className="w-4 h-4" />
                    <span>Completed Today ({selectedMemberModal.todayCompletedTasks.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMemberModal.todayCompletedTasks.map(({ task }, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-1 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {task.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plans breakdown */}
              {selectedMemberModal.plans.map(pData => (
                <div key={pData.plan.id} className="rounded-2xl border border-white/[0.08] bg-[#121626]/80 p-5 space-y-4 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-base font-display">{pData.plan.title}</h4>
                      <p className="text-xs text-slate-400">
                        {pData.completed} of {pData.total} subtasks completed ({pData.percentage}%)
                      </p>
                    </div>
                    <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-violet-950/80 border border-violet-700 text-violet-300 shrink-0">
                      {pData.percentage}% Overall
                    </span>
                  </div>

                  {/* Plan Progress bar */}
                  <div className="w-full bg-[#0B0D14] h-2 rounded-full overflow-hidden border border-white/[0.06]">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pData.percentage}%` }}
                    />
                  </div>

                  {/* Topics Grid */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Topic Breakdown:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {pData.topics.map(tData => (
                        <div key={tData.topic.id} className="p-3 rounded-xl bg-[#161B2E]/60 border border-white/[0.06] space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200 truncate">{tData.topic.title}</span>
                            <span className="font-mono text-slate-400 ml-2 shrink-0 font-semibold">
                              {tData.completed}/{tData.total}
                            </span>
                          </div>
                          <div className="w-full bg-[#0B0D14] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${tData.percentage === 100 ? 'bg-emerald-400' : 'bg-violet-500'}`}
                              style={{ width: `${tData.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-violet-600/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
