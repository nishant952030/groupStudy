import React from 'react';
import { User, Group } from '../types';
import { Sparkles, Users, PlusCircle, UserCheck, LogOut, BookOpen, Calendar, CheckSquare } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeGroup: Group | null;
  userGroups: Group[];
  activeTab: 'today' | 'group' | 'plans';
  setActiveTab: (tab: 'today' | 'group' | 'plans') => void;
  onSelectGroup: (group: Group) => void;
  onOpenJoinGroup: () => void;
  onOpenCreatePlan: () => void;
  onSignOut: () => void;
  isDemo: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeGroup,
  userGroups,
  activeTab,
  setActiveTab,
  onSelectGroup,
  onOpenJoinGroup,
  onOpenCreatePlan,
  onSignOut,
  isDemo
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Group Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              SyncStudy
            </span>
          </div>

          {/* Active Group Dropdown Selector */}
          {activeGroup && (
            <div className="relative">
              <select
                value={activeGroup.id}
                onChange={(e) => {
                  const g = userGroups.find(group => group.id === e.target.value);
                  if (g) onSelectGroup(g);
                }}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs sm:text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 transition cursor-pointer"
              >
                {userGroups.map(g => (
                  <option key={g.id} value={g.id}>
                    👥 {g.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Join/Create Group Trigger */}
          <button
            onClick={onOpenJoinGroup}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/50 px-2.5 py-1.5 rounded-lg transition"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Join / Create Group</span>
          </button>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === 'today'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Today</span>
          </button>

          <button
            onClick={() => setActiveTab('group')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === 'group'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Group View</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === 'plans'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Plans</span>
          </button>
        </nav>

        {/* Right side actions & User profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreatePlan}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg shadow-md shadow-brand-600/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Plan</span>
          </button>

          {isDemo && (
            <span className="hidden lg:inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Demo Store
            </span>
          )}

          {currentUser && (
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                title={currentUser.name}
              />
              <button
                onClick={onSignOut}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
