import React, { useState } from 'react';
import { Paperclip, Sparkles, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import ResultCard from './ResultCard';

export default function InputSection() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  const fileInputRef = React.useRef(null);

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

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        // Note: Do not set Content-Type header manually when sending FormData,
        // the browser will set it to multipart/form-data with the correct boundary!
        body: formData
      });
      const data = await response.json();
      setResult(data);
      console.log("Gemini Data:", data);
    } catch (error) {
      console.error("Error processing with AI:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-24">
      <div className="w-full max-w-4xl bg-surface border border-gray-800 rounded-2xl p-4 shadow-xl shadow-black/40 z-20 relative">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your notes, ideas, or drop files here to build your SecondBrain..."
            className="w-full h-40 bg-transparent text-textMain placeholder-textMuted/60 resize-none outline-none p-2 text-lg leading-relaxed focus:ring-0"
          />
          {file && (
            <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium animate-in fade-in zoom-in duration-300">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button onClick={clearFile} className="hover:bg-primary/20 p-1 rounded-md transition-colors">
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

        <div className="flex items-center justify-between mt-4 border-t border-gray-800/60 pt-4">
          <div className="flex items-center gap-2">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-2.5 rounded-lg text-textMuted hover:text-primary hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20">
              <Paperclip className="w-5 h-5 relative z-10" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-2.5 rounded-lg text-textMuted hover:text-blue-400 hover:bg-blue-400/10 transition-colors border border-transparent hover:border-blue-400/20">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center p-2.5 rounded-lg text-textMuted hover:text-green-400 hover:bg-green-400/10 transition-colors border border-transparent hover:border-green-400/20">
              <FileText className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleProcess}
            disabled={(!content.trim() && !file) || isProcessing}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
              (content.trim() || file) && !isProcessing
                ? "bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_-5px_rgba(255,107,107,0.5)] active:scale-95"
                : "bg-surface border border-gray-700 text-gray-500 cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Process with AI
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
