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
      </div>
    </main>
  );
}
