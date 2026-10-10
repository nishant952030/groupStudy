import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search, ChevronDown, ChevronRight, Check, Code2,
  Youtube, BookOpen, Loader2, Plus, ArrowUpDown
} from 'lucide-react';
import { Squad, User } from '../types';
import { studyService, TOTAL_STRIVER_QUESTIONS } from '../services/studyService';
import { STRIVER_180_TOPICS, StriverTopic, StriverQuestion } from '../data/striver180Data';

interface Props {
  squad: Squad;
  currentUserId: string;
}

export const RoadmapView: React.FC<Props> = ({ squad, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'basic' | 'core' | 'pro'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'easy_to_hard' | 'hard_to_easy' | 'name'>('default');

  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({
    [STRIVER_180_TOPICS[0].id]: true
  });
  const [expandedSubtopics, setExpandedSubtopics] = useState<Record<number, boolean>>({
    [STRIVER_180_TOPICS[0].subtopics[0].id]: true
  });

  // My solved set
  const [mySolved, setMySolved] = useState<Set<number>>(new Set());
  // Squad progress: questionId -> set of userIds who solved it
  const [squadProgress, setSquadProgress] = useState<Record<number, Set<string>>>({});
  // Question IDs already added to today's tasks
  const [todayTaskQuestionIds, setTodayTaskQuestionIds] = useState<Set<number>>(new Set());
  // Squad member users
  const [members, setMembers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [addedToastId, setAddedToastId] = useState<number | null>(null);

  // Load progress, members, and today's tasks
  const loadData = useCallback(async () => {
    setLoading(true);
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const [myProgress, squadProg, memberUsers, todayTasks] = await Promise.all([
        studyService.getUserProgress(squad.id, currentUserId),
        studyService.getSquadProgress(squad.id),
        studyService.getUsers(squad.members),
        studyService.getDailyTasks(squad.id, todayStr)
      ]);
      setMySolved(myProgress);
      setSquadProgress(squadProg);
      setMembers(memberUsers);

      const myTodayQIds = new Set<number>(
        todayTasks
          .filter(t => t.user_id === currentUserId && t.question_id)
          .map(t => t.question_id!)
      );
      setTodayTaskQuestionIds(myTodayQIds);
    } catch (e) {
      console.warn('[RoadmapView] loadData error:', e);
    } finally {
      setLoading(false);
    }
  }, [squad.id, currentUserId, squad.members.join(',')]);

  useEffect(() => {
    loadData();
    const todayStr = new Date().toISOString().split('T')[0];

    // ── Real-time Firestore subscriptions ──
    const unsubMyProgress = studyService.subscribeUserProgress(squad.id, currentUserId, (liveSolved) => {
      setMySolved(liveSolved);
    });

    const unsubSquadProgress = studyService.subscribeSquadProgress(squad.id, (liveProg) => {
      setSquadProgress(liveProg);
    });

    const unsubTodayTasks = studyService.subscribeDailyTasks(squad.id, todayStr, (liveTasks) => {
      const myTodayQIds = new Set<number>(
        liveTasks
          .filter(t => t.user_id === currentUserId && t.question_id)
          .map(t => t.question_id!)
      );
      setTodayTaskQuestionIds(myTodayQIds);
    });

    const unsubNotify = studyService.subscribe(() => {
      studyService.getUserProgress(squad.id, currentUserId).then(setMySolved).catch(() => {});
      studyService.getSquadProgress(squad.id).then(setSquadProgress).catch(() => {});
    });

    return () => {
      unsubMyProgress();
      unsubSquadProgress();
      unsubTodayTasks();
      unsubNotify();
    };
  }, [squad.id, currentUserId, loadData]);

  // Optimistic toggle solved
  const handleToggleSolved = useCallback(async (questionId: number) => {
    const wasSolved = mySolved.has(questionId);
    const newSolved = new Set(mySolved);
    if (wasSolved) newSolved.delete(questionId);
    else newSolved.add(questionId);
    setMySolved(newSolved);

    // Update squad progress optimistically
    setSquadProgress(prev => {
      const updated = { ...prev };
      if (!updated[questionId]) updated[questionId] = new Set();
      else updated[questionId] = new Set(updated[questionId]);
      if (wasSolved) updated[questionId].delete(currentUserId);
      else updated[questionId].add(currentUserId);
      return updated;
    });

    await studyService.setQuestionSolved(squad.id, currentUserId, questionId, !wasSolved);
  }, [mySolved, squad.id, currentUserId]);

  const handleAddToToday = async (q: StriverQuestion, topicTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (todayTaskQuestionIds.has(q.id) || mySolved.has(q.id)) return;

    // Optimistically mark as added
    setTodayTaskQuestionIds(prev => new Set(prev).add(q.id));
    setAddedToastId(q.id);
    setTimeout(() => setAddedToastId(null), 2000);

    const todayStr = new Date().toISOString().split('T')[0];
    try {
      await studyService.addDailyTask(
        squad.id,
        currentUserId,
        todayStr,
        q.label || q.slug,
        q.id,
        topicTitle
      );
    } catch (err) {
      console.warn('Failed to add to today', err);
      // Revert optimistic update on failure
      setTodayTaskQuestionIds(prev => {
        const next = new Set(prev);
        next.delete(q.id);
        return next;
      });
    }
  };

  const toggleTopic = (id: number) =>
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleSubtopic = (id: number) =>
    setExpandedSubtopics(prev => ({ ...prev, [id]: !prev[id] }));

  const expandAll = () => {
    const t: Record<number, boolean> = {};
    const s: Record<number, boolean> = {};
    STRIVER_180_TOPICS.forEach(topic => {
      t[topic.id] = true;
      topic.subtopics.forEach(sub => { s[sub.id] = true; });
    });
    setExpandedTopics(t);
    setExpandedSubtopics(s);
  };

  const collapseAll = () => {
    setExpandedTopics({});
    setExpandedSubtopics({});
  };

  // Dynamic counts for difficulties based on current topic selection
  const difficultyCounts = useMemo(() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;
    let total = 0;
    STRIVER_180_TOPICS.forEach(topic => {
      if (selectedTopicId !== 'all' && topic.id !== selectedTopicId) return;
      topic.subtopics.forEach(sub => {
        sub.questions.forEach(q => {
          total++;
          if (q.difficulty === 'basic') easy++;
          else if (q.difficulty === 'pro') hard++;
          else medium++;
        });
      });
    });
    return { easy, medium, hard, total };
  }, [selectedTopicId]);

  // Filtered & sorted topics
  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STRIVER_180_TOPICS
      .filter(t => selectedTopicId === 'all' || t.id === selectedTopicId)
      .map(topic => {
        const subs = topic.subtopics
          .map(sub => {
            let questions = sub.questions.filter(quest => {
              if (
                q &&
                !quest.label.toLowerCase().includes(q) &&
                !quest.pattern.toLowerCase().includes(q) &&
                !topic.label.toLowerCase().includes(q)
              ) {
                return false;
              }

              if (selectedDifficulty !== 'all') {
                if (selectedDifficulty === 'basic' && quest.difficulty !== 'basic') return false;
                if (selectedDifficulty === 'core' && quest.difficulty !== 'core') return false;
                if (selectedDifficulty === 'pro' && quest.difficulty !== 'pro') return false;
              }

              if (statusFilter === 'unsolved' && mySolved.has(quest.id)) return false;
              if (statusFilter === 'solved' && !mySolved.has(quest.id)) return false;

              return true;
            });

            if (sortBy === 'easy_to_hard') {
              const diffOrder = (d: string) => d === 'basic' ? 1 : d === 'core' ? 2 : 3;
              questions = [...questions].sort((a, b) => diffOrder(a.difficulty) - diffOrder(b.difficulty));
            } else if (sortBy === 'hard_to_easy') {
              const diffOrder = (d: string) => d === 'basic' ? 1 : d === 'core' ? 2 : 3;
              questions = [...questions].sort((a, b) => diffOrder(b.difficulty) - diffOrder(a.difficulty));
            } else if (sortBy === 'name') {
              questions = [...questions].sort((a, b) => a.label.localeCompare(b.label));
            }

            return questions.length ? { ...sub, questions } : null;
          })
          .filter(Boolean) as typeof topic.subtopics;
        return subs.length ? { ...topic, subtopics: subs } : null;
      })
      .filter(Boolean) as StriverTopic[];
  }, [searchQuery, selectedTopicId, selectedDifficulty, statusFilter, sortBy, mySolved]);

  // Auto-expand topics and subtopics when search or filters are active
  useEffect(() => {
    if (searchQuery.trim() || selectedDifficulty !== 'all' || statusFilter !== 'all') {
      const t: Record<number, boolean> = {};
      const s: Record<number, boolean> = {};
      filteredTopics.forEach(topic => {
        t[topic.id] = true;
        topic.subtopics.forEach(sub => { s[sub.id] = true; });
      });
      setExpandedTopics(t);
      setExpandedSubtopics(s);
    }
  }, [searchQuery, selectedDifficulty, statusFilter, filteredTopics]);

  // Stats
  const solvedCount = mySolved.size;
  const percent = Math.round((solvedCount / TOTAL_STRIVER_QUESTIONS) * 100);

  // Teammate avatars for a question (excluding self, max 3)
  const getTeammateAvatars = (questionId: number) => {
    const solvers = squadProgress[questionId];
    if (!solvers) return [];
    return [...solvers]
      .filter(uid => uid !== currentUserId && members[uid])
      .slice(0, 3)
      .map(uid => members[uid]);
  };

  return (
    <div className="space-y-5 pb-16 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="space-y-4 pt-1">
        <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
          <span>{squad.name}</span>
          <span>/</span>
          <span className="text-zinc-400">Striver's 180</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-zinc-800/80">
          {/* Title */}
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
              Striver's 180 – Master DSA Patterns
            </h1>
            <p className="text-xs text-zinc-400 max-w-lg">
              179 curated DSA problems organized by topic and pattern with LeetCode, video, and editorial links.
              Check off problems as you solve them — your squad sees your progress in real time.
            </p>
          </div>

          {/* Progress widget */}
          <div className="bg-[#111113] border border-zinc-800 rounded-xl p-4 min-w-[220px] lg:w-64 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Your Progress</span>
              <span className="text-xs font-mono text-zinc-400">{solvedCount} / {TOTAL_STRIVER_QUESTIONS}</span>
            </div>
            <div className="text-3xl font-bold text-zinc-100 font-mono">{percent}%</div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-100 transition-all duration-500 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Controls ── */}
      <div className="space-y-3">
        {/* Row 1: Search + Expand/Collapse */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems, patterns, or topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>
          <button onClick={expandAll} className="px-2.5 py-2 text-xs text-zinc-400 hover:text-zinc-200 bg-[#111113] border border-zinc-800 rounded-lg transition shrink-0 cursor-pointer">
            Expand All
          </button>
          <button onClick={collapseAll} className="px-2.5 py-2 text-xs text-zinc-400 hover:text-zinc-200 bg-[#111113] border border-zinc-800 rounded-lg transition shrink-0 cursor-pointer">
            Collapse
          </button>
        </div>

        {/* Row 2: Difficulty Filter + Status Filter + Sort By */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">Difficulty:</span>
            <div className="flex items-center gap-1 bg-[#111113] p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  selectedDifficulty === 'all'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({difficultyCounts.total})
              </button>
              <button
                onClick={() => setSelectedDifficulty('basic')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedDifficulty === 'basic'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-emerald-400'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Easy ({difficultyCounts.easy})
              </button>
              <button
                onClick={() => setSelectedDifficulty('core')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedDifficulty === 'core'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-400 hover:text-amber-400'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Medium ({difficultyCounts.medium})
              </button>
              <button
                onClick={() => setSelectedDifficulty('pro')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedDifficulty === 'pro'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-zinc-400 hover:text-rose-400'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Hard ({difficultyCounts.hard})
              </button>
            </div>
          </div>

          {/* Right Controls: Status & Sort */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-[#111113] p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('unsolved')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  statusFilter === 'unsolved'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Unsolved
              </button>
              <button
                onClick={() => setStatusFilter('solved')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  statusFilter === 'solved'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Solved
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#111113] border border-zinc-800 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                aria-label="Sort problems"
                className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-zinc-900 text-zinc-200">Default (Sheet Order)</option>
                <option value="easy_to_hard" className="bg-zinc-900 text-zinc-200">Difficulty: Easy → Hard</option>
                <option value="hard_to_easy" className="bg-zinc-900 text-zinc-200">Difficulty: Hard → Easy</option>
                <option value="name" className="bg-zinc-900 text-zinc-200">Name (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Topic Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedTopicId('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedTopicId === 'all'
                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                : 'bg-[#111113] text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            All ({TOTAL_STRIVER_QUESTIONS})
          </button>
          {STRIVER_180_TOPICS.map(topic => {
            const count = topic.subtopics.reduce((s, sub) => s + sub.questions.length, 0);
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedTopicId === topic.id
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'bg-[#111113] text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {topic.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Question Tree ── */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="py-16 text-center border border-zinc-800/60 rounded-xl bg-[#0f0f12] space-y-2">
          <p className="text-sm text-zinc-300 font-medium">No problems match your filters</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search query, difficulty filter, or topic selection to view questions.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopicId('all');
              setSelectedDifficulty('all');
              setStatusFilter('all');
            }}
            className="mt-2 px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTopics.map(topic => {
            const isTopicOpen = expandedTopics[topic.id] ?? false;
            const topicQuestions = topic.subtopics.flatMap(s => s.questions);
            const topicSolved = topicQuestions.filter(q => mySolved.has(q.id)).length;

            return (
              <div key={topic.id} className="rounded-xl border border-zinc-800/80 bg-[#0f0f12] overflow-hidden">
                {/* Topic Header */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-[#141417] hover:bg-[#18181c] transition text-left cursor-pointer border-b border-zinc-800/60 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    {isTopicOpen
                      ? <ChevronDown className="w-4 h-4 text-zinc-400" />
                      : <ChevronRight className="w-4 h-4 text-zinc-400" />}
                    <span className="text-sm font-semibold text-zinc-200">{topic.label}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {topicSolved}/{topicQuestions.length}
                  </span>
                </button>

                {/* Subtopics */}
                {isTopicOpen && (
                  <div className="divide-y divide-zinc-800/50">
                    {topic.subtopics.map(subtopic => {
                      const isSubOpen = expandedSubtopics[subtopic.id] ?? true;
                      const subSolved = subtopic.questions.filter(q => mySolved.has(q.id)).length;

                      return (
                        <div key={subtopic.id} className="px-4 py-3 space-y-1.5">
                          {/* Subtopic / Pattern Header */}
                          <button
                            type="button"
                            onClick={() => toggleSubtopic(subtopic.id)}
                            className="w-full flex items-center justify-between py-0.5 text-left cursor-pointer select-none group"
                          >
                            <div className="flex items-center gap-2">
                              {isSubOpen
                                ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                                : <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />}
                              <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition">
                                {subtopic.label}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-zinc-600">
                              {subSolved}/{subtopic.questions.length}
                            </span>
                          </button>

                          {/* Question Rows */}
                          {isSubOpen && (
                            <div className="pl-5 border-l border-zinc-800/70 space-y-0.5">
                              {subtopic.questions.map(q => {
                                const isSolved = mySolved.has(q.id);
                                const isAddedToToday = todayTaskQuestionIds.has(q.id);
                                const teammates = getTeammateAvatars(q.id);

                                return (
                                  <div
                                    key={q.id}
                                    className="group flex items-center justify-between py-2 px-2 rounded-lg hover:bg-zinc-800/30 transition gap-3 select-none"
                                  >
                                    {/* Left: Checkbox + Title + Badges */}
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <button
                                        type="button"
                                        onClick={() => handleToggleSolved(q.id)}
                                        className={`w-4 h-4 rounded border transition flex items-center justify-center shrink-0 cursor-pointer ${
                                          isSolved
                                            ? 'bg-zinc-200 border-zinc-200 text-zinc-950'
                                            : 'border-zinc-700 hover:border-zinc-500 bg-transparent'
                                        }`}
                                        title={isSolved ? 'Mark unsolved' : 'Mark solved'}
                                      >
                                        {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                                      </button>

                                      <span
                                        onClick={() => handleToggleSolved(q.id)}
                                        className={`text-xs font-medium cursor-pointer transition truncate ${
                                          isSolved
                                            ? 'line-through text-zinc-500'
                                            : 'text-zinc-200 group-hover:text-white'
                                        }`}
                                      >
                                        {q.label}
                                      </span>

                                      {/* Difficulty Tag */}
                                      <span
                                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium shrink-0 ${
                                          q.difficulty === 'basic'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : q.difficulty === 'pro'
                                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}
                                      >
                                        {q.difficulty === 'basic' ? 'Easy' : q.difficulty === 'pro' ? 'Hard' : 'Medium'}
                                      </span>

                                      {/* Teammate solved avatars */}
                                      {teammates.length > 0 && (
                                        <div className="flex items-center -space-x-1.5 shrink-0">
                                          {teammates.map(tm => (
                                            <img
                                              key={tm.id}
                                              src={tm.avatar}
                                              alt={tm.name}
                                              title={`${tm.name} solved this`}
                                              className="w-4 h-4 rounded-full border border-zinc-800 object-cover"
                                            />
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Right: Resource Links + Add to Today */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      {/* Solved / Added / Today Action Button */}
                                      {isSolved ? (
                                        <span
                                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 select-none shrink-0"
                                          title="You have solved this question"
                                        >
                                          <Check className="w-3 h-3 stroke-[3]" />
                                          <span>Solved</span>
                                        </span>
                                      ) : isAddedToToday ? (
                                        <button
                                          disabled
                                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-500 border border-zinc-700/60 flex items-center gap-1 cursor-not-allowed select-none shrink-0"
                                          title="Already added to Today's Tasks"
                                        >
                                          <Check className="w-3 h-3 text-zinc-500 stroke-[3]" />
                                          <span>Added</span>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={e => handleAddToToday(q, topic.label, e)}
                                          className={`px-2 py-0.5 rounded text-[10px] font-mono transition flex items-center gap-1 cursor-pointer shrink-0 ${
                                            addedToastId === q.id
                                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                              : 'text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700'
                                          }`}
                                          title="Add to today's daily tasks"
                                        >
                                          <Plus className="w-3 h-3" />
                                          <span>{addedToastId === q.id ? 'Added!' : 'Today'}</span>
                                        </button>
                                      )}

                                      {/* Resource Links */}
                                      <div className="flex items-center gap-0.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition">
                                        {q.leetcode_link && (
                                          <a
                                            href={q.leetcode_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded text-zinc-500 hover:text-zinc-200 transition"
                                            title="LeetCode"
                                            onClick={e => e.stopPropagation()}
                                          >
                                            <Code2 className="w-3.5 h-3.5" />
                                          </a>
                                        )}
                                        {q.yt_video && (
                                          <a
                                            href={q.yt_video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded text-zinc-500 hover:text-red-400 transition"
                                            title="Video"
                                            onClick={e => e.stopPropagation()}
                                          >
                                            <Youtube className="w-3.5 h-3.5" />
                                          </a>
                                        )}
                                        {q.article_link && (
                                          <a
                                            href={q.article_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded text-zinc-500 hover:text-zinc-200 transition"
                                            title="Article"
                                            onClick={e => e.stopPropagation()}
                                          >
                                            <BookOpen className="w-3.5 h-3.5" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
