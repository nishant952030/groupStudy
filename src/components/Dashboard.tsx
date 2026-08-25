import React, { useState, useEffect } from 'react';
import { Plan, Group } from '../types';
import { studyService } from '../services/studyService';
import { BookOpen, Calendar, Layers, PlusCircle, CheckCircle2, Users, ArrowRight } from 'lucide-react';

interface DashboardProps {
  activeGroup: Group | null;
  plans: Plan[];
  onOpenCreatePlan: () => void;
  onOpenJoinGroup: () => void;
  onSelectPlanTab: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeGroup,
  plans,
  onOpenCreatePlan,
  onOpenJoinGroup,
  onSelectPlanTab
}) => {
  const [planMetrics, setPlanMetrics] = useState<Record<string, { total: number; completed: number; percentage: number }>>({});

  useEffect(() => {
    async function loadMetrics() {
      const metrics: Record<string, { total: number; completed: number; percentage: number }> = {};
      for (const plan of plans) {
        const res = await studyService.getOverallPlanProgress(plan.id);
        metrics[plan.id] = res;
      }
      setPlanMetrics(metrics);
    }
    if (plans.length > 0) {
      loadMetrics();
    }
  }, [plans]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Study Plans Overview
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {activeGroup 
              ? `Macro study plans configured for ${activeGroup.name}`
              : "Overview of your group study plans"}
          </p>
        </div>

        <button
          onClick={onOpenCreatePlan}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Study Plan</span>
        </button>
      </div>

      {/* Plans List */}
      {plans.length === 0 ? (
        <div className="glass-card p-10 rounded-3xl text-center space-y-4 border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Study Plans Yet</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Create a Fixed Schedule or Rolling Backlog study plan for your group to start pulling daily targets automatically!
          </p>
          <button
            onClick={onOpenCreatePlan}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Plan</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => {
            const metric = planMetrics[plan.id] || { total: 0, completed: 0, percentage: 0 };
            return (
              <div
                key={plan.id}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition space-y-4"
              >
                {/* Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        plan.type === 'fixed'
                          ? 'bg-indigo-950/80 border-indigo-700/60 text-indigo-300'
                          : 'bg-sky-950/80 border-sky-700/60 text-sky-300'
                      }`}>
                        {plan.type === 'fixed' ? (
                          <>
                            <Calendar className="w-3 h-3" /> Fixed Schedule
                          </>
                        ) : (
                          <>
                            <Layers className="w-3 h-3" /> Rolling Backlog
                          </>
                        )}
                      </span>

                      {plan.deadline && (
                        <span className="text-xs text-slate-400 font-mono">
                          Target Deadline: {plan.deadline}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  </div>

                  {/* Percentage Metric */}
                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-black text-brand-400">{metric.percentage}%</span>
                    <span className="block text-[11px] text-slate-400 uppercase font-semibold">
                      Overall Progress
                    </span>
                  </div>
                </div>

                {/* Overall Plan Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Task Progress</span>
                    <span>{metric.completed} / {metric.total} tasks completed</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
