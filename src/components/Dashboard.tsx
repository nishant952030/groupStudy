import React, { useState, useEffect, useCallback } from 'react';
import { Plan, Group, PlanMemberProgress, TopicWithTasks, UserSubtaskStatus, SubtaskStatus, PlanTask } from '../types';
import { studyService } from '../services/studyService';
import {
  BookOpen, Calendar, Layers, PlusCircle,
  Users, ChevronDown, ChevronUp, Lock, CheckCircle2,
  Circle, Clock, Tag, ExternalLink, Zap, Map, PlayCircle, Sparkles, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardProps {
  activeGroup: Group;
  plans: Plan[];
  currentUserId?: string;
  onOpenCreatePlan: () => void;
  onOpenJoinGroup: () => void;
  onSelectPlanTab: () => void;
}

interface PlanDetailState {
  plan: Plan;
  members: PlanMemberProgress[];
  topicsWithTasks: TopicWithTasks[];
  userStatuses: Record<string, UserSubtaskStatus>;
  totalTasks: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeGroup,
  plans,
  currentUserId,
  onOpenCreatePlan,
}) => {
  const [planDetails, setPlanDetails] = useState<Record<string, PlanDetailState>>({});
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const isInitialLoad = React.useRef(true);

  const loadPlanData = useCallback(async (showLoading = false) => {
    if (!activeGroup || plans.length === 0) {
      if (showLoading) setLoading(false);
      return;
    }
    if (showLoading) setLoading(true);

    const details: Record<string, PlanDetailState> = {};
    for (const plan of plans) {
      try {
        const [members, topicsWithTasks, userStatuses] = await Promise.all([
          studyService.getPlanMembersProgress(plan.id, activeGroup.id),
          studyService.getTopicsWithTasks(plan.id),
          currentUserId ? studyService.getUserSubtaskStatuses(plan.id, currentUserId) : Promise.resolve({})
        ]);

        const totalTasks = topicsWithTasks.reduce((sum, tw) => sum + tw.tasks.length, 0);

        details[plan.id] = {
          plan,
          members,
          topicsWithTasks,
          userStatuses,
          totalTasks
        };
      } catch (err) {
        console.warn('Error loading plan detail:', err);
      }
    }

    setPlanDetails(details);
    if (plans.length > 0 && !expandedPlanId) {
      setExpandedPlanId(plans[0].id);
      const firstPlanTopics = details[plans[0].id]?.topicsWithTasks;
      if (firstPlanTopics && firstPlanTopics.length > 0) {
        setExpandedTopicIds(prev => ({ ...prev, [firstPlanTopics[0].topic.id]: true }));
      }
    }
    if (showLoading) setLoading(false);
  }, [activeGroup, plans, currentUserId, expandedPlanId]);

  useEffect(() => {
    loadPlanData(isInitialLoad.current);
    isInitialLoad.current = false;
  }, [loadPlanData]);

  // Status toggle handler - 0ms instant optimistic update
  const handleToggleSubtask = async (task: PlanTask, currentStatus?: SubtaskStatus) => {
    if (!currentUserId) return;
    
    // Cycle: not_started -> in_progress -> completed -> not_started
    const nextStatus: SubtaskStatus =
      !currentStatus || currentStatus === 'not_started' ? 'in_progress' :
      currentStatus === 'in_progress' ? 'completed' : 'not_started';

    const optimisticStatus: UserSubtaskStatus = {
      id: `${task.id}_${currentUserId}`,
      task_id: task.id,
      topic_id: task.topic_id,
      plan_id: task.plan_id,
      group_id: task.group_id,
      user_id: currentUserId,
      status: nextStatus,
      completed_at: nextStatus === 'completed' ? new Date().toISOString() : null,
      started_at: nextStatus === 'in_progress' ? new Date().toISOString() : null,
    };

    // Instant optimistic update in local state
    setPlanDetails(prev => {
      const current = prev[task.plan_id];
      if (!current) return prev;
      return {
        ...prev,
        [task.plan_id]: {
          ...current,
          userStatuses: {
            ...current.userStatuses,
            [task.id]: optimisticStatus
          }
        }
      };
    });

    // Run async in background & re-sync team stats
    await studyService.cycleSubtaskStatus(task, currentUserId, currentStatus);
    const updatedMembers = await studyService.getPlanMembersProgress(task.plan_id, activeGroup.id);
    
    setPlanDetails(prev => {
      const cur = prev[task.plan_id];
      if (!cur) return prev;
      return {
        ...prev,
        [task.plan_id]: { ...cur, members: updatedMembers }
      };
    });
  };

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicIds(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  return (
    <div className="space-y-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/50 text-violet-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Structured Roadmaps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Curriculum & Study Plans
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Sequential chapters for <span className="text-violet-300 font-semibold">{activeGroup.name}</span>.
            Track your individual subtask completion across each topic.
          </p>
        </div>
        <button
          onClick={onOpenCreatePlan}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl shadow-violet-600/25 transition transform active:scale-95 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Study Plan</span>
        </button>
      </div>

      {/* Invite code banner */}
      <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#121626] to-[#0E111C] border border-white/[0.08] text-xs shadow-md">
        <div className="flex items-center gap-2.5 text-slate-300">
          <Users className="w-4 h-4 text-cyan-400" />
          <span className="font-medium">Invite teammates to follow this roadmap:</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <code className="font-mono font-bold text-violet-300 text-sm tracking-widest bg-violet-950/60 px-2.5 py-0.5 rounded-lg border border-violet-700/40">
            {activeGroup.invite_code}
          </code>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="glass-panel p-16 rounded-3xl border border-white/[0.08] flex flex-col items-center justify-center gap-3 text-center">
          <Loader2 className="w-9 h-9 text-violet-400 animate-spin" />
          <p className="text-base font-bold text-white font-display">Loading Curriculum Roadmaps...</p>
          <p className="text-xs text-slate-400">Fetching topics, subtasks, and teammate progress</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-white/[0.08] shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-950 to-indigo-900/60 border border-violet-700/50 flex items-center justify-center mx-auto text-violet-400 shadow-lg shadow-violet-950/50">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">No Study Plans Created Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Create an ordered study roadmap with topics (e.g. Arrays, Trees, System Design) and subtasks. Teammates can follow along with individual progress!
          </p>
          <button
            onClick={onOpenCreatePlan}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-violet-600/30 transition transform active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Study Plan</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {plans.map(plan => {
            const detail = planDetails[plan.id];
            const myMemberProgress = detail?.members?.find(m => m.user.id === currentUserId);
            const isPlanExpanded = expandedPlanId === plan.id;
            const totalTasks = detail?.totalTasks || 0;
            const userStatuses = detail?.userStatuses || {};

            return (
              <div
                key={plan.id}
                className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden transition-all shadow-2xl"
              >
                {/* Plan Header Card */}
                <div
                  onClick={() => setExpandedPlanId(prev => prev === plan.id ? null : plan.id)}
                  className="p-5 sm:p-7 cursor-pointer hover:bg-white/[0.02] transition flex flex-col sm:flex-row sm:items-center justify-between gap-5 select-none"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        plan.type === 'roadmap'
                          ? 'bg-indigo-950/80 border-indigo-700/60 text-indigo-300'
                          : 'bg-amber-950/80 border-amber-700/60 text-amber-300'
                      }`}>
                        {plan.type === 'roadmap' ? <Map className="w-3 h-3 text-indigo-400" /> : <Zap className="w-3 h-3 text-amber-400" />}
                        {plan.type === 'roadmap' ? 'Roadmap Plan' : 'Sprint Plan'}
                      </span>
                      {plan.end_date && (
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded-md">
                          <Calendar className="w-3 h-3 text-slate-400" /> Target: {plan.end_date}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-semibold bg-white/[0.04] px-2 py-0.5 rounded-md">
                        {detail?.topicsWithTasks?.length || 0} Topics · {totalTasks} Subtasks
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">{plan.title}</h3>
                    {plan.description && (
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 leading-relaxed">{plan.description}</p>
                    )}

                    {/* My Progress Bar */}
                    {myMemberProgress && (
                      <div className="flex items-center gap-3 pt-2 max-w-lg">
                        <div className="flex-1 bg-[#101424] h-2.5 rounded-full overflow-hidden border border-white/[0.08]">
                          <div
                            className="bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${myMemberProgress.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-violet-300 shrink-0 font-mono">
                          Your Progress: {myMemberProgress.completed}/{myMemberProgress.total} ({myMemberProgress.percentage}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Teammates avatars + Chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex -space-x-2">
                      {detail?.members?.slice(0, 4).map(m => (
                        <img
                          key={m.user.id}
                          src={m.user.avatar}
                          alt={m.user.name}
                          className="w-8 h-8 rounded-full border-2 border-[#0B0D14] object-cover ring-1 ring-violet-500/30"
                          title={`${m.user.name}: ${m.percentage}% completed`}
                        />
                      ))}
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#131726] border border-white/[0.08] text-slate-400 hover:text-white transition">
                      {isPlanExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Plan Details: Team Comparison + Topic Curriculum */}
                {isPlanExpanded && (
                  <div className="border-t border-white/[0.08] p-5 sm:p-7 space-y-7 bg-[#090B12]/80">
                    
                    {/* Team Members Progress Grid */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-violet-400" />
                        Team Progress Breakdown
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {detail?.members?.map(m => {
                          const isMe = m.user.id === currentUserId;
                          return (
                            <div
                              key={m.user.id}
                              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                                isMe
                                  ? 'bg-violet-950/40 border-violet-700/60 shadow-lg shadow-violet-950/30'
                                  : 'bg-[#121626]/80 border-white/[0.06]'
                              }`}
                            >
                              <img
                                src={m.user.avatar}
                                alt={m.user.name}
                                className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/[0.1]"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className={`font-bold truncate ${isMe ? 'text-violet-300' : 'text-slate-200'}`}>
                                    {m.user.name}{isMe ? ' (You)' : ''}
                                  </span>
                                  <span className="font-mono font-bold text-slate-400 shrink-0">
                                    {m.completed}/{m.total} · {m.percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-[#0B0D14] h-2 rounded-full overflow-hidden border border-white/[0.04]">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isMe ? 'bg-gradient-to-r from-violet-500 to-indigo-400' : 'bg-slate-600'
                                    }`}
                                    style={{ width: `${m.percentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ordered Topics & Subtasks Curriculum */}
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          Curriculum & Sequential Topics
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          Click circle to cycle status (⚪ Not Started $\rightarrow$ ⏳ In Progress $\rightarrow$ ✅ Done)
                        </span>
                      </div>

                      {detail?.topicsWithTasks?.map(({ topic, tasks }, topicIndex) => {
                        const isTopicExpanded = Boolean(expandedTopicIds[topic.id]);
                        const completedInTopic = tasks.filter(t => userStatuses[t.id]?.status === 'completed').length;
                        const topicPercentage = tasks.length > 0 ? Math.round((completedInTopic / tasks.length) * 100) : 0;

                        return (
                          <div
                            key={topic.id}
                            className="rounded-2xl border border-white/[0.08] bg-[#101424]/90 overflow-hidden shadow-md"
                          >
                            {/* Topic Row Header */}
                            <div
                              onClick={() => toggleTopicExpand(topic.id)}
                              className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition select-none"
                            >
                              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                <span className="w-7 h-7 rounded-xl bg-violet-950/90 border border-violet-700/60 flex items-center justify-center text-xs font-black text-violet-300 shrink-0 font-display">
                                  {topicIndex + 1}
                                </span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-white text-sm sm:text-base truncate">{topic.title}</h5>
                                    {topic.estimated_days && (
                                      <span className="text-[10px] text-slate-400 hidden sm:inline-flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded">
                                        <Clock className="w-2.5 h-2.5 text-slate-400" /> ~{topic.estimated_days} days
                                      </span>
                                    )}
                                  </div>
                                  {topic.description && (
                                    <p className="text-xs text-slate-400 truncate mt-0.5">{topic.description}</p>
                                  )}
                                </div>
                              </div>

                              {/* Topic Progress & Toggle */}
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right hidden sm:block">
                                  <span className="text-xs font-bold text-violet-300 font-mono">
                                    {completedInTopic}/{tasks.length} Done
                                  </span>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border font-mono ${
                                  topicPercentage === 100
                                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                                    : topicPercentage > 0
                                      ? 'bg-violet-950/80 border-violet-700 text-violet-300'
                                      : 'bg-[#151928] border-white/[0.06] text-slate-500'
                                }`}>
                                  {topicPercentage}%
                                </span>
                                <div className="text-slate-400">
                                  {isTopicExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                              </div>
                            </div>

                            {/* Subtasks List */}
                            {isTopicExpanded && (
                              <div className="border-t border-white/[0.06] px-4 py-3 space-y-2 bg-[#0A0C16]">
                                {tasks.length === 0 ? (
                                  <p className="text-xs text-slate-500 py-2">No subtasks added for this topic.</p>
                                ) : (
                                  tasks.map((task, taskIdx) => {
                                    const userStatus = userStatuses[task.id]?.status || 'not_started';
                                    const isDone = userStatus === 'completed';
                                    const isInProgress = userStatus === 'in_progress';

                                    return (
                                      <div
                                        key={task.id}
                                        className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                                          isDone
                                            ? 'bg-[#0E121E]/60 border-emerald-900/30 opacity-75'
                                            : isInProgress
                                              ? 'bg-amber-950/30 border-amber-700/50 shadow-sm'
                                              : 'bg-[#121626]/50 border-white/[0.05] hover:border-violet-500/40'
                                        }`}
                                      >
                                        {/* Status Toggle Button */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleSubtask(task, userStatus)}
                                          className="mt-0.5 shrink-0 transition transform hover:scale-110"
                                          title={`Current status: ${userStatus}. Click to cycle.`}
                                        >
                                          {isDone ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                                          ) : isInProgress ? (
                                            <PlayCircle className="w-5 h-5 text-amber-400 fill-amber-500/20" />
                                          ) : (
                                            <Circle className="w-5 h-5 text-slate-500 hover:text-violet-400" />
                                          )}
                                        </button>

                                        {/* Subtask Info */}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                              {task.title}
                                            </span>

                                            {/* Status Badge */}
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                              isDone
                                                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                                                : isInProgress
                                                  ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                                                  : 'bg-white/[0.04] border-white/[0.08] text-slate-500'
                                            }`}>
                                              {isDone ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                                            </span>

                                            {task.priority === 'high' && (
                                              <span className="text-[10px] font-bold text-rose-300 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-full">
                                                High Priority
                                              </span>
                                            )}
                                            {task.estimated_hours && (
                                              <span className="text-[11px] text-slate-400 flex items-center gap-0.5 bg-white/[0.04] px-2 py-0.5 rounded">
                                                <Clock className="w-2.5 h-2.5 text-slate-400" /> {task.estimated_hours}h
                                              </span>
                                            )}
                                          </div>

                                          {task.description && (
                                            <p className="text-xs text-slate-400 leading-relaxed mb-1.5">{task.description}</p>
                                          )}

                                          {task.resources && (
                                            <div className="flex items-center gap-1 text-xs text-cyan-300 font-medium">
                                              <ExternalLink className="w-3 h-3 text-cyan-400" />
                                              <span>{task.resources}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
