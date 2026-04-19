import React from 'react';
import { Home, Folder, Star, Settings, Layout } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const items = [
    { icon: Home, label: 'Home', active: true },
    { icon: Folder, label: 'Projects' },
    { icon: Star, label: 'Favorites' },
    { icon: Layout, label: 'Dashboard' },
  ];

  return (
    <aside className="w-64 bg-surface h-screen border-r border-gray-800 flex flex-col items-start px-4 py-6">
      <div className="flex items-center gap-3 w-full mb-8 px-2 text-primary font-bold text-xl tracking-wide">
        <div className="bg-primary/20 p-2 rounded-xl">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
        </div>
        SecondBrain
      </div>

      <nav className="flex-1 w-full space-y-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent",
              item.active 
                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_-3px_rgba(255,107,107,0.1)]" 
                : "text-textMuted hover:text-textMain hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="w-full mt-auto">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-textMuted hover:text-textMain hover:bg-white/5 transition-all">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
