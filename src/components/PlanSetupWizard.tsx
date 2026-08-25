import React, { useState } from 'react';
import {
  X, Sparkles, ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2,
  BookOpen, Calendar, Clock, Tag, ChevronDown, ChevronUp, Zap, Map, Loader2
} from 'lucide-react';
import { getTodayDateString } from '../services/studyService';

// ─── Types ──────────────────────────────────────────────────────────────────

interface SubtaskDraft {
  id: string;
  title: string;
  description: string;
  resources: string;
  priority: 'low' | 'medium' | 'high';
  estimated_hours: string;
}

interface TopicDraft {
  id: string;
  title: string;
  description: string;
  estimated_days: string;
  tasks: SubtaskDraft[];
  collapsed: boolean;
}

interface WizardData {
  title: string;
  description: string;
  type: 'roadmap' | 'sprint';
  start_date: string;
  end_date: string;
}

interface PlanSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    type: 'roadmap' | 'sprint';
    start_date?: string;
    end_date?: string;
    topics: {
      title: string;
      description?: string;
      estimated_days?: number;
      tasks: {
        title: string;
        description?: string;
        resources?: string;
        priority?: 'low' | 'medium' | 'high';
        estimated_hours?: number;
      }[];
    }[];
  }) => Promise<void>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function blankTask(): SubtaskDraft {
  return { id: uid(), title: '', description: '', resources: '', priority: 'medium', estimated_hours: '' };
}

function blankTopic(defaultTaskTitle = ''): TopicDraft {
  return {
    id: uid(), title: '', description: '', estimated_days: '', collapsed: false,
    tasks: [{ ...blankTask(), title: defaultTaskTitle }]
  };
}

// ─── Subtask Row ─────────────────────────────────────────────────────────────

