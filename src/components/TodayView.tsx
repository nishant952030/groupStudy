import React, { useState, useEffect, useCallback } from 'react';
import { Plan, TopicWithTasks, PlanTask, UserSubtaskStatus, SubtaskStatus } from '../types';
import { studyService } from '../services/studyService';
import {
  CheckCircle2, Circle, Sparkles, Clock, Award,
  ChevronDown, ChevronUp, Tag, FileText, Flame, Save,
  PlusCircle, Layers, X, PlayCircle, ExternalLink, Check, Target, Zap, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TodayViewProps {
  groupName: string;
  currentUserId?: string;
  activeGroupId?: string;
}

export const TodayView: React.FC<TodayViewProps> = ({
  groupName,
  currentUserId,
  activeGroupId
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [topicsWithTasks, setTopicsWithTasks] = useState<TopicWithTasks[]>([]);
  const [userStatuses, setUserStatuses] = useState<Record<string, UserSubtaskStatus>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedNotes, setSavedNotes] = useState<Record<string, boolean>>({});
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isInitialLoad = React.useRef(true);

  // Load all tasks & user statuses for active group
  const loadData = useCallback(async (showLoading = false) => {
    if (!activeGroupId || !currentUserId) return;
    if (showLoading) setLoading(true);

    try {
      const groupPlans = await studyService.getGroupPlans(activeGroupId);
      setPlans(groupPlans);

      const allTopics: TopicWithTasks[] = [];
      const allStatuses: Record<string, UserSubtaskStatus> = {};

      for (const plan of groupPlans) {
        const [planTopics, planStatuses] = await Promise.all([
          studyService.getTopicsWithTasks(plan.id),
          studyService.getUserSubtaskStatuses(plan.id, currentUserId)
        ]);

        allTopics.push(...planTopics);
        Object.assign(allStatuses, planStatuses);
      }

      setTopicsWithTasks(allTopics);
      setUserStatuses(allStatuses);
    } catch (err) {
      console.warn('Error loading TodayView data:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [activeGroupId, currentUserId]);

  useEffect(() => {
    loadData(isInitialLoad.current);
    isInitialLoad.current = false;

    const unsub = studyService.subscribe(() => {
      // Silent sync on updates without flashing loading spinner
      loadData(false);
    });
    return () => {
      unsub();
    };
  }, [loadData]);

  // All flat tasks
  const allTasks: PlanTask[] = topicsWithTasks.flatMap(tw => tw.tasks);

  // Today's active tasks: tasks marked 'in_progress' or 'completed'
  const activeTasks = allTasks.filter(t => {
    const s = userStatuses[t.id]?.status;
    return s === 'in_progress' || s === 'completed';
  });

  const completedToday = activeTasks.filter(t => userStatuses[t.id]?.status === 'completed');
  const completedCount = completedToday.length;
  const totalCount = activeTasks.length;
  const dailyPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Toggle subtask completion - 0ms instant optimistic update
  const handleToggleTask = async (task: PlanTask) => {
    if (!currentUserId) return;
    const currentStatus = userStatuses[task.id]?.status;
    
    // Cycle: not_started -> in_progress -> completed -> not_started
    const nextStatus: SubtaskStatus =
      !currentStatus || currentStatus === 'not_started' ? 'in_progress' :
      currentStatus === 'in_progress' ? 'completed' : 'not_started';

    const optimisticObj: UserSubtaskStatus = {
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

    // Instant optimistic update
    setUserStatuses(prev => ({
      ...prev,
      [task.id]: optimisticObj
    }));

    // Check if this action completes ALL daily focus tasks (100% milestone celebration!)
    if (nextStatus === 'completed') {
      const willBeCompletedCount = completedCount + 1;
      if (willBeCompletedCount >= totalCount && totalCount > 0) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#38BDF8', '#10B981', '#F43F5E', '#FBBF24']
        });
      }
    }

    // Persist to service in background
    await studyService.cycleSubtaskStatus(task, currentUserId, currentStatus);
  };

  // Add / Remove from Today (Toggle 'in_progress')
  const handleToggleTodayPick = async (task: PlanTask) => {
    if (!currentUserId) return;
    const currentStatus = userStatuses[task.id]?.status;
    const nextStatus: SubtaskStatus = currentStatus === 'in_progress' ? 'not_started' : 'in_progress';
    
    const optimisticObj: UserSubtaskStatus = {
      id: `${task.id}_${currentUserId}`,
      task_id: task.id,
      topic_id: task.topic_id,
      plan_id: task.plan_id,
      group_id: task.group_id,
      user_id: currentUserId,
      status: nextStatus,
      started_at: nextStatus === 'in_progress' ? new Date().toISOString() : null,
      completed_at: null,
    };

    // Instant optimistic update
    setUserStatuses(prev => ({
      ...prev,
      [task.id]: optimisticObj
    }));

    await studyService.cycleSubtaskStatus(
      task,
      currentUserId,
      currentStatus === 'in_progress' ? 'completed' : 'not_started'
    );
  };

  const toggleExpand = async (taskId: string) => {
    setExpandedId(prev => prev === taskId ? null : taskId);
    if (expandedId !== taskId && currentUserId && !notes[taskId]) {
      const note = await studyService.getTaskNote(taskId, currentUserId);
      if (note) setNotes(prev => ({ ...prev, [taskId]: note }));
    }
  };

  const handleSaveNote = async (taskId: string) => {
    if (!currentUserId) return;
    const note = notes[taskId] || '';
    setSavingNotes(prev => ({ ...prev, [taskId]: true }));
    try {
      await studyService.saveTaskNote(taskId, currentUserId, note);
      setSavedNotes(prev => ({ ...prev, [taskId]: true }));
      setTimeout(() => setSavedNotes(prev => ({ ...prev, [taskId]: false })), 2000);
    } finally {
      setSavingNotes(prev => ({ ...prev, [taskId]: false }));
    }
  };

  // Circular SVG progress ring
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dailyPercentage / 100) * circumference;

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      {/* Top Header Card with Circular Progress Ring */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/[0.08]">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left space-y-2.5 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141829] border border-violet-500/30 text-violet-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="truncate">{groupName}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Today's Focus Dashboard
            </h2>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {totalCount === 0
                ? 'No subtasks queued for today yet. Pick items from your study curriculum to start!'
                : `You've conquered ${completedCount} of ${totalCount} subtasks selected for today.`}
            </p>

            {dailyPercentage === 100 && totalCount > 0 && (
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>100% completed today! Outstanding momentum 🎉</span>
              </div>
            )}

            {/* Quick Action Button to Open Picker */}
            <div className="pt-2">
              <button
                onClick={() => setIsPickerOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-xl shadow-violet-600/30 transition transform active:scale-95 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Pick Subtasks from Roadmap</span>
              </button>
            </div>
          </div>

          {/* SVG Progress Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-[#181D2F]"
                strokeWidth="11"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-violet-500 transition-all duration-700 ease-out"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-display font-black text-white tracking-tight">{dailyPercentage}%</span>
              <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Subtasks Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Today's Active Queue ({activeTasks.length})</span>
          </div>
          <span className="text-violet-300 font-mono">{completedCount}/{totalCount} Done</span>
        </div>

        {loading ? (
          <div className="glass-panel p-12 rounded-3xl border border-white/[0.08] flex flex-col items-center justify-center gap-3 text-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            <p className="text-sm font-bold text-slate-300">Loading daily study focus...</p>
            <p className="text-xs text-slate-500">Syncing with your squad roadmap</p>
          </div>
        ) : activeTasks.length === 0 ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-white/[0.08] shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-950 to-indigo-900/60 border border-violet-700/50 flex items-center justify-center mx-auto text-violet-400 shadow-lg shadow-violet-950/50">
              <PlayCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white">Your Daily Queue is Empty</h4>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
                Browse your group's study roadmap (e.g. Arrays, Trees, System Design) and pick 2-4 subtasks to tackle today!
              </p>
            </div>
            <button
              onClick={() => setIsPickerOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-violet-600/30 transition transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Browse & Pick Subtasks</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeTasks.map(task => {
              const status = userStatuses[task.id]?.status || 'not_started';
              const isDone = status === 'completed';
              const isExpanded = expandedId === task.id;
              const parentTopic = topicsWithTasks.find(tw => tw.topic.id === task.topic_id)?.topic;

              return (
                <div
                  key={task.id}
                  className={`rounded-2xl border transition-all duration-200 shadow-md ${
                    isDone
                      ? 'bg-[#0E121E]/60 border-emerald-900/40 opacity-75'
                      : 'bg-gradient-to-r from-[#121626] to-[#0E111D] border-white/[0.08] hover:border-violet-500/40'
                  }`}
                >
                  {/* Task Main Row */}
                  <div
                    className="flex items-center gap-3.5 p-4 sm:p-5 cursor-pointer select-none"
                    onClick={() => handleToggleTask(task)}
                  >
                    <button
                      type="button"
                      className="flex-shrink-0 transition transform hover:scale-110"
                      title={isDone ? 'Mark in progress' : 'Mark completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-6 h-6 text-amber-400 fill-amber-500/10 hover:text-emerald-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm sm:text-base transition truncate ${
                          isDone ? 'line-through text-slate-500' : 'text-slate-100'
                        }`}>
                          {task.title}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-slate-500">
                        {parentTopic && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-300 bg-violet-950/70 border border-violet-800/60 px-2.5 py-0.5 rounded-full">
                            <Tag className="w-2.5 h-2.5 text-violet-400" />
                            {parentTopic.title}
                          </span>
                        )}

                        {task.priority === 'high' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-300 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-full">
                            <Flame className="w-2.5 h-2.5 text-rose-400" /> High Priority
                          </span>
                        )}

                        {task.estimated_hours && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md">
                            <Clock className="w-2.5 h-2.5 text-slate-400" /> {task.estimated_hours}h
                          </span>
                        )}

                        {task.resources && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-md hover:underline">
                            <ExternalLink className="w-2.5 h-2.5" /> {task.resources}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand Details & Notes */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(task.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expandable Notes / Instructions Panel */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] p-4 sm:p-5 space-y-4 bg-[#090C15]/70 rounded-b-2xl">
                      {task.description && (
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> Task Instructions & Details
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#101424] p-3 rounded-xl border border-white/[0.05]">
                            {task.description}
                          </p>
                        </div>
                      )}

                      {/* Personal Study Notes */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-cyan-400" />
                          My Private Study Notes <span className="normal-case text-slate-500 font-normal">(saved to your account)</span>
                        </p>
                        <textarea
                          rows={3}
                          placeholder="Write your key takeaways, time/space complexity notes, edge cases, formula, or code hints..."
                          value={notes[task.id] ?? ''}
                          onChange={(e) => setNotes(prev => ({ ...prev, [task.id]: e.target.value }))}
                          className="w-full bg-[#101424] border border-white/[0.1] focus:border-violet-500/50 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition resize-none font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveNote(task.id)}
                          disabled={savingNotes[task.id]}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition ${
                            savedNotes[task.id]
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                              : 'bg-violet-950/70 text-violet-300 border border-violet-700/50 hover:bg-violet-900/80 disabled:opacity-60'
                          }`}
                        >
                          {savingNotes[task.id] ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>{savedNotes[task.id] ? 'Saved to Your Account!' : 'Save Note'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════ MODAL: Subtask Picker from Ordered Curriculum ══════════ */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/[0.12] shadow-2xl p-6 sm:p-7 relative max-h-[85vh] flex flex-col bg-[#0E111C]/95">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-display font-bold text-white">Pick Subtasks for Today's Focus</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select problems or chapters from your group roadmap. Selected items appear on your active focus queue.
                </p>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Topics & Subtasks List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {topicsWithTasks.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">No topics available in this group's study plans.</p>
              ) : (
                topicsWithTasks.map(({ topic, tasks }, tIdx) => (
                  <div key={topic.id} className="rounded-2xl border border-white/[0.08] bg-[#121626]/80 p-4 space-y-3 shadow-inner">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-violet-950/80 border border-violet-700/60 flex items-center justify-center text-xs font-bold text-violet-300">
                        {tIdx + 1}
                      </span>
                      <h4 className="font-bold text-white text-sm">{topic.title}</h4>
                    </div>

                    <div className="space-y-2 pl-2">
                      {tasks.map(task => {
                        const status = userStatuses[task.id]?.status || 'not_started';
                        const isDone = status === 'completed';
                        const isInProgress = status === 'in_progress';

                        return (
                          <div
                            key={task.id}
                            onClick={() => handleToggleTodayPick(task)}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                              isInProgress
                                ? 'bg-violet-950/80 border-violet-500/80 text-violet-100 shadow-md shadow-violet-950/50'
                                : isDone
                                  ? 'bg-[#0E111C]/40 border-white/[0.04] text-slate-500 opacity-60'
                                  : 'bg-[#161B2E]/50 border-white/[0.06] hover:border-violet-500/40 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition ${
                                isInProgress ? 'bg-violet-600 border-violet-400 text-white' : 'border-slate-600'
                              }`}>
                                {isInProgress && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={`text-xs font-medium truncate ${isDone ? 'line-through' : ''}`}>
                                {task.title}
                              </span>
                            </div>

                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                              isDone
                                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                                : isInProgress
                                  ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                                  : 'bg-white/[0.04] border-white/[0.06] text-slate-500'
                            }`}>
                              {isDone ? 'Completed' : isInProgress ? 'In Today Focus' : 'Click to Add'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setIsPickerOpen(false)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-violet-600/30 transition cursor-pointer"
              >
                Done Selecting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
