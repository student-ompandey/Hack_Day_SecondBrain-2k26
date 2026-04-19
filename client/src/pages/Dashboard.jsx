import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans overflow-hidden selection:bg-[#FF6B00]/30 custom-scrollbar">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full bg-radial-gradient from-[#FF6B00]/10 via-[#FF6B00]/0 to-transparent blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-[#FF6B00]/5 via-transparent to-transparent blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <Sidebar />
      <MainContent />
    </div>
  );
}
