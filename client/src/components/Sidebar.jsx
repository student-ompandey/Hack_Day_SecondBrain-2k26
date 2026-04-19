import React, { useEffect, useState } from 'react';
import { Home, Folder, Star, Settings, Layout, BrainCircuit, Calendar, LayoutDashboard, FolderOpen, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { getSavedMemories } from '../lib/memory';
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import SettingsModal from './SettingsModal';

export default function Sidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Star, label: 'Favorites', path: '#' },
    { icon: FolderOpen, label: 'Categories', path: '#' },
  ];

  const handleNav = (path) => {
    if (path && path !== '#') {
      navigate(path);
    }
  };

  return (
    <>
      {/* Desktop Floating Dock */}
      <aside className="hidden sm:flex fixed flex-col left-4 top-4 bottom-4 w-16 hover:w-64 bg-black/70 backdrop-blur-xl border border-[#1A1A1A] p-3 z-50 transition-all duration-500 rounded-3xl group shadow-[0_0_30px_-5px_rgba(255,77,0,0.1)] overflow-hidden">
        
        {/* Brand */}
        <div className="flex items-center gap-4 px-2.5 mb-10 mt-2 whitespace-nowrap">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 shrink-0">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <span className="tracking-tight text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">SecondBrain</span>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-3 flex-1">
          {items.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={idx}
                onClick={() => handleNav(item.path)}
                title={item.label}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all outline-none whitespace-nowrap w-full group/btn",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-transparent text-primary shadow-[inset_2px_0_0_0_#FF6B00]" 
                    : "text-textMuted hover:text-white hover:bg-white/5",
                  item.path === '#' && "opacity-50 cursor-not-allowed"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
           <button 
            onClick={() => setSettingsOpen(true)}
            title="Settings"
            className="flex items-center gap-4 p-3 rounded-xl text-textMuted hover:text-white hover:bg-white/5 transition-all outline-none whitespace-nowrap w-full group/btn"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Settings</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <aside className="sm:hidden fixed bottom-4 left-4 right-4 h-16 bg-black/70 backdrop-blur-xl border border-[#1A1A1A] flex flex-row justify-around items-center z-50 rounded-2xl shadow-[0_0_30px_-5px_rgba(255,77,0,0.1)] px-2">
         {items.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={idx}
                onClick={() => handleNav(item.path)}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  isActive ? "text-primary" : "text-textMuted",
                  item.path === '#' && "opacity-50"
                )}
              >
                <item.icon className="w-5 h-5" />
              </button>
            )
          })}
          <button onClick={() => setSettingsOpen(true)} className="p-3 text-textMuted rounded-xl">
            <Settings className="w-5 h-5" />
          </button>
      </aside>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
