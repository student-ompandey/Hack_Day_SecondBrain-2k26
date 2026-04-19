import React from 'react';
import { motion } from 'framer-motion';
import InputSection from './InputSection';

export default function MainContent() {
  return (
    <main className="flex-1 h-screen overflow-y-auto w-full relative sm:pl-[5.5rem] pb-24 sm:pb-0 z-10 custom-scrollbar flex flex-col items-center">
      <div className="max-w-[850px] w-full px-4 md:px-8 py-16 flex flex-col min-h-full">
        <header className="mb-12 mt-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF6B00]"
          >
            Good Morning
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-400 font-medium tracking-wide"
          >
            What are we learning or building today?
          </motion.p>
        </header>

        <section className="flex-1 w-full flex flex-col relative z-20 items-center">
          <InputSection />
        </section>

        {/* Dashboard Features / Quick Tools Section */}
        <section className="w-full mt-16 relative z-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-wide">Quick Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:border-[#FF6B00]/40 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00]/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6B00] hover:scale-110 transition-transform"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>
              </div>
              <h3 className="font-bold text-white mb-2">Code Parsing</h3>
              <p className="text-sm text-gray-400">Instantly dissect GitHub repos and raw technical documentation.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:border-blue-500/40 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 hover:scale-110 transition-transform"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              </div>
              <h3 className="font-bold text-white mb-2">Semantic Search</h3>
              <p className="text-sm text-gray-400">Search through your SecondBrain using spatial meaning, not just keywords.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:border-green-500/40 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 hover:scale-110 transition-transform"><path d="m18 15-6-6-6 6"/></svg>
              </div>
              <h3 className="font-bold text-white mb-2">Spaced Repetition</h3>
              <p className="text-sm text-gray-400">View upcoming neural flashcards scheduled for your review today.</p>
            </motion.div>

          </div>
        </section>
      </div>
    </main>
  );
}
