import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BookType, MonitorPlay, SpellCheck, Video, LayoutGrid, Activity, CheckCircle2, ArrowRight, Menu, X, ArrowUpRight, Copy, Zap, GraduationCap, Globe, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    setIsDemoLoading(true);
    // Simulate analyzing a link then pushing to signup to capture the lead
    setTimeout(() => {
      navigate('/signup');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.3 } }} 
      className="min-h-screen bg-[#050505] text-white selection:bg-[#FF6B00]/30 overflow-x-hidden font-sans custom-scrollbar"
    >
      {/* Shared Background Effect matching ProfilePage */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full bg-radial-gradient from-[#FF6B00]/10 via-[#FF6B00]/0 to-transparent blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-[#FF6B00]/5 via-transparent to-transparent blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navbar Structure */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 inset-x-0 h-20 z-50 backdrop-blur-xl bg-[#050505]/60 border-b border-white/5 transition-all"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wide group">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_0_15px_-3px_rgba(255,107,0,0.8)] transition-all">
              <BrainCircuit className="w-5 h-5 text-[#FF6B00]" />
            </div>
            SecondBrain
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <div className="w-px h-6 bg-white/10" />
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log In</Link>
            <Link to="/signup" className="relative overflow-hidden group px-5 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-black font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(255,107,0,0.8)] hover:scale-105 active:scale-95">
              <span className="relative z-10">Join for Free</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine z-0" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileMenu(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 space-y-8"
          >
            <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white" onClick={() => setMobileMenu(false)}>
              <X className="w-8 h-8" />
            </button>
            <Link to="/" className="text-2xl font-bold" onClick={() => setMobileMenu(false)}>Home</Link>
            <a href="#how-it-works" className="text-2xl font-bold" onClick={() => setMobileMenu(false)}>How it works</a>
            <a href="#features" className="text-2xl font-bold" onClick={() => setMobileMenu(false)}>Features</a>
            <Link to="/login" className="text-2xl font-bold" onClick={() => setMobileMenu(false)}>Log In</Link>
            <Link to="/signup" className="px-8 py-4 rounded-full bg-[#FF6B00] text-black text-xl font-bold shadow-[0_0_20px_-5px_rgba(255,107,0,0.8)]" onClick={() => setMobileMenu(false)}>
              Join for Free
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full pt-32 pb-20">
        
        {/* HERO SECTION */}
        {/* HERO SECTION */}
        <section className="px-6 max-w-5xl mx-auto text-center flex flex-col items-center pt-10 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121212]/80 border border-white/10 text-xs font-semibold text-white mb-8 shadow-2xl backdrop-blur-md"
          >
            <span className="bg-[#FF6B00] text-black px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase font-black">New v2.0</span>
            <span className="text-gray-400">Now with YouTube Link analysis</span>
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-[7.5rem] font-black tracking-tight mb-4 leading-[0.9] md:leading-[0.85]"
          >
            Your Brain, <br className="hidden md:block"/>
            <span className="inline-block relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFA057] to-[#FF6B00] animate-shimmer bg-[length:200%_auto]">
                Augmented.
              </span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 tracking-wide font-medium"
          >
            Stop wasting hours re-studying. Feed your messy notes, lectures, and PDFs into our Gemini Engine and automatically build a Spaced Repetition track for 100% recall.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-[#FF6B00]/10 rounded-3xl blur-xl opacity-60 animate-pulse transition-all duration-500 group-focus-within:opacity-100 group-focus-within:bg-[#FF6B00]/30 group-focus-within:blur-2xl" />
            <form onSubmit={handleDemoSubmit} className="relative flex items-center bg-[#121212]/80 backdrop-blur-xl border border-white/10 group-focus-within:border-[#FF6B00]/70 rounded-2xl p-2 shadow-2xl transition-colors duration-300">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Video className="w-5 h-5 text-gray-500 group-focus-within:text-[#FF6B00] transition-colors" />
                <input 
                  type="text" 
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder="Paste a YouTube link or PDF URL..."
                  disabled={isDemoLoading}
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-medium"
                />
              </div>
              <button 
                type="submit" 
                disabled={isDemoLoading}
                className="px-6 py-3 rounded-xl bg-white text-black font-bold tracking-wide text-sm transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isDemoLoading ? (
                  <>
                    <Zap className="w-4 h-4 animate-pulse text-[#FF6B00]" /> Scanning...
                  </>
                ) : (
                  <>Try Quick Demo</>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* SECTION 2: HOW IT WORKS STEPPER */}
        <section id="how-it-works" className="px-6 max-w-6xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Ingest to recall in 3 steps</h2>
            <p className="text-gray-400 font-medium">A frictionless pipeline converting raw data into permanent memory.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-white/5 via-[#FF6B00]/20 to-white/5 -z-10" />
            
            {[ 
              { icon: BookType, title: "1. Raw Input", desc: "Upload dirty PDFs, raw lecture audio, or paste massive YouTube playlists." },
              { icon: BrainCircuit, title: "2. Gemini Analysis", desc: "Our AI structure engine extracts key definitions, summaries, and MCQs instantly." },
              { icon: Activity, title: "3. Spaced Retention", desc: "Data enters your Memory Graph automatically triggering optimal revision cycles." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] flex flex-col items-center text-center group hover:bg-[#FF6B00]/5 transition-colors shadow-2xl shadow-black/50 hover:border-[#FF6B00]/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-[#FF6B00]/10 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_0_20px_-5px_rgba(255,107,0,0.6)] transition-all duration-500">
                  <step.icon className="w-8 h-8 text-white group-hover:text-[#FF6B00] transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-wide">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: BENTO GRID FEATURES */}
        <section id="features" className="px-6 max-w-6xl mx-auto mt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-2 md:row-span-1 bg-[#121212]/60 backdrop-blur-3xl border border-white/10 border-t-[#FF6B00]/30 rounded-3xl p-8 overflow-hidden relative group hover:border-[#FF6B00]/50 hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.2)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative z-10 w-2/3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all">
                  <SpellCheck className="w-5 h-5 text-blue-400 group-hover:rotate-[15deg] transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">PDF Brain-Scan</h3>
                <p className="text-gray-400 text-sm">Upload massive 100-page academic papers. In 4 seconds, we extract the core formulas and logical frameworks.</p>
              </div>
              <div className="absolute right-[-10%] bottom-[-40%] w-[60%] opacity-50 group-hover:opacity-80 transition-opacity rotate-[-12deg]">
                <div className="w-full h-40 bg-gradient-to-t from-[#050505] to-white/10 border border-white/10 rounded-xl blur-[2px]" />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 md:row-span-1 bg-[#121212]/60 backdrop-blur-3xl border border-white/10 border-t-[#FF6B00]/30 rounded-3xl p-8 relative overflow-hidden group hover:border-[#FF6B00]/50 hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.2)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all">
                <Video className="w-5 h-5 text-red-400 group-hover:rotate-[15deg] transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">YouTube Distiller</h3>
              <p className="text-gray-400 text-sm mb-4">Turn 2-hour boring lectures into a 5-minute study guide automatically.</p>
              <div className="w-full h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-[#FF6B00]/30 transition-colors">
                 <div className="w-24 h-2 bg-white/10 rounded-full group-hover:bg-[#FF6B00] transition-colors shadow-[0_0_10px_rgba(255,107,0,0.5)] opacity-0 group-hover:opacity-100" />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-1 bg-[#121212]/60 backdrop-blur-3xl border border-white/10 border-t-[#FF6B00]/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#FF6B00]/50 hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.2)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] transition-all">
                <LayoutGrid className="w-8 h-8 text-[#FF6B00] group-hover:rotate-[15deg] transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Flashcards</h3>
              <p className="text-gray-400 text-xs">Self-generating 3D flashcards replacing Anki entirely.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 md:row-span-1 bg-[#121212]/60 backdrop-blur-3xl border border-white/10 border-t-[#FF6B00]/30 rounded-3xl p-8 relative overflow-hidden group hover:border-[#FF6B00]/50 hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.2)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all">
                    <Zap className="w-5 h-5 text-green-400 group-hover:rotate-[15deg] transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Smart Recall</h3>
                  <p className="text-gray-400 text-sm">Automated push alerts reminding you to review data exactly before the forgetting curve triggers.</p>
                </div>
                <div className="w-full md:w-48 flex flex-col gap-2">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-center border-l-4 border-l-green-500 group-hover:bg-[#121212] transition-colors shadow-none group-hover:shadow-lg">Review +1 Day</div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-center group-hover:bg-[#121212] transition-colors delay-75 shadow-none group-hover:shadow-lg">Review +7 Days</div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-center group-hover:bg-[#121212] transition-colors delay-100 shadow-none group-hover:shadow-lg">Review +30 Days</div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: MEMORY TIMELINE GRAPH */}
        <section className="px-6 max-w-5xl mx-auto mt-40">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#121212]/60 backdrop-blur-3xl border border-[#FF6B00]/30 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-[0_0_50px_-10px_rgba(255,107,0,0.15)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-12 md:max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Defeating the Forgetting Curve</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Without spaced reinforcement, humans lose 70% of new knowledge within 24 hours. SecondBrain locks your semantic memory permanently.
              </p>
            </div>

            <div className="relative h-48 w-full border-b border-l border-white/10 flex items-end">
              {/* Graph background lines */}
              <div className="absolute top-0 w-full border-t border-white/5 border-dashed" />
              <div className="absolute top-1/2 w-full border-t border-white/5 border-dashed" />
              
              {/* Normal Memory Curve (Decaying Blue) */}
              <svg className="absolute inset-0 w-full h-full preserve-3d overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <motion.path 
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   viewport={{ once: true }}
                   d="M 0 0 Q 15 90 100 95" 
                   stroke="rgba(59,130,246,0.3)" 
                   strokeWidth="2" 
                   fill="none" 
                   vectorEffect="non-scaling-stroke" 
                 />
              </svg>

              {/* SecondBrain Curve (Orange/Red) staying high */}
              <svg className="absolute inset-0 w-full h-full preserve-3d overflow-visible z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <motion.path 
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 2.5, ease: "easeInOut" }}
                   viewport={{ once: true }}
                   d="M 0 0 L 15 30 L 15 0 L 40 20 L 40 0 L 75 10 L 75 0 L 100 0" 
                   stroke="#FF6B00" 
                   strokeWidth="3" 
                   fill="none" 
                   vectorEffect="non-scaling-stroke" 
                   style={{ dropShadow: '0 0 20px rgba(255,107,0,0.8)' }}
                 />

                 {/* Interactive Nodes */}
                 {[
                   { cx: 15, cy: 0, label: "Day 1: 100% Recall" },
                   { cx: 40, cy: 0, label: "Day 7: 100% Recall" },
                   { cx: 75, cy: 0, label: "Day 30: 100% Recall" }
                 ].map((node, idx) => (
                   <motion.circle
                     key={idx}
                     cx={node.cx}
                     cy={node.cy}
                     r="2"
                     fill="#FF6B00"
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 1 + (idx * 0.5) }}
                     viewport={{ once: true }}
                     className="cursor-pointer hover:fill-white transition-colors animate-pulse"
                     style={{ vectorEffect: 'non-scaling-stroke' }}
                   >
                     <title>{node.label}</title>
                   </motion.circle>
                 ))}
              </svg>

              <div className="absolute -left-6 bottom-0 text-xs text-gray-500">-</div>
              <div className="absolute -left-12 top-0 text-xs text-gray-500 origin-center -translate-y-1/2">100% Retained</div>
              <div className="absolute -left-12 bottom-0 text-xs text-gray-500 origin-center translate-y-1/2">0% Memory</div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-[#050505]/60 backdrop-blur-xl px-6 py-12 md:py-20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wide mb-6">
              <BrainCircuit className="w-5 h-5 text-[#FF6B00]" />
              SecondBrain
            </Link>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed mb-6 font-medium">
              Engineered by hackers. The supreme AI-augmented memory core for students and researchers.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors"><Share2 className="w-5 h-5"/></a>
              <a href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5"/></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
