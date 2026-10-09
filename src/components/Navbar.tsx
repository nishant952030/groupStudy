import React, { useState } from 'react';
import { ChevronDown, Plus, LogOut, Users, BookOpen, CheckSquare } from 'lucide-react';
import { User, Squad } from '../types';
import { AppTab } from '../App';

interface Props {
  user: User;
  squads: Squad[];
  activeSquad: Squad | null;
  activeTab: AppTab;
  onSetTab: (tab: AppTab) => void;
  onSelectSquad: (squad: Squad) => void;
  onOpenCreate: () => void;
  onOpenJoin: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<Props> = ({
  user, squads, activeSquad, activeTab,
  onSetTab, onSelectSquad, onOpenCreate, onOpenJoin, onSignOut
}) => {
  const [squadMenuOpen, setSquadMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">

        {/* Left: Logo + Squad Switcher */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 text-xs font-bold">
              S
            </div>
            <span className="font-semibold text-sm text-zinc-100 hidden sm:block">SyncStudy</span>
          </div>

          {/* Squad Switcher Dropdown */}
          {squads.length > 0 && (
            <div className="relative">
              <button
                onClick={() => { setSquadMenuOpen(p => !p); setUserMenuOpen(false); }}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 px-2 sm:px-2.5 py-1.5 rounded-lg transition cursor-pointer max-w-[120px] sm:max-w-[220px]"
              >
                <span className="truncate font-medium">{activeSquad?.name || 'Select Squad'}</span>
                <ChevronDown className="w-3 h-3 shrink-0 text-zinc-500" />
              </button>

              {squadMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSquadMenuOpen(false)} />
                  <div className="absolute top-full left-0 mt-1.5 z-50 bg-[#141417] border border-zinc-800 rounded-xl shadow-xl py-1 min-w-[200px]">
                    {squads.map(squad => (
                      <button
                        key={squad.id}
                        onClick={() => { onSelectSquad(squad); setSquadMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition cursor-pointer ${
                          activeSquad?.id === squad.id
                            ? 'bg-zinc-800/60 text-zinc-100 font-medium'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
                        }`}
                      >
                        {squad.name}
                      </button>
                    ))}
                    <div className="border-t border-zinc-800 mt-1 pt-1">
                      <button
                        onClick={() => { onOpenCreate(); setSquadMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> New Squad
                      </button>
                      <button
                        onClick={() => { onOpenJoin(); setSquadMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition flex items-center gap-2 cursor-pointer"
                      >
                        <Users className="w-3 h-3" /> Join with Code
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Center: Tab Navigation */}
        {activeSquad && (
          <nav className="flex items-center gap-1 bg-zinc-800/60 rounded-lg p-0.5">
            <button
              onClick={() => onSetTab('today')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Daily Tasks</span>
            </button>
            <button
              onClick={() => onSetTab('roadmap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Roadmap</span>
            </button>
            <button
              onClick={() => onSetTab('squad')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'squad'
                  ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Squad</span>
            </button>
          </nav>
        )}

        {/* Right: User Avatar + Menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => { setUserMenuOpen(p => !p); setSquadMenuOpen(false); }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-zinc-700"
            />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-1.5 z-50 bg-[#141417] border border-zinc-800 rounded-xl shadow-xl py-1 min-w-[160px]">
                <div className="px-3 py-2 border-b border-zinc-800">
                  <p className="text-xs font-medium text-zinc-200 truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                </div>
                {squads.length === 0 && (
                  <>
                    <button
                      onClick={() => { onOpenCreate(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> New Squad
                    </button>
                    <button
                      onClick={() => { onOpenJoin(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Users className="w-3 h-3" /> Join with Code
                    </button>
                  </>
                )}
                <button
                  onClick={() => { onSignOut(); setUserMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
