import React from 'react';
import { DailyPullTask } from '../types';
import { CheckCircle2, Circle, AlertCircle, Sparkles, Calendar, Layers, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TodayViewProps {
  tasks: DailyPullTask[];
  completedCount: number;
  totalCount: number;
  dailyPercentage: number;
  onToggleTask: (taskId: string, currentStatus: 'pending' | 'completed') => void;
  groupName: string;
}

export const TodayView: React.FC<TodayViewProps> = ({
  tasks,
  completedCount,
  totalCount,
  dailyPercentage,
  onToggleTask,
  groupName
}) => {
  
  const handleCheck = (task: DailyPullTask) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    onToggleTask(task.id, task.status);

    // If reaching 100% completion, trigger celebratory confetti!
    if (nextStatus === 'completed' && completedCount + 1 >= totalCount && totalCount > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#818cf8', '#38bdf8', '#4ade80']
      });
    }
  };

  const overdueTasks = tasks.filter(t => t.isOverdue && t.status === 'pending');
  const todayTasks = tasks.filter(t => !t.isOverdue || t.status === 'completed');

  // SVG Circular progress ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dailyPercentage / 100) * circumference;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Top Header Card with Circular Progress Ring */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl glow-brand relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="text-center sm:text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{groupName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Today's Focus
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {totalCount === 0 
                ? "No active daily tasks scheduled for today." 
                : `You've finished ${completedCount} of ${totalCount} tasks queued for today.`}
            </p>

            {dailyPercentage === 100 && totalCount > 0 && (
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>All daily tasks completed! Amazing work 🎉</span>
              </div>
            )}
          </div>

          {/* Circular SVG Progress Ring */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-brand-500 transition-all duration-700 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white tracking-tight">{dailyPercentage}%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Completed</span>
            </div>
          </div>

        </div>
      </div>

      {/* OVERDUE TASKS SECTION (if any) */}
      {overdueTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider px-1">
            <AlertCircle className="w-4 h-4" />
            <span>Overdue Tasks ({overdueTasks.length})</span>
          </div>

          <div className="space-y-2.5">
            {overdueTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleCheck(task)}
                className="glass-card p-4 rounded-2xl border-l-4 border-l-amber-500 hover:border-slate-700 flex items-center justify-between gap-4 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button className="text-amber-500 hover:scale-110 transition flex-shrink-0">
                    <Circle className="w-5 h-5" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-slate-200 font-medium text-sm sm:text-base group-hover:text-white transition truncate">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 text-amber-400/90 font-medium">
                        <Clock className="w-3 h-3" /> Overdue from yesterday
                      </span>
                      <span>&bull;</span>
                      <span>{task.planTitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TODAY'S DAILY TASK CHECKLIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
            <span>Daily Checklist ({todayTasks.length})</span>
          </div>
          <span>{completedCount}/{totalCount} Done</span>
        </div>

        {tasks.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl text-center space-y-3 border border-slate-800">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-300 font-medium text-sm">No tasks in your daily queue yet!</p>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Create a Fixed or Rolling Plan for this group to start pulling daily targets automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayTasks.map((task) => {
              const isDone = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => handleCheck(task)}
                  className={`glass-card p-4 rounded-2xl border transition cursor-pointer group flex items-center justify-between gap-4 ${
                    isDone 
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-75' 
                      : 'hover:border-brand-500/50 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <button className="flex-shrink-0 transition transform group-hover:scale-110">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 group-hover:text-brand-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <p className={`font-medium text-sm sm:text-base transition truncate ${
                        isDone ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          {task.planType === 'fixed' ? (
                            <Calendar className="w-3 h-3 text-indigo-400" />
                          ) : (
                            <Layers className="w-3 h-3 text-sky-400" />
                          )}
                          <span className="capitalize">{task.planType} Plan</span>
                        </span>
                        <span>&bull;</span>
                        <span className="truncate">{task.planTitle}</span>
                      </div>
                    </div>
                  </div>

                  {isDone && (
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full hidden sm:inline-block">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
