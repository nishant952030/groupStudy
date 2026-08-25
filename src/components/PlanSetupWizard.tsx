import React, { useState } from 'react';
import { PlanType } from '../types';
import { getTodayDateString } from '../services/studyService';
import { Calendar, Layers, X, ArrowRight, ArrowLeft, CheckCircle, Plus, Sparkles } from 'lucide-react';

interface PlanSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    type: PlanType;
    deadline?: string;
    tasks: { title: string; scheduled_date?: string }[];
  }) => Promise<void>;
}

export const PlanSetupWizard: React.FC<PlanSetupWizardProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState('');
  const [planType, setPlanType] = useState<PlanType>('fixed');
  const [bulkInput, setBulkInput] = useState('');
  const [deadline, setDeadline] = useState(getTodayDateString(14)); // default 2 weeks
  const [taskDates, setTaskDates] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Parse bulk text into individual task objects
  const parsedTaskTitles = bulkInput
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim()) return;
      setStep(2);
    } else if (step === 2) {
      if (parsedTaskTitles.length === 0) return;
      
      // Pre-fill default dates for fixed plan
      const initialDates: Record<number, string> = {};
      const today = getTodayDateString(0);
      parsedTaskTitles.forEach((_, idx) => {
        initialDates[idx] = getTodayDateString(idx);
      });
      setTaskDates(initialDates);

      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const finalTasks = parsedTaskTitles.map((tTitle, idx) => ({
        title: tTitle,
        scheduled_date: planType === 'fixed' ? (taskDates[idx] || getTodayDateString(0)) : undefined
      }));

      await onSubmit({
        title: title.trim(),
        type: planType,
        deadline: planType === 'rolling' ? deadline : undefined,
        tasks: finalTasks
      });

      // Reset state & close
      setStep(1);
      setTitle('');
      setBulkInput('');
      onClose();
    } catch (err) {
      console.error("Error creating plan:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step {step} of 3</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Create New Group Study Plan</h2>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-slate-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-slate-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-brand-500' : 'bg-slate-800'}`} />
        </div>

        {/* STEP 1: Plan Title & Type Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Plan Title
              </label>
              <input
                type="text"
                placeholder="e.g. Physics Final Prep, Calculus Midterm, LeetCode Sprint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Select Plan Type
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Fixed Schedule Card */}
                <div
                  onClick={() => setPlanType('fixed')}
                  className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    planType === 'fixed'
                      ? 'bg-brand-950/60 border-brand-500 shadow-lg shadow-brand-500/10'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-base">Fixed Schedule</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Tasks are assigned to specific calendar dates. Ideal for structured exams and syllabus prep.
                    </p>
                  </div>
                  {planType === 'fixed' && (
                    <div className="mt-4 flex items-center gap-1.5 text-brand-400 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" /> Selected
                    </div>
                  )}
                </div>

                {/* Rolling Backlog Card */}
                <div
                  onClick={() => setPlanType('rolling')}
                  className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    planType === 'rolling'
                      ? 'bg-brand-950/60 border-brand-500 shadow-lg shadow-brand-500/10'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-900/50 border border-sky-700/50 flex items-center justify-center text-sky-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-base">Rolling Backlog</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      No fixed dates per task. The software automatically queues the next upcoming tasks dynamically.
                    </p>
                  </div>
                  {planType === 'rolling' && (
                    <div className="mt-4 flex items-center gap-1.5 text-brand-400 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" /> Selected
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Bulk Entry */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Paste Tasks (One task per line)
              </label>
              <textarea
                rows={7}
                placeholder={`Review Electromagnetism Formulas\nComplete Optics Problem Set #1-15\nWatch Quantum Mechanics Lecture 4\nThermodynamics Practice Exam`}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span>Parsed Tasks:</span>
              <span className="font-bold text-brand-400">{parsedTaskTitles.length} items detected</span>
            </div>
          </div>
        )}

        {/* STEP 3: Scheduling / Dates */}
        {step === 3 && (
          <div className="space-y-5">
            {planType === 'rolling' ? (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Target Completion Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition cursor-pointer"
                />
                <p className="text-slate-400 text-xs">
                  The rolling engine will pull 3-5 tasks daily to ensure all {parsedTaskTitles.length} tasks are finished before this deadline.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Map Tasks to Calendar Dates
                </label>
                
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {parsedTaskTitles.map((tTitle, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-medium text-slate-200 truncate flex-1">{tTitle}</span>
                      <input
                        type="date"
                        value={taskDates[idx] || getTodayDateString(0)}
                        onChange={(e) => setTaskDates({ ...taskDates, [idx]: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800/80">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNextStep}
              disabled={step === 1 ? !title.trim() : parsedTaskTitles.length === 0}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition cursor-pointer"
            >
              <span>Next</span> <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xl shadow-brand-600/30 transition cursor-pointer"
            >
              <span>{isSubmitting ? 'Creating...' : 'Finish & Launch Plan'}</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
