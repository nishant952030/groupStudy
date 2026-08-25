import React from 'react';
import { User, Group } from '../types';
import { Sparkles, Users, PlusCircle, LogOut, BookOpen, CheckSquare, ChevronDown, Flame, UserPlus } from 'lucide-react';

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
    <>
      {/* ─── Top Header Bar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0D14]/90 backdrop-blur-xl transition-all">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Group Selector */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg tracking-tight shrink-0 cursor-pointer select-none">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/25">
                <div className="w-full h-full bg-[#0E111C] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
                </div>
              </div>
              <span className="hidden sm:inline font-display text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent">
                SyncStudy
              </span>
            </div>

            {/* Active Group Dropdown Selector */}
            {activeGroup && (
              <div className="relative flex items-center min-w-0">
                <div className="relative flex items-center bg-[#131726] border border-white/[0.08] hover:border-violet-500/40 rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 transition max-w-[130px] sm:max-w-[200px]">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-400 mr-1.5 shrink-0" />
                  <select
                    value={activeGroup.id}
                    onChange={(e) => {
                      const g = userGroups.find(group => group.id === e.target.value);
                      if (g) onSelectGroup(g);
                    }}
                    className="bg-transparent text-slate-200 text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-3 appearance-none truncate w-full"
                  >
                    {userGroups.map(g => (
                      <option key={g.id} value={g.id} className="bg-[#10131E] text-slate-200">
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none absolute right-1.5" />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Center Tabs Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121624]/90 p-1 rounded-2xl border border-white/[0.08] shadow-inner">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'today'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Today</span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'plans'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('group')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'group'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Squad</span>
            </button>
          </nav>

          {/* Right side actions & User profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Join / Create Group button */}
            <button
              onClick={onOpenJoinGroup}
              className="flex items-center gap-1 text-xs font-semibold text-violet-300 hover:text-white bg-violet-950/40 hover:bg-violet-900/60 border border-violet-700/40 px-2.5 py-1 sm:py-1.5 rounded-xl transition"
              title="Join or Create Group"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Groups</span>
            </button>

            {/* Desktop New Plan button */}
            <button
              onClick={onOpenCreatePlan}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-lg shadow-violet-600/25 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Plan</span>
            </button>

            {currentUser && (
              <div className="flex items-center gap-1.5 pl-1">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-violet-500/40 p-[1px] object-cover ring-2 ring-violet-500/20"
                    title={currentUser.name}
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 border-2 border-[#0B0D14] rounded-full" />
                </div>
                <button
                  onClick={onSignOut}
                  className="p-1 sm:p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── Mobile Bottom Navigation Bar (iOS / Android Native Feel) ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0C16]/95 backdrop-blur-2xl border-t border-white/[0.1] px-4 py-2 shadow-2xl safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-around gap-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition ${
              activeTab === 'today'
                ? 'text-violet-300 bg-violet-950/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Today</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition ${
              activeTab === 'plans'
                ? 'text-violet-300 bg-violet-950/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition ${
              activeTab === 'group'
                ? 'text-violet-300 bg-violet-950/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Squad</span>
          </button>

          <button
            onClick={onOpenCreatePlan}
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-cyan-400 hover:text-cyan-300 transition"
          >
            <PlusCircle className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight font-bold">+ Plan</span>
          </button>
        </div>
      </div>
    </>
  );
};
