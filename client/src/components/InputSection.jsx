import React, { useState } from 'react';
import { Paperclip, Sparkles, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import ResultCard from './ResultCard';

export default function InputSection() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [explainLevel, setExplainLevel] = useState('Intermediate');
  
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    const handleReset = () => {
      setContent('');
      setFile(null);
      setResult(null);
    };
    window.addEventListener('reset-dashboard', handleReset);
    return () => window.removeEventListener('reset-dashboard', handleReset);
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleProcess = async () => {
    if (!content.trim() && !file) return;
    setIsProcessing(true);
    setResult(null);
    try {
      const formData = new FormData();
      if (content.trim()) formData.append('content', content);
      if (file) formData.append('file', file);
      formData.append('explainLevel', explainLevel);

      const apiUrl = import.meta.env.DEV ? 'http://localhost:5000' : 'https://hack-day-secondbrain-2k26-3.onrender.com';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        // Note: Do not set Content-Type header manually when sending FormData,
        // the browser will set it to multipart/form-data with the correct boundary!
        body: formData
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setResult({
          summary: [`Backend Error: ${data.error || "Unknown structure failure."}`],
          keyConcepts: [],
          quiz: [],
          mindmap: [{ node: "Error", children: ["Check Backend Logs"] }]
        });
      } else {
        data.explainLevel = explainLevel;
        setResult(data);
      }
    } catch (error) {
      console.error("Error processing with AI:", error);
      setResult({
        summary: ["Network Error: Unable to reach the backend service."],
        keyConcepts: [],
        quiz: [],
        mindmap: []
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-24">
      <div className="w-full max-w-4xl bg-[#0a0a0a]/50 backdrop-blur-3xl border border-[#1A1A1A] rounded-3xl p-5 shadow-[0_0_40px_-15px_rgba(255,107,0,0.15)] group relative z-20 hover:shadow-[0_0_50px_-10px_rgba(255,107,0,0.2)] transition-all duration-500">
        <div className="flex justify-end mb-1 px-1">
          <select 
            value={explainLevel} 
            onChange={(e) => setExplainLevel(e.target.value)}
            className="bg-black/40 border border-white/5 text-xs font-semibold text-textMuted rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
          >
            <option value="Beginner">Level: Beginner</option>
            <option value="Intermediate">Level: Intermediate</option>
            <option value="Expert">Level: Expert</option>
          </select>
        </div>
        <div className="relative mt-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Drop your notes, links, or ideas here to expand your SecondBrain..."
            className="w-full h-24 bg-transparent text-white placeholder-textMuted/40 resize-none outline-none p-2 text-lg font-medium leading-relaxed focus:ring-0 custom-scrollbar"
          />
          {file && (
            <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 text-primary px-4 py-2 rounded-xl text-sm font-bold animate-in fade-in zoom-in duration-300 backdrop-blur-md">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button onClick={clearFile} className="hover:bg-primary/30 p-1 rounded-md transition-colors">
                &times;
              </button>
            </div>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/*,application/pdf"
        />

        <div className="flex items-center justify-between mt-6 border-t border-[#1A1A1A] pt-4">
          <div className="flex items-center gap-3">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-3 rounded-xl text-textMuted hover:text-primary hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20 bg-black/40">
              <Paperclip className="w-5 h-5 relative z-10" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-3 rounded-xl text-textMuted hover:text-accent hover:bg-accent/10 transition-colors border border-transparent hover:border-accent/20 bg-black/40">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-3 rounded-xl text-textMuted hover:text-green-500 hover:bg-green-500/10 transition-colors border border-transparent hover:border-green-500/20 bg-black/40">
              <FileText className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleProcess}
            disabled={(!content.trim() && !file) || isProcessing}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-2xl font-bold transition-all duration-500 overflow-hidden relative",
              (content.trim() || file) && !isProcessing
                ? "bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] text-black hover:shadow-[0_0_30px_-5px_rgba(255,77,0,0.6)] active:scale-95"
                : "bg-[#111111] border border-[#222222] text-gray-600 cursor-not-allowed"
            )}
          >
            {isProcessing && <div className="absolute inset-0 animate-shimmer pointer-events-none" />}
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin relative z-10" />
                <span className="relative z-10">Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10 tracking-wide uppercase text-sm">Process</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* 
        This div is visually distinct and placed identically relative to the max-w-4xl layout 
      */}
      {result && <ResultCard data={result} />}
    </div>
  );
}
