import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Palette, BellRing, Database } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit max-h-[85vh] overflow-y-auto custom-scrollbar bg-surface border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-textMain tracking-tight">Preferences</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-textMuted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* API Key Settings */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-textMain border-b border-white/5 pb-2">
                  <Key className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">API Credentials</h3>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-textMuted">Gemini API Key</label>
                  <input 
                    type="password" 
                    defaultValue="AIzaSyDQh2PV_4GozPR9c_q1CvJmSqpYVua_naY"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-gray-400 placeholder:text-gray-600"
                  />
                  <p className="text-xs text-textMuted/60 pt-1 leading-relaxed">
                    Used to securely access generation features. Stored locally.
                  </p>
                </div>
              </section>

              {/* Theme Settings */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-textMain border-b border-white/5 pb-2">
                  <Palette className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold">Appearance</h3>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/20">
                  <div>
                    <h4 className="text-sm font-medium">Dark Mode</h4>
                    <p className="text-xs text-textMuted mt-0.5">Force Deep Midnight aesthetic</p>
                  </div>
                  <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer border border-primary/20">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </section>

              {/* Notification Settings */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-textMain border-b border-white/5 pb-2">
                  <BellRing className="w-4 h-4 text-blue-400" />
                  <h3 className="font-semibold">Study Reminders</h3>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/20">
                  <div>
                    <h4 className="text-sm font-medium">Spaced Repetition Alerts</h4>
                    <p className="text-xs text-textMuted mt-0.5">Email me when a memory review expires</p>
                  </div>
                  <div className="w-11 h-6 bg-white/20 rounded-full relative cursor-pointer hover:bg-white/30 transition-colors">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/80 rounded-full shadow-sm" />
                  </div>
                </div>
              </section>
              
              {/* Data Settings */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-textMain">
                    <Database className="w-4 h-4 text-red-500" />
                    <h3 className="font-semibold text-sm">Clear Memory Cache</h3>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all">
                    Erase Data
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
