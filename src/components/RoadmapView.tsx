import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search, ChevronDown, ChevronRight, Check, Code2,
  Youtube, BookOpen, Loader2, Plus
} from 'lucide-react';
import { Squad, User } from '../types';
import { studyService, TOTAL_STRIVER_QUESTIONS } from '../services/studyService';
import { STRIVER_180_TOPICS, StriverTopic } from '../data/striver180Data';

interface Props {
  squad: Squad;
  currentUserId: string;
}

export const RoadmapView: React.FC<Props> = ({ squad, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>('all');
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
  // Squad member users
  const [members, setMembers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [addedToastId, setAddedToastId] = useState<number | null>(null);

  // Load progress and members
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [myProgress, squadProg, memberUsers] = await Promise.all([
        studyService.getUserProgress(squad.id, currentUserId),
        studyService.getSquadProgress(squad.id),
        studyService.getUsers(squad.members)
      ]);
      setMySolved(myProgress);
      setSquadProgress(squadProg);
      setMembers(memberUsers);
    } catch (e) {
      console.warn('[RoadmapView] loadData error:', e);
    } finally {
      setLoading(false);
    }
  }, [squad.id, currentUserId, squad.members.join(',')]);

  useEffect(() => { loadData(); }, [loadData]);

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

  const handleAddToToday = async (q: any, topicTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      await studyService.addDailyTask(
        squad.id,
        currentUserId,
        todayStr,
        q.title,
        q.id,
        topicTitle
      );
      setAddedToastId(q.id);
      setTimeout(() => setAddedToastId(null), 2000);
    } catch (err) {
      console.warn('Failed to add to today', err);
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

  // Filtered topics
  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STRIVER_180_TOPICS
      .filter(t => selectedTopicId === 'all' || t.id === selectedTopicId)
      .map(topic => {
        const subs = topic.subtopics
          .map(sub => {
            const questions = sub.questions.filter(quest =>
              !q ||
              quest.label.toLowerCase().includes(q) ||
              quest.pattern.toLowerCase().includes(q) ||
              topic.label.toLowerCase().includes(q)
            );
            return questions.length ? { ...sub, questions } : null;
          })
          .filter(Boolean) as typeof topic.subtopics;
        return subs.length ? { ...topic, subtopics: subs } : null;
      })
      .filter(Boolean) as StriverTopic[];
  }, [searchQuery, selectedTopicId]);

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
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems or patterns..."
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

                                      {q.difficulty === 'core' && (
                                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded shrink-0">
                                          Core
                                        </span>
                                      )}

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
                                    <div className="flex items-center gap-1.5 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition">
                                      <button
                                        onClick={e => handleAddToToday(q, topic.label, e)}
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition flex items-center gap-1 cursor-pointer ${
                                          addedToastId === q.id
                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent'
                                        }`}
                                        title="Add to today's daily tasks"
                                      >
                                        <Plus className="w-3 h-3" />
                                        <span>{addedToastId === q.id ? 'Added!' : 'Today'}</span>
                                      </button>

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