const SubtaskRow: React.FC<{
  task: SubtaskDraft;
  index: number;
  onUpdate: (field: keyof SubtaskDraft, value: string) => void;
  onDelete: () => void;
  canDelete: boolean;
}> = ({ task, index, onUpdate, onDelete, canDelete }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="group/task">
      <div className="flex items-center gap-2.5 py-2 pl-4 pr-2 hover:bg-white/[0.02] rounded-xl transition">
        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
        <input
          type="text"
          placeholder={`Subtask ${index + 1} (e.g. Solve Two Sum, Read Ch 3)`}
          value={task.title}
          onChange={e => onUpdate('title', e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:text-white min-w-0"
        />
        <div className="flex items-center gap-1 opacity-0 group-hover/task:opacity-100 transition shrink-0">
          <button
            type="button"
            onClick={() => setShowDetail(p => !p)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition text-[10px]"
            title="More details"
          >
            {showDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {canDelete && (
            <button type="button" onClick={onDelete} className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {/* priority dot */}
        <div className={`w-2 h-2 rounded-full shrink-0 ${task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
      </div>

      {showDetail && (
        <div className="ml-7 mb-2 grid grid-cols-1 sm:grid-cols-2 gap-2 pr-2 pb-2 border-l-2 border-violet-800/40 pl-3.5 bg-[#090C16]/60 rounded-r-xl p-2.5">
          <textarea
            rows={2}
            placeholder="Instructions / approach details / key concepts..."
            value={task.description}
            onChange={e => onUpdate('description', e.target.value)}
            className="sm:col-span-2 w-full bg-[#101424] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none font-sans"
          />
          <input
            type="text"
            placeholder="Resources / LeetCode link / Book ref"
            value={task.resources}
            onChange={e => onUpdate('resources', e.target.value)}
            className="bg-[#101424] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
          <div className="flex items-center gap-2">
            <select
              value={task.priority}
              onChange={e => onUpdate('priority', e.target.value)}
              className="flex-1 bg-[#101424] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="high" className="bg-[#101424]">🔴 High Priority</option>
              <option value="medium" className="bg-[#101424]">🟡 Medium Priority</option>
              <option value="low" className="bg-[#101424]">🔵 Low Priority</option>
            </select>
            <input
              type="number"
              placeholder="hrs"
              min="0.5"
              step="0.5"
              value={task.estimated_hours}
              onChange={e => onUpdate('estimated_hours', e.target.value)}
              className="w-18 bg-[#101424] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Topic Block ──────────────────────────────────────────────────────────────

const TopicBlock: React.FC<{
  topic: TopicDraft;
  index: number;
  onUpdate: (updated: TopicDraft) => void;
  onDelete: () => void;
  canDelete: boolean;
}> = ({ topic, index, onUpdate, onDelete, canDelete }) => {
  const updateTask = (taskId: string, field: keyof SubtaskDraft, value: string) => {
    onUpdate({ ...topic, tasks: topic.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t) });
  };
  const addTask = () => onUpdate({ ...topic, tasks: [...topic.tasks, blankTask()] });
  const removeTask = (taskId: string) => onUpdate({ ...topic, tasks: topic.tasks.filter(t => t.id !== taskId) });
  const toggle = () => onUpdate({ ...topic, collapsed: !topic.collapsed });

  const totalTasks = topic.tasks.length;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101424]/80 overflow-hidden shadow-md">
      {/* Topic header */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#14192C]/90 border-b border-white/[0.05]">
        <button type="button" onClick={toggle} className="text-slate-400 hover:text-white transition shrink-0">
          {topic.collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        <span className="text-xs font-black text-violet-400 font-display shrink-0 w-4">{index + 1}.</span>

        <input
          type="text"
          placeholder="Topic title (e.g. Arrays & Hashing, System Design Basics)"
          value={topic.title}
          onChange={e => onUpdate({ ...topic, title: e.target.value })}
          className="flex-1 bg-transparent text-sm font-bold text-white placeholder-slate-500 focus:outline-none min-w-0"
        />

        <span className="text-[11px] text-slate-400 shrink-0 font-medium hidden sm:block bg-white/[0.04] px-2 py-0.5 rounded-md">
          {totalTasks} subtask{totalTasks !== 1 ? 's' : ''}
        </span>

        {canDelete && (
          <button type="button" onClick={onDelete} className="text-slate-500 hover:text-rose-400 transition shrink-0 p-1">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Optional topic details */}
      {!topic.collapsed && (
        <>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04] bg-[#0A0C16]/50">
            <input
              type="text"
              placeholder="Short topic summary or prerequisites (optional)"
              value={topic.description}
              onChange={e => onUpdate({ ...topic, description: e.target.value })}
              className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="w-3 h-3 text-slate-500" />
              <input
                type="number"
                placeholder="days"
                min="1"
                value={topic.estimated_days}
                onChange={e => onUpdate({ ...topic, estimated_days: e.target.value })}
                className="w-14 bg-[#101424] border border-white/[0.08] rounded-lg px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <span className="text-[10px] text-slate-400 font-medium">days</span>
            </div>
          </div>

          {/* Subtask list */}
          <div className="py-2 px-2 space-y-1">
            {topic.tasks.map((task, ti) => (
              <SubtaskRow
                key={task.id}
                task={task}
                index={ti}
                onUpdate={(field, value) => updateTask(task.id, field, value)}
                onDelete={() => removeTask(task.id)}
                canDelete={topic.tasks.length > 1}
              />
            ))}
          </div>

          {/* Add subtask */}
          <div className="px-4 pb-3 pt-1">
            <button
              type="button"
              onClick={addTask}
              className="flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add subtask
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export const PlanSetupWizard: React.FC<PlanSetupWizardProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [meta, setMeta] = useState<WizardData>({
    title: '', description: '', type: 'roadmap',
    start_date: getTodayDateString(0), end_date: getTodayDateString(30)
  });
  const [topics, setTopics] = useState<TopicDraft[]>([blankTopic()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const updateTopic = (id: string, updated: TopicDraft) => setTopics(prev => prev.map(t => t.id === id ? updated : t));
  const addTopic = () => setTopics(prev => [...prev, blankTopic()]);
  const removeTopic = (id: string) => setTopics(prev => prev.filter(t => t.id !== id));

  const validTopics = topics.filter(t => t.title.trim());
  const totalSubtasks = validTopics.reduce((sum, t) => sum + t.tasks.filter(s => s.title.trim()).length, 0);
  const canProceed1 = meta.title.trim().length > 0;
  const canProceed2 = validTopics.length > 0 && totalSubtasks > 0;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        title: meta.title.trim(),
        description: meta.description.trim() || undefined,
        type: meta.type,
        start_date: meta.start_date || undefined,
        end_date: meta.type === 'sprint' ? (meta.end_date || undefined) : undefined,
        topics: validTopics.map(t => ({
          title: t.title.trim(),
          description: t.description.trim() || undefined,
          estimated_days: t.estimated_days ? parseInt(t.estimated_days) : undefined,
          tasks: t.tasks.filter(s => s.title.trim()).map(s => ({
            title: s.title.trim(),
            description: s.description.trim() || undefined,
            resources: s.resources.trim() || undefined,
            priority: s.priority,
            estimated_hours: s.estimated_hours ? parseFloat(s.estimated_hours) : undefined
          }))
        }))
      });
      // reset
      setStep(1);
      setMeta({ title: '', description: '', type: 'roadmap', start_date: getTodayDateString(0), end_date: getTodayDateString(30) });
      setTopics([blankTopic()]);
      onClose();
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/[0.12] shadow-2xl my-4 bg-[#0E111C]/95">

        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-7 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Step {step} of 3
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {step === 1 && 'Plan Overview'}
              {step === 2 && 'Build Your Study Curriculum'}
              {step === 3 && 'Review & Launch Roadmap'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {step === 1 && 'Name your study plan and choose between open roadmap or time-boxed sprint.'}
              {step === 2 && 'Add chapters / topics and their subtasks in the order they should be completed.'}
              {step === 3 && `Ready to publish: ${validTopics.length} topics and ${totalSubtasks} subtasks.`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition ml-4 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 px-6 sm:px-7 pt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-gradient-to-r from-violet-600 to-indigo-500' : 'bg-white/[0.08]'}`} />
          ))}
        </div>

        {/* ══ STEP 1 — Plan Metadata ══════════════════════════════════════════ */}
        {step === 1 && (
          <div className="p-6 sm:p-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Plan Title *</label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. DSA Mastery for Job Switch, System Design Sprint, OS Concepts"
                value={meta.title}
                onChange={e => setMeta({ ...meta, title: e.target.value })}
                className="w-full bg-[#101424] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Description <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
              <textarea
                rows={2}
                placeholder="What is this plan covering? Target companies, resources, or guidelines..."
                value={meta.description}
                onChange={e => setMeta({ ...meta, description: e.target.value })}
                className="w-full bg-[#101424] border border-white/[0.1] rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Plan Type *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { type: 'roadmap' as const, icon: <Map className="w-5 h-5" />, color: 'text-indigo-400', bg: 'bg-indigo-950/60 border-indigo-700/50', title: 'Open Roadmap', desc: 'Continuous pacing — no hard deadline. Teammates progress through sequential topics at their speed.' },
                  { type: 'sprint' as const, icon: <Zap className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-700/50', title: 'Time-boxed Sprint', desc: 'Fixed start & target end date. Ideal for 30-day interview crunch or upcoming exam syllabus.' }
                ].map(opt => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setMeta({ ...meta, type: opt.type })}
                    className={`p-5 rounded-2xl border cursor-pointer transition text-left ${meta.type === opt.type ? 'bg-violet-950/60 border-violet-500 shadow-lg shadow-violet-950/50' : 'bg-[#101424] border-white/[0.08] hover:border-white/[0.15]'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${opt.bg} ${opt.color}`}>{opt.icon}</div>
                    <h4 className="font-bold text-white text-base mb-1 font-display">{opt.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{opt.desc}</p>
                    {meta.type === opt.type && <div className="mt-3 flex items-center gap-1 text-violet-300 text-xs font-bold"><CheckCircle className="w-3.5 h-3.5" /> Selected</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Start Date
                </label>
                <input type="date" value={meta.start_date} onChange={e => setMeta({ ...meta, start_date: e.target.value })}
                  className="w-full bg-[#101424] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 cursor-pointer" />
              </div>
              {meta.type === 'sprint' && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" /> Target End Date
                  </label>
                  <input type="date" value={meta.end_date} onChange={e => setMeta({ ...meta, end_date: e.target.value })}
                    className="w-full bg-[#101424] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ STEP 2 — Outline Builder ════════════════════════════════════════ */}
        {step === 2 && (
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-violet-300">{validTopics.length} topic{validTopics.length !== 1 ? 's' : ''} · {totalSubtasks} subtask{totalSubtasks !== 1 ? 's' : ''}</span>
              <span className="text-slate-500">Expand subtask (↓) for description & resources</span>
            </div>

            <div className="max-h-[55vh] overflow-y-auto space-y-3 pr-1">
              {topics.map((topic, ti) => (
                <TopicBlock
                  key={topic.id}
                  topic={topic}
                  index={ti}
                  onUpdate={updated => updateTopic(topic.id, updated)}
                  onDelete={() => removeTopic(topic.id)}
                  canDelete={topics.length > 1}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addTopic}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-white/[0.12] text-slate-300 hover:text-violet-300 hover:border-violet-500/50 transition text-sm font-bold bg-white/[0.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Topic Chapter
            </button>
          </div>
        )}

        {/* ══ STEP 3 — Review ════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="p-6 sm:p-7 space-y-4">
            {/* Plan summary */}
            <div className="p-5 rounded-2xl bg-[#101424] border border-white/[0.08] space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-lg font-display">{meta.title}</h3>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${meta.type === 'roadmap' ? 'bg-indigo-950/80 border-indigo-700/60 text-indigo-300' : 'bg-amber-950/80 border-amber-700/60 text-amber-300'}`}>
                  {meta.type === 'roadmap' ? '🗺 Open Roadmap' : '⚡ Time-boxed Sprint'}
                </span>
              </div>
              {meta.description && <p className="text-xs text-slate-400 leading-relaxed">{meta.description}</p>}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-violet-400" /> Starts: {meta.start_date}</span>
                {meta.end_date && meta.type === 'sprint' && <span>→ Target: {meta.end_date}</span>}
              </div>
            </div>

            {/* Topics preview */}
            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
              {validTopics.map((topic, ti) => {
                const validTasks = topic.tasks.filter(t => t.title.trim());
                return (
                  <div key={topic.id} className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#101424]/80">
                    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#14192C]">
                      <span className="text-xs font-bold text-violet-400 font-display">{ti + 1}.</span>
                      <span className="text-sm font-bold text-white flex-1">{topic.title}</span>
                      <span className="text-[11px] text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">{validTasks.length} subtasks</span>
                      {topic.estimated_days && <span className="text-[11px] text-slate-500">~{topic.estimated_days}d</span>}
                    </div>
                    <div className="px-4 py-2 space-y-1">
                      {validTasks.slice(0, 4).map((t, ki) => (
                        <div key={t.id} className="flex items-center gap-2 text-xs text-slate-300">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.priority === 'high' ? 'bg-rose-500' : t.priority === 'low' ? 'bg-cyan-500' : 'bg-amber-500'}`} />
                          <span className="truncate">{t.title}</span>
                        </div>
                      ))}
                      {validTasks.length > 4 && <p className="text-[11px] text-slate-500 pl-3.5">+{validTasks.length - 4} more subtasks</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-violet-950/40 border border-violet-700/50 text-xs text-violet-200">
              <BookOpen className="w-5 h-5 text-violet-400 shrink-0" />
              <span>This roadmap will be shared with all squad members. Everyone starts at 0% and picks tasks to study each day.</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 sm:px-7 pb-6 pt-3 border-t border-white/[0.08]">
          {step > 1
            ? <button type="button" onClick={() => setStep(s => (s - 1) as 1 | 2)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
            : <div />}

          {step < 3
            ? <button type="button" onClick={() => setStep(s => (s + 1) as 2 | 3)}
                disabled={step === 1 ? !canProceed1 : !canProceed2}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-2.5 rounded-2xl shadow-xl shadow-violet-600/30 transition cursor-pointer">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            : <button type="button" onClick={handleSubmit} disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm px-7 py-3 rounded-2xl shadow-xl shadow-violet-600/30 transition cursor-pointer">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Launching Roadmap...</span>
                  </>
                ) : (
                  <>
                    <span>Launch Roadmap</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>}
        </div>
      </div>
    </div>
  );
};
