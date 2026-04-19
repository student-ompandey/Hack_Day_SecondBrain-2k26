import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, BrainCircuit, Activity, Clock, Search, ExternalLink, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export default function ProfilePage() {
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://hack-day-secondbrain-2k26-3.onrender.com'}/api/memories`);
        const data = await response.json();
        setMemories(data);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock gamification stats
  const STREAK_DAYS = 7;
  const TOTAL_XP = 12450;
  const LEVEL = Math.floor(TOTAL_XP / 2000) + 1;
  const CURRENT_LEVEL_XP = TOTAL_XP % 2000;
  const XP_MAX = 2000;

  // Mock heatmap generating last 30 days
  const heatMapDays = Array.from({ length: 90 }, (_, i) => {
    const isActive = Math.random() > 0.6;
    return { id: i, active: isActive };
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans overflow-x-hidden selection:bg-[#FF6B00]/30 custom-scrollbar">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full bg-radial-gradient from-[#FF6B00]/10 via-[#FF6B00]/0 to-transparent blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-[#FF6B00]/5 via-transparent to-transparent blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <Sidebar />

      <main className="flex-1 w-full flex flex-col items-center justify-start pb-32 sm:pl-16 relative z-10 pt-12 md:pt-16">
        <div className="w-full max-w-[900px] flex flex-col gap-y-12 px-4 md:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 pb-6 border-b border-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-xl shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[#FF6B00]/10 rounded-full" />
              <BrainCircuit className="w-10 h-10 text-[#FF6B00] relative z-10" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                Student Profile
                <span className="text-[10px] bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                  <Flame className="w-3 h-3 fill-[#FF6B00]" /> {STREAK_DAYS} Day Streak
                </span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm font-medium">Tracking your SecondBrain engrained knowledge.</p>
            </div>
          </motion.div>

          {/* Gamified Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* XP Box */}
            <div className="bg-[#121212]/60 backdrop-blur-2xl border border-[#FF6B00]/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#FF6B00]/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-[40px] group-hover:bg-[#FF6B00]/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-black">Experience</span>
                <Activity className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <p className="text-4xl font-black text-white">{TOTAL_XP.toLocaleString()}</p>
              <div className="mt-4 flex flex-col gap-2 relative z-10">
                <div className="flex justify-between text-xs font-bold text-gray-400 tracking-wide">
                  <span>Level {LEVEL}</span>
                  <span>{CURRENT_LEVEL_XP} / {XP_MAX}</span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(CURRENT_LEVEL_XP / XP_MAX) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#FF6B00]/50 to-[#FF6B00] rounded-full drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]"
                  />
                </div>
              </div>
            </div>

            {/* Streak Focus Heatmap */}
            <div className="md:col-span-2 bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-gray-300 font-bold flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#FF6B00]" />
                  Activity Heatmap
                </span>
                <span className="text-xs text-gray-500 font-medium">Last 90 Days</span>
              </div>
              
              <div className="flex-1 flex items-center gap-[3px] flex-wrap justify-end align-bottom h-full mr-2 pb-2">
                {heatMapDays.map((day) => (
                  <div 
                    key={day.id} 
                    title={`Day ${90 - day.id}`}
                    className={cn(
                      "w-[12px] h-[12px] rounded-sm transition-all duration-300",
                      day.active 
                        ? "bg-[#FF6B00]/80 hover:bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.4)] cursor-pointer" 
                        : "bg-[#1A1A1A] hover:bg-[#222222]"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Past Searches & Memory Data */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold text-white uppercase tracking-widest mb-6">
              <Search className="w-5 h-5 text-[#FF6B00]" />
              Brain Scans & History
            </h2>

            <div className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-2 sm:p-4 shadow-xl overflow-hidden min-h-[300px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-gray-500 opacity-50 space-y-4">
                   <div className="w-8 h-8 border-4 border-white/10 border-t-[#FF6B00] rounded-full animate-spin" />
                   <p className="text-sm font-bold tracking-widest uppercase">Fetching Neural Links...</p>
                </div>
              ) : memories.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-[#1A1A1A] rounded-2xl m-4">
                  <BrainCircuit className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-300">No data found</h3>
                  <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">You haven't scanned any files or notes yet. Head to the dashboard and upload your first file to begin tracking.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  <AnimatePresence>
                    {memories.map((mem, idx) => (
                      <motion.div
                        key={mem._id || idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#FF6B00]/40 rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(255,107,0,0.1)] transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                             <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Search className="w-4 h-4 text-[#FF6B00]" />
                             </div>
                             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                               <Clock className="w-3 h-3" />
                               {format(new Date(mem.createdAt || Date.now()), 'MMM d, yyyy')}
                             </span>
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#FF6B00] transition-colors line-clamp-2 leading-snug">
                            {mem.title || mem.data?.summary?.[0] || 'Untitled Sequence'}
                          </h3>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-medium group-hover:text-gray-400">
                           <span>{mem.data?.keyConcepts?.length || 0} Concepts</span>
                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FF6B00]/70" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
