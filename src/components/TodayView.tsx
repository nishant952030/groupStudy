import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  CheckSquare, Plus, Trash2, Calendar, ChevronLeft, ChevronRight,
  BookOpen, Check, Eye, User as UserIcon, X, Search, Sparkles,
  History, Clock, CheckCircle2, Filter, Code2, Youtube
} from 'lucide-react';
import { Squad, User, DailyTask, DailySolvedHistory, SolvedHistoryItem } from '../types';
import { studyService } from '../services/studyService';
import { STRIVER_180_TOPICS, StriverQuestion } from '../data/striver180Data';

interface Props {
  squad: Squad;
  currentUser: User;
  onNavigateToRoadmap?: () => void;
}

export const TodayView: React.FC<Props> = ({ squad, currentUser, onNavigateToRoadmap }) => {
  // Mode: 'tasks' (Daily Checklist) vs 'history' (Daily Solved Chronicle)
  const [activeMode, setActiveMode] = useState<'tasks' | 'history'>('tasks');

  // Date state: YYYY-MM-DD for tasks mode
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [history, setHistory] = useState<DailySolvedHistory[]>([]);
  const [members, setMembers] = useState<Record<string, User>>({});
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);
  const [historyUserFilter, setHistoryUserFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // New task input
  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Question picker modal states
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerTopicId, setPickerTopicId] = useState<number | 'all'>('all');
  const [pickerSubtopicId, setPickerSubtopicId] = useState<number | 'all'>('all');
  const [pickerDifficulty, setPickerDifficulty] = useState<'all' | 'basic' | 'core' | 'pro'>('all');
  const [pickerSort, setPickerSort] = useState<'default' | 'easy_to_hard' | 'hard_to_easy' | 'name'>('default');
  const [hideCompletedInPicker, setHideCompletedInPicker] = useState<boolean>(true);
  const [mySolved, setMySolved] = useState<Set<number>>(new Set());

  const isToday = selectedDate === todayStr;
  const isViewingSelf = selectedUserId === currentUser.id;

  // Striver question map for quick metadata lookup (LeetCode, YouTube, links)
  const questionById = useMemo(() => {
    const map = new Map<number, StriverQuestion>();
    STRIVER_180_TOPICS.forEach(topic => {
      topic.subtopics.forEach(sub => {
        sub.questions.forEach(q => {
          map.set(q.id, q);
        });
      });
    });
    return map;
  }, []);

  // ── Load tasks, history & members ─────────────────────────────────────────
  const isInitialMount = useRef(true);

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [fetchedTasks, fetchedHistory, fetchedMembers, userSolved] = await Promise.all([
        studyService.getDailyTasks(squad.id, selectedDate),
        studyService.getSquadSolvedHistory(squad.id),
        studyService.getUsers(squad.members),
        studyService.getUserProgress(squad.id, currentUser.id)
      ]);
      setTasks(fetchedTasks);
      setHistory(fetchedHistory);
      setMembers(fetchedMembers);
      setMySolved(userSolved);
    } catch (e) {
      console.warn('[TodayView] loadData error:', e);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [squad.id, squad.members.join(','), currentUser.id, selectedDate]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadData(false);
    } else {
      loadData(true);
    }
    const unsub = studyService.subscribe(() => {
      loadData(true); // Completely silent background sync, no flicker!
    });
    return unsub;
  }, [loadData]);

  // Format date heading
  const formattedDate = useMemo(() => {
    const d = new Date(selectedDate + 'T00:00:00');
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }, [selectedDate]);

  const changeDateBy = (offset: number) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // ── Member task aggregations ──────────────────────────────────────────────
  const memberStats = useMemo(() => {
    return squad.members.map(mid => {
      const u = members[mid] || {
        id: mid,
        name: `Member ${mid.slice(-4)}`,
        email: '',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${mid}`
      };
      const userTasks = tasks.filter(t => t.user_id === mid);
      const total = userTasks.length;
      const completed = userTasks.filter(t => t.completed).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { user: u, total, completed, percentage };
    });
  }, [squad.members, members, tasks]);

  // Tasks for the selected member
  const currentMemberTasks = useMemo(() => {
    return tasks.filter(t => t.user_id === selectedUserId);
  }, [tasks, selectedUserId]);

  const selectedMemberUser = members[selectedUserId] || {
    id: selectedUserId,
    name: isViewingSelf ? currentUser.name : 'Squad Mate',
    email: '',
    avatar: currentUser.avatar
  };

  // Filtered history entries
  const filteredHistory = useMemo(() => {
    if (historyUserFilter === 'all') return history;
    return history
      .map(day => {
        const filteredItems = day.items.filter(item => item.user_id === historyUserFilter);
        return {
          ...day,
          totalSolved: filteredItems.length,
          items: filteredItems
        };
      })
      .filter(day => day.items.length > 0);
  }, [history, historyUserFilter]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleToggleTask = async (task: DailyTask) => {
    if (!isViewingSelf) return; // Cannot modify other users' tasks!
    const newStatus = !task.completed;

    // Optimistic update
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, completed: newStatus, completed_at: newStatus ? new Date().toISOString() : null }
          : t
      )
    );

    if (task.question_id) {
      setMySolved(prev => {
        const next = new Set(prev);
        if (newStatus) next.add(task.question_id!);
        else next.delete(task.question_id!);
        return next;
      });
    }

    await studyService.toggleDailyTask(
      task.id,
      newStatus,
      squad.id,
      currentUser.id,
      task.question_id
    );
  };

  const handleCreateCustomTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const task = await studyService.addDailyTask(
        squad.id,
        currentUser.id,
        selectedDate,
        newTitle.trim(),
        null,
        'Custom Goal'
      );
      setTasks(prev => [...prev, task]);
      setNewTitle('');
    } catch (e) {
      console.warn('Failed to add custom task', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!isViewingSelf) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await studyService.deleteDailyTask(taskId);
  };

  const handlePickQuestion = async (q: StriverQuestion, topicTitle: string) => {
    // Check if already in today's tasks
    const exists = tasks.some(t => t.user_id === currentUser.id && t.question_id === q.id);
    if (exists) return;

    try {
      const task = await studyService.addDailyTask(
        squad.id,
        currentUser.id,
        selectedDate,
        q.label,
        q.id,
        topicTitle
      );
      setTasks(prev => [...prev, task]);
    } catch (e) {
      console.warn('Failed to add question to daily tasks', e);
    }
  };

  // Subtopics for the selected topic
  const availableSubtopics = useMemo(() => {
    if (pickerTopicId === 'all') return [];
    const topic = STRIVER_180_TOPICS.find(t => t.id === pickerTopicId);
    return topic ? topic.subtopics : [];
  }, [pickerTopicId]);

  // Questions for the picker modal (filtering completed, topic, subtopic, difficulty, sorting)
  const pickerQuestions = useMemo(() => {
    const qTerm = pickerSearch.toLowerCase().trim();
    const list: {
      question: StriverQuestion;
      topicLabel: string;
      subtopicLabel: string;
      difficultyText: 'Easy' | 'Medium' | 'Hard';
      difficultyOrder: number;
    }[] = [];

    STRIVER_180_TOPICS.forEach(topic => {
      if (pickerTopicId !== 'all' && topic.id !== pickerTopicId) return;
      topic.subtopics.forEach(sub => {
        if (pickerSubtopicId !== 'all' && sub.id !== pickerSubtopicId) return;
        sub.questions.forEach(q => {
          // Exclude questions already marked as done by this user
          if (hideCompletedInPicker && mySolved.has(q.id)) return;

          // Filter by difficulty
          if (pickerDifficulty !== 'all' && q.difficulty !== pickerDifficulty) return;

          // Search term filter
          if (
            qTerm &&
            !q.label.toLowerCase().includes(qTerm) &&
            !topic.label.toLowerCase().includes(qTerm) &&
            !sub.label.toLowerCase().includes(qTerm)
          ) {
            return;
          }

          const diffText: 'Easy' | 'Medium' | 'Hard' =
            q.difficulty === 'basic' ? 'Easy' : q.difficulty === 'pro' ? 'Hard' : 'Medium';
          const diffOrder = q.difficulty === 'basic' ? 1 : q.difficulty === 'core' ? 2 : 3;

          list.push({
            question: q,
            topicLabel: topic.label,
            subtopicLabel: sub.label,
            difficultyText: diffText,
            difficultyOrder: diffOrder
          });
        });
      });
    });

    // Sorting
    if (pickerSort === 'easy_to_hard') {
      list.sort((a, b) => a.difficultyOrder - b.difficultyOrder);
    } else if (pickerSort === 'hard_to_easy') {
      list.sort((a, b) => b.difficultyOrder - a.difficultyOrder);
    } else if (pickerSort === 'name') {
      list.sort((a, b) => a.question.label.localeCompare(b.question.label));
    }

    return list;
  }, [
    pickerSearch,
    pickerTopicId,
    pickerSubtopicId,
    pickerDifficulty,
    pickerSort,
    hideCompletedInPicker,
    mySolved
  ]);

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Mode Switcher (Today's Tasks vs Solved History) ────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {/* Main Mode Toggle: Tasks vs History */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveMode('tasks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeMode === 'tasks'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Today's Tasks</span>
            </button>
            <button
              onClick={() => setActiveMode('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeMode === 'history'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Daily Solved History</span>
            </button>
          </div>
        </div>

        {/* Mode-specific actions */}
        {activeMode === 'tasks' ? (
          <div className="flex items-center gap-2">
            {/* Date Navigator */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => changeDateBy(-1)}
                className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition cursor-pointer"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedDate(todayStr)}
                className={`px-3 py-1 text-xs font-semibold rounded transition cursor-pointer flex items-center gap-1.5 ${
                  isToday
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{isToday ? 'Today' : formattedDate}</span>
              </button>
              <button
                onClick={() => changeDateBy(1)}
                className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition cursor-pointer"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-200 text-xs font-medium transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>Pick Questions</span>
            </button>
          </div>
        ) : (
          /* History Member Filter */
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={historyUserFilter}
              onChange={e => setHistoryUserFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="all">All Members Activity</option>
              {squad.members.map(mid => {
                const u = members[mid];
                const isMe = mid === currentUser.id;
                return (
                  <option key={mid} value={mid}>
                    {isMe ? 'My History (You)' : u?.name || `Member ${mid.slice(-4)}`}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── MODE 1: TODAY'S TASKS CHECKLIST ─────────────────────────── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeMode === 'tasks' && (
        <>
          {/* Squad Members Tabs (See everyone's tasks!) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-medium uppercase tracking-wider text-[11px] text-zinc-500">
                Squad Daily Activity
              </span>
              <span className="text-[11px] text-zinc-500">
                Click any member to inspect their daily plan
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {memberStats.map(({ user: mUser, total, completed, percentage }) => {
                const isMe = mUser.id === currentUser.id;
                const isSelected = mUser.id === selectedUserId;

                return (
                  <button
                    key={mUser.id}
                    onClick={() => setSelectedUserId(mUser.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-800/90 border-zinc-600 text-zinc-100 shadow-sm'
                        : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={mUser.avatar}
                        alt={mUser.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                      />
                      {total > 0 && completed === total && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-zinc-950 font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold truncate max-w-[100px]">
                          {isMe ? 'You' : mUser.name}
                        </span>
                        {isMe && <span className="text-[10px] text-zinc-500 font-mono">(Me)</span>}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {total === 0 ? 'No tasks' : `${completed}/${total} done (${percentage}%)`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Member Viewing Banner & Checklist */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/60">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMemberUser.avatar}
                  alt={selectedMemberUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {isViewingSelf ? 'Your Daily Tasks' : `${selectedMemberUser.name}'s Daily Tasks`}
                    </h3>
                    {!isViewingSelf && (
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Read Only
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {isViewingSelf
                      ? 'Check off tasks as you finish them. Changes sync to your Roadmap progress.'
                      : `Viewing live study targets for ${selectedMemberUser.name}. Only they can mark tasks complete.`}
                  </p>
                </div>
              </div>

              {/* Quick summary numbers */}
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 self-end sm:self-auto">
                <span>
                  {currentMemberTasks.filter(t => t.completed).length} / {currentMemberTasks.length} Completed
                </span>
              </div>
            </div>

            {/* Add Custom Task Form (Only for self!) */}
            {isViewingSelf && (
              <form onSubmit={handleCreateCustomTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a daily study goal (e.g. 'Solve 3 Dynamic Programming problems')..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={!newTitle.trim() || isSubmitting}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            )}

            {/* Tasks Checklist */}
            <div className="space-y-2 pt-1">
              {loading && tasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">Loading daily tasks...</div>
              ) : currentMemberTasks.length === 0 ? (
                <div className="py-10 text-center space-y-2 border border-dashed border-zinc-800 rounded-xl p-6">
                  <CheckSquare className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-sm text-zinc-400 font-medium">
                    {isViewingSelf ? 'No tasks planned for this day yet' : `No tasks planned by ${selectedMemberUser.name}`}
                  </p>
                  {isViewingSelf && (
                    <div className="flex justify-center gap-2 pt-2">
                      <button
                        onClick={() => setIsPickerOpen(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition cursor-pointer"
                      >
                        + Pick from Roadmap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                currentMemberTasks.map(task => {
                  const isOwner = isViewingSelf;
                  const q = task.question_id ? questionById.get(task.question_id) : null;

                  return (
                    <div
                      key={task.id}
                      className={`group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border transition ${
                        task.completed
                          ? 'bg-zinc-950/60 border-zinc-800/60 text-zinc-500'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/90'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                          type="button"
                          disabled={!isOwner}
                          onClick={() => handleToggleTask(task)}
                          title={isOwner ? 'Toggle complete' : 'Only task owner can complete'}
                          className={`w-4 h-4 rounded border transition flex items-center justify-center shrink-0 ${
                            task.completed
                              ? 'bg-zinc-200 border-zinc-200 text-zinc-950'
                              : isOwner
                                ? 'border-zinc-700 hover:border-zinc-500 cursor-pointer bg-transparent'
                                : 'border-zinc-800 bg-zinc-950/80 cursor-not-allowed opacity-60'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              onClick={() => isOwner && handleToggleTask(task)}
                              className={`text-xs font-medium transition truncate ${
                                isOwner ? 'cursor-pointer' : ''
                              } ${
                                task.completed
                                  ? 'line-through text-zinc-500'
                                  : 'text-zinc-200 group-hover:text-white'
                              }`}
                            >
                              {task.title}
                            </span>

                            {q?.difficulty === 'core' && (
                              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded shrink-0">
                                Core
                              </span>
                            )}

                            {task.topic_title && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-mono shrink-0">
                                {task.topic_title}
                              </span>
                            )}

                            {task.question_id && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/50 text-zinc-500 font-mono shrink-0">
                                Q#{task.question_id}
                              </span>
                            )}
                          </div>

                          {task.completed_at && (
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                              Completed {new Date(task.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Resource Links on hover (LeetCode, YouTube, Article) + Delete */}
                      <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition">
                        {q?.leetcode_link && (
                          <a
                            href={q.leetcode_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
                            title="LeetCode Problem"
                            onClick={e => e.stopPropagation()}
                          >
                            <Code2 className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {q?.yt_video && (
                          <a
                            href={q.yt_video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                            title="YouTube Video Solution"
                            onClick={e => e.stopPropagation()}
                          >
                            <Youtube className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {(q?.article_link || q?.tuf_practice_link) && (
                          <a
                            href={q.article_link || q.tuf_practice_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-zinc-500 hover:text-cyan-400 hover:bg-zinc-800 transition"
                            title="Article / Notes"
                            onClick={e => e.stopPropagation()}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {isOwner && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDeleteTask(task.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded transition cursor-pointer ml-1"
                            title="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── MODE 2: DAILY SOLVED HISTORY (MULTI-DAY CHRONICLE) ────────── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeMode === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>Solved Activity By Day</span>
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              {filteredHistory.reduce((s, d) => s + d.totalSolved, 0)} total solved recorded
            </span>
          </div>

          {loading && history.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">Loading daily history...</div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-14 text-center space-y-3 border border-dashed border-zinc-800 rounded-2xl p-6">
              <History className="w-8 h-8 text-zinc-600 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm text-zinc-300 font-medium">No solved questions recorded yet</p>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  When you or your teammates check off questions in the Roadmap or Daily Tasks, they will automatically appear here grouped by day.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map(dayGroup => {
                const dayDate = new Date(dayGroup.date + 'T00:00:00');
                const isDayToday = dayGroup.date === todayStr;
                const formattedDay = dayDate.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div
                    key={dayGroup.date}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3.5 transition hover:border-zinc-700/80"
                  >
                    {/* Day Group Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/70">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isDayToday ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-zinc-600'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-zinc-100">
                              {formattedDay}
                            </h4>
                            {isDayToday && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                                Today
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Day Stats & Per-User pills */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 font-semibold border border-zinc-700/60">
                          {dayGroup.totalSolved} {dayGroup.totalSolved === 1 ? 'problem' : 'problems'} solved
                        </span>

                        {/* Breakdown per user */}
                        {Object.entries(dayGroup.byUser).map(([uid, count]) => {
                          const u = members[uid];
                          const isMe = uid === currentUser.id;
                          return (
                            <span
                              key={uid}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-950/80 text-zinc-400 border border-zinc-800 flex items-center gap-1.5"
                            >
                              <img
                                src={u?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`}
                                alt={u?.name || uid}
                                className="w-3.5 h-3.5 rounded-full object-cover"
                              />
                              <span>{isMe ? 'You' : u?.name || 'Member'}: {count}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Solved Items for this Day */}
                    <div className="space-y-2">
                      {dayGroup.items.map(item => {
                        const solver = members[item.user_id];
                        const isMe = item.user_id === currentUser.id;
                        const q = item.question_id ? questionById.get(item.question_id) : null;
                        const solvedTime = item.solved_at
                          ? new Date(item.solved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : null;

                        return (
                          <div
                            key={item.id}
                            className="group flex items-center justify-between gap-3 p-2.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700/60 hover:bg-zinc-950/80 transition select-none"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                                    {item.title}
                                  </span>
                                  {q?.difficulty === 'core' && (
                                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded shrink-0">
                                      Core
                                    </span>
                                  )}
                                  {item.topic && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-mono">
                                      {item.topic}
                                    </span>
                                  )}
                                  {item.question_id && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/40 text-zinc-500 font-mono">
                                      Q#{item.question_id}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Resource Links on hover */}
                            <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition">
                              {q?.leetcode_link && (
                                <a
                                  href={q.leetcode_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
                                  title="LeetCode Problem"
                                  onClick={e => e.stopPropagation()}
                                >
                                  <Code2 className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {q?.yt_video && (
                                <a
                                  href={q.yt_video}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                                  title="YouTube Video Solution"
                                  onClick={e => e.stopPropagation()}
                                >
                                  <Youtube className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {(q?.article_link || q?.tuf_practice_link) && (
                                <a
                                  href={q.article_link || q.tuf_practice_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded text-zinc-500 hover:text-cyan-400 hover:bg-zinc-800 transition"
                                  title="Article / Notes"
                                  onClick={e => e.stopPropagation()}
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            {/* Solver Info + Time */}
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={solver?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${item.user_id}`}
                                  alt={solver?.name || 'Member'}
                                  className="w-4 h-4 rounded-full object-cover border border-zinc-700"
                                />
                                <span className={`text-[11px] truncate max-w-[80px] sm:max-w-[120px] ${
                                  isMe ? 'text-zinc-300 font-medium' : 'text-zinc-400'
                                }`}>
                                  {isMe ? 'You' : solver?.name || 'Member'}
                                </span>
                              </div>

                              {solvedTime && (
                                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                                  {solvedTime}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Modal: Pick Questions from Striver Roadmap ───────────────── */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#121215] shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                  Pick from Roadmap
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Browse and pick unsolved roadmap questions for your daily queue.
                </p>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="py-3.5 space-y-2.5 border-b border-zinc-800/80">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by question title, topic, or subtopic..."
                  value={pickerSearch}
                  onChange={e => setPickerSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              {/* Multi-Filter Row: Topic, Subtopic, Difficulty, Sort */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Topic selector */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                    Topic
                  </label>
                  <select
                    value={pickerTopicId}
                    onChange={e => {
                      const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                      setPickerTopicId(val);
                      setPickerSubtopicId('all'); // Reset subtopic on topic change
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none truncate"
                  >
                    <option value="all">All Topics ({STRIVER_180_TOPICS.length})</option>
                    {STRIVER_180_TOPICS.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subtopic selector */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                    Subtopic
                  </label>
                  <select
                    value={pickerSubtopicId}
                    disabled={pickerTopicId === 'all'}
                    onChange={e => setPickerSubtopicId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none truncate disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="all">
                      {pickerTopicId === 'all' ? 'Select topic first' : `All Subtopics (${availableSubtopics.length})`}
                    </option>
                    {availableSubtopics.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty selector */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={pickerDifficulty}
                    onChange={e => setPickerDifficulty(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none truncate"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="basic">Easy (Basic)</option>
                    <option value="core">Medium (Core)</option>
                    <option value="pro">Hard (Pro)</option>
                  </select>
                </div>

                {/* Sort selector */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                    Sort By
                  </label>
                  <select
                    value={pickerSort}
                    onChange={e => setPickerSort(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none truncate"
                  >
                    <option value="default">Topic Order (Default)</option>
                    <option value="easy_to_hard">Easy → Medium → Hard</option>
                    <option value="hard_to_easy">Hard → Medium → Easy</option>
                    <option value="name">Name (A → Z)</option>
                  </select>
                </div>
              </div>

              {/* Status Toolbar: Hide Completed Toggle + Count */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-300 hover:text-zinc-100">
                  <input
                    type="checkbox"
                    checked={hideCompletedInPicker}
                    onChange={e => setHideCompletedInPicker(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 text-zinc-200 accent-zinc-500 cursor-pointer"
                  />
                  <span>Hide already completed questions</span>
                  <span className="text-[10px] text-zinc-500 font-mono">({mySolved.size} solved)</span>
                </label>

                <span className="text-zinc-500 font-mono text-[11px]">
                  {pickerQuestions.length} available
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
              {pickerQuestions.length === 0 ? (
                <div className="py-14 text-center space-y-1">
                  <p className="text-xs text-zinc-400 font-medium">No questions match your filter</p>
                  <p className="text-[11px] text-zinc-500">
                    {hideCompletedInPicker
                      ? 'All matching questions may already be marked as done, or adjust your search filters.'
                      : 'Try broadening your search or filter options.'}
                  </p>
                </div>
              ) : (
                pickerQuestions.map(({ question, topicLabel, subtopicLabel, difficultyText }) => {
                  const alreadyAdded = tasks.some(
                    t => t.user_id === currentUser.id && t.question_id === question.id
                  );
                  const isDone = mySolved.has(question.id);

                  return (
                    <div
                      key={question.id}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition ${
                        alreadyAdded
                          ? 'bg-zinc-950/40 border-zinc-800/40 opacity-60'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/90'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        {/* Topic & Subtopic breadcrumbs + Difficulty badge */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-zinc-400 font-mono bg-zinc-800/70 border border-zinc-700/60 px-2 py-0.5 rounded">
                            {topicLabel} › {subtopicLabel}
                          </span>

                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium ${
                              difficultyText === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : difficultyText === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}
                          >
                            {difficultyText}
                          </span>

                          <span className="text-[10px] text-zinc-500 font-mono">
                            Q#{question.id}
                          </span>

                          {isDone && (
                            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded">
                              ✓ Solved
                            </span>
                          )}
                        </div>

                        {/* Question title */}
                        <div className="text-xs font-semibold text-zinc-100 truncate">
                          {question.label}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        disabled={alreadyAdded}
                        onClick={() => handlePickQuestion(question, `${topicLabel} › ${subtopicLabel}`)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                          alreadyAdded
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-zinc-100 hover:bg-white text-zinc-950'
                        }`}
                      >
                        {alreadyAdded ? 'Added' : '+ Add to Today'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                {pickerQuestions.length} questions listed
              </span>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

