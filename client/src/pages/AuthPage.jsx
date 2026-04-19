import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ArrowRight, Globe } from 'lucide-react';

export default function AuthPage({ isLogin }) {
  const navigate = useNavigate();

  const handleSimulateAuth = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#050505] overflow-hidden text-white font-sans selection:bg-[#FF6B00]/30">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Nav Overlay */}
      <div className="absolute top-0 w-full p-6 z-20 flex justify-between items-center max-w-7xl mx-auto inset-x-0">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wide group">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_-3px_var(--tw-colors-primary)] transition-all">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          SecondBrain
        </Link>
      </div>

      {/* Auth Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md px-6 md:px-0"
        >
          <div className="backdrop-blur-2xl bg-black/60 border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl flex flex-col items-center">
            
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-textMuted text-sm">
                {isLogin ? "Enter your credentials to access your memory engine." : "Start building your automated second brain today."}
              </p>
            </div>

            <form onSubmit={handleSimulateAuth} className="w-full space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-textMuted pl-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-600"
                  />
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-textMuted pl-1">Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-textMuted pl-1">Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-600"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group active:scale-[0.98] shadow-[0_0_20px_-5px_var(--tw-colors-primary)]"
              >
                {isLogin ? "Sign In" : "Get Started"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="w-full my-6 flex items-center gap-4 text-xs text-textMuted before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              OR
            </div>

            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-textMain font-medium text-sm transition-all flex items-center justify-center gap-3">
              <Globe className="w-4 h-4" />
              Continue with Global
            </button>

            <div className="mt-8 text-sm text-textMuted text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link 
                to={isLogin ? "/signup" : "/login"} 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </Link>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
