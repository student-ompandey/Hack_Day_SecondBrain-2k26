import React, { useState } from 'react';
import { BookOpen, List, Target, CheckCircle2, Save, CalendarClock, ChevronRight, MessageCircle, Send, Sparkles, Flame, Award, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { saveSessionToMemory } from '../lib/memory';
import { addDays, format } from 'date-fns';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
};

export default function ResultCard({ data }) {
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Tracked state for Learning DNA
  const [quizActivity, setQuizActivity] = useState([]);
  const [chatActivity, setChatActivity] = useState([]);

  // Gamification State
  const [streak] = useState(7);
  const [xp, setXp] = useState(1250);
  const maxXp = 2000;

  if (!data) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveSessionToMemory(data, data.summary?.[0]?.substring(0, 40) + "...");
      setSaved(true);
    } catch (e) {
      console.error("Failed to save session", e);
      alert("Failed to save to database. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1400px] mx-auto mt-8 pb-32"
    >
      <div className="max-w-[850px] mx-auto flex flex-col gap-y-12 w-full px-4">
        
        {/* NEW: Gamified Streak & XP Section */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 bg-[#121212]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FF6B00]/0 via-[#FF6B00]/50 to-[#FF6B00]/0 opacity-50" />
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                <Flame className="w-6 h-6 text-[#FF6B00] animate-pulse" />
              </div>
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">HOT</span>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">{streak} Day Streak</h3>
              <p className="text-xs text-textMuted uppercase tracking-widest font-bold">Unstoppable</p>
            </div>
          </div>

          <div className="flex-1 w-full pl-0 sm:pl-6 sm:border-l border-white/10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-gray-300">Daily XP</span>
              <span className="text-xs text-[#FF6B00] font-bold uppercase tracking-widest">{xp} / {maxXp}</span>
            </div>
            <div className="h-3 w-full bg-[#050505] rounded-full border border-white/5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(xp / maxXp) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#FF6B00]/50 to-[#FF6B00] rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]"
              />
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 group-hover:shadow-[0_0_20px_rgba(255,144,0,0.4)] transition-shadow">
            <Award className="w-6 h-6 text-accent" />
          </div>
        </motion.div>

        {/* 1. The Gist */}
        <motion.div variants={itemVariants} className="bg-[#121212]/60 backdrop-blur-2xl border border-[#FF6B00]/40 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-[50px] pointer-events-none" />
          <h2 className="flex items-center gap-2 text-xl font-bold mb-6 text-white pb-4 border-b border-white/10 uppercase tracking-widest relative z-10">
            <FileText className="w-5 h-5 text-[#FF6B00]" />
            The Gist
          </h2>
          <ul className="space-y-5 relative z-10">
            {data.summary?.map((point, i) => (
              <li key={i} className="flex gap-4 text-gray-300 leading-relaxed items-start group">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#FF6B00]/10 flex items-center justify-center shrink-0 border border-[#FF6B00]/20 group-hover:bg-[#FF6B00] transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#FF6B00] group-hover:text-black transition-colors" />
                </div>
                <span className="text-[1.05rem] font-medium tracking-wide">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 2. Conceptual Mindmap */}
        <motion.div variants={itemVariants}>
          <MindMapSection mindmap={data.mindmap} />
        </motion.div>

        {/* 3. Flashcards */}
        <motion.div variants={itemVariants} className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-xl">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-6 text-white pb-4 border-b border-white/10 uppercase tracking-widest shrink-0">
            <List className="w-5 h-5 text-[#FF6B00]" />
            Flashcards
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 custom-scrollbar perspective-1000">
            {data.keyConcepts?.map((concept, i) => (
              <Flashcard key={i} term={concept.term} definition={concept.definition} />
            ))}
          </div>
        </motion.div>

        {/* 4. Knowledge Check */}
        <motion.div variants={itemVariants}>
          <QuizSection quiz={data.quiz} setQuizActivity={setQuizActivity} />
        </motion.div>

        {/* 5. Analytics (Retention & DNA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col justify-center items-center text-center">
            <h2 className="font-bold text-white uppercase tracking-widest text-lg w-full text-left pb-4 border-b border-white/10 mb-6 flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-[#FF6B00]" />
              Retention Plan
            </h2>
            <div className="flex flex-row items-center gap-8 w-full justify-around mt-2">
              <div className="w-24 h-24 rounded-full border-[4px] border-[#1A1A1A] border-t-[#FF6B00] border-l-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.3)] flex flex-col items-center justify-center shrink-0 bg-[#0A0A0A]">
                 <span className="text-2xl font-black text-white">0%</span>
                 <span className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest mt-1">Score</span>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between text-[0.95rem] text-gray-400"><span>R1</span> <span className="font-bold text-white">{format(addDays(new Date(), 1), 'MMM d')}</span></div>
                <div className="flex justify-between text-[0.95rem] text-gray-400"><span>R2</span> <span className="font-bold text-white">{format(addDays(new Date(), 7), 'MMM d')}</span></div>
                <div className="flex justify-between text-[0.95rem] text-gray-400"><span>R3</span> <span className="font-bold text-white">{format(addDays(new Date(), 30), 'MMM d')}</span></div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={saved || isSaving}
              className={cn(
                "mt-8 w-full flex justify-center items-center gap-2 px-5 py-4 rounded-xl text-sm font-black tracking-widest uppercase transition-all",
                saved 
                  ? "bg-green-500/10 text-green-400 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                  : "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/50 hover:bg-[#FF6B00] hover:text-black hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] active:scale-95",
                 isSaving && "opacity-70 cursor-not-allowed"
              )}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : saved ? "Saved to Memory" : "Commit to Memory"}
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <AILearningDNA 
              quizActivity={quizActivity} 
              chatActivity={chatActivity} 
              explainLevel={data.explainLevel || 'Intermediate'} 
            />
          </motion.div>
        </div>
      </div>
      <ChatAssistant context={data} setChatActivity={setChatActivity} />
    </motion.div>
  );
}

function Flashcard({ term, definition }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-48 w-64 shrink-0 cursor-pointer perspective-1000 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-[#FF6B00]/60 transition-colors">
          <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{term}</h3>
          <span className="text-[10px] text-[#FF6B00]/70 mt-4 uppercase tracking-widest font-black font-sans bg-[#FF6B00]/10 px-3 py-1 rounded-full">Hover to flip</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute backface-hidden w-full h-full bg-[#FF6B00]/10 border border-[#FF6B00]/40 rounded-2xl p-5 overflow-y-auto custom-scrollbar flex items-center justify-center text-center shadow-[inset_0_0_20px_rgba(255,77,0,0.15)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-sm text-white leading-relaxed font-bold">{definition}</p>
        </div>
      </motion.div>
    </div>
  );
}

function QuizSection({ quiz, setQuizActivity }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (option) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const nextQuestion = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getScore = () => {
    if (!quiz) return 0;
    return quiz.reduce((score, q, idx) => {
      return answers[idx] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const handleSubmit = async () => {
    setShowResults(true);
    
    const incorrectQuestions = quiz.filter((q, idx) => answers[idx] !== q.correctAnswer);
    
    setQuizActivity({
      score: `${getScore()}/${quiz.length}`,
      incorrectTopics: incorrectQuestions.map(q => q.question)
    });
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incorrectQuestions })
      });
      const report = await response.json();
      setDiagnosticReport(report);
    } catch (e) {
      console.error("Diagnostic analysis failed", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!quiz || quiz.length === 0) return null;

  const currentQ = quiz[currentIndex];
  const isAnswered = !!answers[currentIndex];
  const isLast = currentIndex === quiz.length - 1;
  const allAnswered = Object.keys(answers).length === quiz.length;

  return (
    <div className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col min-h-[400px] relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4 shrink-0 relative z-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white uppercase tracking-widest">
          <Target className="w-5 h-5 text-[#FF6B00]" />
          Knowledge Check
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black tracking-widest uppercase text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20">
             Question {currentIndex + 1} of {quiz.length}
          </span>
          {showResults && (
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/50 font-bold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              Score: {getScore()} / {quiz.length}
            </motion.span>
          )}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <p className="font-bold text-white text-xl tracking-tight mb-8 leading-relaxed">
              {currentQ.question}
            </p>
            <div className="grid gap-4">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answers[currentIndex] === opt;
                const isCorrectOption = showResults && opt === currentQ.correctAnswer;
                const isWrongOption = showResults && isSelected && !isCorrectOption;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(opt)}
                    disabled={showResults}
                    className={cn(
                      "text-left p-5 rounded-2xl border-2 text-[1.05rem] transition-all duration-300 font-medium relative overflow-hidden",
                      !showResults && isSelected && "bg-[#FF6B00]/10 border-[#FF6B00] text-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.2)]",
                      !showResults && !isSelected && "bg-[#0A0A0A] border-white/5 text-gray-300 hover:border-white/20 hover:bg-[#1A1A1A]",
                      showResults && isCorrectOption && "bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] z-10",
                      showResults && isWrongOption && "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] z-10",
                      showResults && !isCorrectOption && !isWrongOption && "opacity-30 bg-black/50 border-transparent text-gray-600"
                    )}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span>{opt}</span>
                      {showResults && isCorrectOption && (
                         <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1A1A1A] shrink-0 gap-4">
         <button 
           onClick={prevQuestion}
           disabled={currentIndex === 0}
           className="px-4 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
         >
           Previous
         </button>

         {!showResults ? (
           isLast && allAnswered ? (
             <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)]"
              >
                Submit Answers
              </button>
           ) : (
             <button
                onClick={nextQuestion}
                disabled={!isAnswered || isLast}
                className="px-6 py-2 bg-[#111111] border border-[#222222] text-white font-bold rounded-xl hover:bg-[#222222] disabled:opacity-30 transition-colors flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
           )
         ) : (
            <button
              onClick={nextQuestion}
              disabled={isLast}
              className="px-6 py-2 bg-[#111111] border border-[#222222] text-white font-bold rounded-xl hover:bg-[#222222] disabled:opacity-30 transition-colors flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
         )}
      </div>

      {/* AI Diagnostic Report */}
      <AnimatePresence>
        {showResults && (isAnalyzing || diagnosticReport) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-6 rounded-2xl bg-[#FF6B00]/5 border border-[#FF6B00]/20 shadow-inner overflow-hidden shrink-0"
          >
            <h3 className="text-[#FF6B00] font-bold mb-4 flex items-center gap-2">
               Smart Revision Diagnostics
            </h3>
            
            {isAnalyzing ? (
              <div className="flex items-center gap-3 text-gray-400 text-sm animate-pulse">
                <div className="w-4 h-4 border-2 border-[#FF6B00]/50 border-t-[#FF6B00] rounded-full animate-spin" />
                Gemini is identifying your weak spots...
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Identified Weaknesses</h4>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {diagnosticReport?.weakTopics.map((topic, i) => (
                       <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div>
                   <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Targeted Revision Strategy</h4>
                   <p className="text-gray-200 text-sm leading-relaxed border-l-2 border-[#FF6B00]/50 pl-4">{diagnosticReport?.revisionPlan}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatAssistant({ context, setChatActivity }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = React.useRef(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsAsking(true);
    const newMessages = [...messages, { role: 'user', content: inputValue }];
    setMessages(newMessages);
    setChatActivity(newMessages);
    setInputValue("");
    
    try {
      const response = await fetch('http://localhost:5000/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, context })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      console.error("Ask doubt error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Network Error: Could not reach the AI." }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#050505]/90 backdrop-blur-3xl border border-[#1A1A1A] rounded-3xl w-[350px] sm:w-[400px] h-[500px] shadow-[0_0_50px_-10px_rgba(255,77,0,0.15)] mb-4 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#FF6B00]/10 to-transparent p-4 border-b border-[#1A1A1A] flex justify-between items-center shrink-0">
              <h2 className="flex items-center gap-2 font-bold text-[#FF6B00]">
                <MessageCircle className="w-5 h-5 text-[#FF6B00]" />
                AI Assistant
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">&times;</button>
            </div>
            
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 text-sm space-y-2">
                  <Sparkles className="w-8 h-8 text-[#FF6B00]/20" />
                  <p>Ask anything about your notes!</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed max-w-[85%]",
                    msg.role === 'user' 
                      ? "bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] ml-auto rounded-br-sm"
                      : "bg-[#111111] border border-[#222222] text-gray-300 mr-auto rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isAsking && (
                 <div className="bg-[#111111] border border-[#222222] mr-auto rounded-bl-sm rounded-2xl p-4 w-12 flex justify-center items-center h-10">
                   <div className="w-3 h-3 border-2 border-[#FF6B00]/50 border-t-[#FF6B00] rounded-full animate-spin" />
                 </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="relative p-3 border-t border-[#1A1A1A] shrink-0">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message AI..." 
                disabled={isAsking}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-colors text-white placeholder-textMuted/50"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isAsking}
                className="absolute right-5 top-5 text-[#FF6B00] hover:text-[#FF6B00] disabled:text-gray-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-[#FF6B00] to-[#FF6B00] text-black rounded-full flex justify-center items-center shadow-[0_0_30px_-5px_rgba(255,77,0,0.4)] hover:scale-105 active:scale-95 transition-all z-50"
      >
        <MessageCircle className="w-6 h-6 z-10" />
      </button>
    </div>
  );
}

function MindMapSection({ mindmap }) {
  if (!mindmap || mindmap.length === 0) return null;

  return (
    <div className="bg-[#121212]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-xl flex-1 flex flex-col min-h-[400px] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <h2 className="flex items-center gap-2 text-xl font-bold mb-8 text-white pb-4 border-b border-white/10 uppercase tracking-widest shrink-0">
        <List className="w-5 h-5 text-[#FF6B00]" />
        Conceptual Mindmap
      </h2>
      
      <div className="relative flex flex-col w-full flex-1 overflow-y-visible pr-2 pb-2 pl-4">
        {/* Main Vertical Glowing Connector */}
        <div className="absolute left-[31px] top-4 bottom-8 w-[3px] bg-gradient-to-b from-[#FF6B00] via-[#FF6B00]/50 to-transparent rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />

        <AnimatePresence>
          {mindmap.map((section, idx) => (
            <MindMapNode key={idx} node={section} index={idx} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MindMapNode({ node, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-16 pb-12 last:pb-0"
    >
      {/* Node Glowing Connector Bullet */}
      <div className="absolute left-[22px] top-[14px] w-5 h-5 rounded-full bg-[#121212] border-[3px] border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,1)] z-10" />
      
      {/* Horizontal Connector Line */}
      <div className="absolute left-[38px] top-[23px] w-8 h-[2px] bg-gradient-to-r from-[#FF6B00] to-transparent z-0" />

      <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg w-full hover:border-[#FF6B00]/70 hover:scale-[1.02] transition-all duration-300 group">
        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#FF6B00] transition-colors">
          {node.node}
        </h3>
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col gap-3 relative mt-2 pl-2">
            {/* Child tree border */}
            <div className="absolute left-[7px] top-2 bottom-4 w-[2px] bg-white/10 group-hover:bg-[#FF6B00]/30 transition-colors" />
            
            {node.children.map((child, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8"
              >
                <div className="absolute left-[7px] top-1/2 w-5 h-[2px] bg-white/10 group-hover:bg-[#FF6B00]/30 transition-colors" />
                <div className="absolute left-[24px] top-1/2 -mt-[3px] w-1.5 h-1.5 rounded-full border border-white/50 group-hover:border-[#FF6B00] bg-transparent transition-colors" />
                <p className="text-[0.95rem] text-gray-300 leading-relaxed bg-[#0A0A0A] p-3.5 rounded-xl border border-[#222] group-hover:border-[#FF6B00]/30 transition-colors shadow-inner">
                  {child}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AILearningDNA({ quizActivity, chatActivity, explainLevel }) {
  const [dnaProfile, setDnaProfile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const activityData = {
        explainLevel,
        quizPerformance: quizActivity || "Did not complete quiz",
        askedQuestions: chatActivity.filter(m => m.role === 'user').map(m => m.content)
      };

      const response = await fetch('http://localhost:5000/learning-dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityData })
      });
      const data = await response.json();
      setDnaProfile(data);
    } catch (e) {
      console.error("Failed to generate DNA", e);
      alert("Failed to generate Learning DNA. Please check network connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#121212]/60 backdrop-blur-2xl border border-[#FF6B00]/30 rounded-3xl p-8 shadow-[0_0_40px_-10px_rgba(255,77,0,0.15)] overflow-hidden relative flex flex-col justify-center min-h-[400px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10 w-full pb-4 border-b border-white/10 mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-white uppercase tracking-widest mb-2">
            <Sparkles className="w-5 h-5 text-[#FF6B00]" />
            AI Learning DNA
          </h2>
          <p className="text-[0.95rem] text-gray-400">Generate a personalized behavioral profile based on your session data.</p>
        </div>
        
        {!dnaProfile && (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 transition-all disabled:opacity-50 hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] shrink-0"
          >
            {isGenerating ? (
              <><div className="w-4 h-4 border-2 border-[#FF6B00]/50 border-t-[#FF6B00] rounded-full animate-spin" /> Sequencing...</>
            ) : "Generate Profile"}
          </button>
        )}
      </div>

      <AnimatePresence>
        {dnaProfile && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-[#1A1A1A]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black border border-[#222222] rounded-xl p-5">
                <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Learning Style</span>
                <p className="text-xl font-semibold text-white mt-1">{dnaProfile.learningStyle || "Adaptive"}</p>
              </div>
              <div className="bg-black border border-[#222222] rounded-xl p-5">
                <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Focus Pattern</span>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">{dnaProfile.focusPattern || "Analyzing session behaviors..."}</p>
              </div>
              
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                <span className="text-xs uppercase tracking-widest text-green-500 font-bold mb-3 block">Identified Strengths</span>
                <ul className="space-y-1 text-sm text-green-300/80">
                  {dnaProfile.strengths?.map((str, i) => <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{str}</li>) || <li className="italic text-gray-500">More data needed</li>}
                </ul>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold mb-3 block">Target Weaknesses</span>
                <ul className="space-y-1 text-sm text-red-300/80">
                  {dnaProfile.weaknesses?.map((wk, i) => <li key={i} className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />{wk}</li>) || <li className="italic text-gray-500">More data needed</li>}
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-xl p-5 relative overflow-hidden">
              <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-[#FF6B00]/10" />
              <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold block mb-2 relative z-10">Personalized Strategy</span>
              <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-[#FF6B00]/50 pl-4 relative z-10">{dnaProfile.strategy || "Continue iterating through flashcards to establish retention."}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
