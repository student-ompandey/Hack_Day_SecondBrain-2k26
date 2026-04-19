import React, { useEffect, useState } from 'react';
import { Home, Folder, Star, Settings, Layout, BrainCircuit, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { getSavedMemories } from '../lib/memory';
import { format } from 'date-fns';

export default function Sidebar() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    // Initial fetch
    setMemories(getSavedMemories());

    // Listen for custom event triggered by MemoryService
    const handleMemoryUpdate = () => {
      setMemories(getSavedMemories());
    };
    
    window.addEventListener('memory-updated', handleMemoryUpdate);
    return () => window.removeEventListener('memory-updated', handleMemoryUpdate);
  }, []);

  const items = [
    { icon: Home, label: 'Home', active: true },
    { icon: Folder, label: 'Projects' },
    { icon: Star, label: 'Favorites' },
    { icon: Layout, label: 'Dashboard' },
  ];

  return (
    <aside className="w-64 bg-surface h-screen border-r border-gray-800 flex flex-col items-start px-4 py-6 overflow-hidden">
      <div className="flex items-center gap-3 w-full mb-8 px-2 text-primary font-bold text-xl tracking-wide">
        <div className="bg-primary/20 p-2 rounded-xl">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
        </div>
        SecondBrain
      </div>

      <nav className="w-full space-y-2 mb-8">
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

      {/* Memory Section */}
      <div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center gap-2 px-2 text-xs font-semibold text-textMuted uppercase tracking-wider mb-3">
          <BrainCircuit className="w-4 h-4 text-blue-400" />
          Study Schedule
        </div>
        
        {memories.length === 0 ? (
          <div className="px-2 text-sm text-textMuted/60 italic">No saved memories yet.</div>
        ) : (
          <div className="space-y-2">
            {memories.map((mem) => (
              <div key={mem.id} className="w-full bg-white/5 border border-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer group">
                <h4 className="text-sm font-medium text-textMain/90 truncate">{mem.title}</h4>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-400/80 group-hover:text-blue-400">
                  <Calendar className="w-3 h-3" />
                  <span>Review {format(new Date(mem.dates.review1), 'MMM d')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full mt-4 pt-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-textMuted hover:text-textMain hover:bg-white/5 transition-all">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
