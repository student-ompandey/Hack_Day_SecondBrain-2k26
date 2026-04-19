import React from 'react';
import InputSection from './InputSection';

export default function MainContent() {
  return (
    <main className="flex-1 h-screen overflow-y-auto w-full relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-20 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 py-16 flex flex-col min-h-full">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-textMain to-textMuted">
            Good Morning
          </h1>
          <p className="text-lg text-textMuted">
            What are we learning or building today?
          </p>
        </header>

        <section className="flex-1 w-full flex flex-col relative z-10">
          <InputSection />
        </section>
      </div>
    </main>
  );
}
