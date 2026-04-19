import React, { useState } from 'react';
import { BookOpen, List, Target, CheckCircle2, Save, CalendarClock, ChevronRight } from 'lucide-react';
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
};

export default function ResultCard({ data }) {
  const [saved, setSaved] = useState(false);

  if (!data) return null;

  const handleSave = () => {
    saveSessionToMemory(data, data.summary?.[0]?.substring(0, 40) + "...");
    setSaved(true);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mt-8 space-y-6 pb-20"
    >
      {/* Retention Plan / Save Bar */}
      <motion.div variants={itemVariants} className="bg-surface border border-primary/20 rounded-2xl p-4 shadow-lg shadow-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-textMain">
          <div className="bg-primary/20 p-2 rounded-xl text-primary">
            <CalendarClock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Spaced Repetition Schedule Built</h3>
            <p className="text-xs text-textMuted flex items-center gap-2 mt-1">
              <span>R1: {format(addDays(new Date(), 1), 'MMM d')}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>R2: {format(addDays(new Date(), 7), 'MMM d')}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>R3: {format(addDays(new Date(), 30), 'MMM d')}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saved}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
            saved 
              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
              : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95"
          )}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved to Memory" : "Commit to Memory"}
        </button>
      </motion.div>

      {/* Summary Section */}
      <motion.div variants={itemVariants} className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-5 text-primary pb-3 border-b border-gray-800/60">
          <BookOpen className="w-5 h-5" />
          Summary
        </h2>
        <ul className="space-y-4">
          {data.summary?.map((point, i) => (
            <li key={i} className="flex gap-4 text-textMain/90 leading-relaxed items-start">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-[1.05rem] font-medium text-gray-300">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Key Concepts Section (Flashcards) */}
      <motion.div variants={itemVariants} className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 relative z-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-5 text-blue-400 pb-3 border-b border-gray-800/60">
          <List className="w-5 h-5" />
          Key Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1000">
          {data.keyConcepts?.map((concept, i) => (
            <Flashcard key={i} term={concept.term} definition={concept.definition} />
          ))}
        </div>
      </motion.div>

      {/* Quiz Section */}
      <motion.div variants={itemVariants}>
        <QuizSection quiz={data.quiz} />
      </motion.div>
    </motion.div>
  );
}

function Flashcard({ term, definition }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-40 w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-blue-500/20 transition-colors shadow-inner shadow-blue-500/10">
          <h3 className="text-lg font-bold text-blue-100">{term}</h3>
          <span className="text-xs text-blue-400/60 mt-3 uppercase tracking-widest font-semibold font-sans">Click to flip</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute backface-hidden w-full h-full bg-surface border border-gray-700 rounded-xl p-4 overflow-y-auto custom-scrollbar flex items-center justify-center text-center shadow-xl shadow-black/60"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-sm text-gray-300 leading-relaxed font-medium">{definition}</p>
        </div>
      </motion.div>
    </div>
  );
}

function QuizSection({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIdx, option) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIdx]: option }));
  };

  const getScore = () => {
    if (!quiz) return 0;
    return quiz.reduce((score, q, idx) => {
      return answers[idx] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (!quiz || quiz.length === 0) return null;

  return (
    <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40">
      <h2 className="flex items-center justify-between text-xl font-semibold mb-6 text-green-400 pb-3 border-b border-gray-800/60">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Knowledge Check
        </div>
        {showResults && (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm px-4 py-1.5 bg-green-400/10 text-green-400 rounded-full border border-green-400/30 font-bold tracking-wide"
          >
            Score: {getScore()} / {quiz.length}
          </motion.span>
        )}
      </h2>

      <div className="space-y-8">
        {quiz.map((q, idx) => {
          const hasAnswered = !!answers[idx];

          return (
            <div key={idx} className="space-y-4">
              <p className="font-semibold text-textMain/90 text-lg flex gap-3">
                <span className="text-gray-500">{idx + 1}.</span> 
                {q.question}
              </p>
              <div className="grid gap-3 pl-7">
                <AnimatePresence>
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[idx] === opt;
                    const isCorrectOption = showResults && opt === q.correctAnswer;
                    const isWrongOption = showResults && isSelected && !isCorrectOption;

                    return (
                      <motion.button
                        key={oIdx}
                        layout
                        onClick={() => handleSelect(idx, opt)}
                        disabled={showResults}
                        whileHover={!showResults ? { scale: 1.01 } : {}}
                        whileTap={!showResults ? { scale: 0.99 } : {}}
                        className={cn(
                          "text-left p-4 rounded-xl border text-base transition-all duration-300 font-medium",
                          !showResults && isSelected && "bg-green-500/20 border-green-500/50 text-textMain shadow-[0_0_15px_-3px_rgba(34,197,94,0.2)]",
                          !showResults && !isSelected && "bg-[#1f232b] border-[#2a2f3a] text-textMuted hover:bg-[#252a34] hover:text-textMain",
                          showResults && isCorrectOption && "bg-green-500/20 border-green-500/50 text-green-400 ring-1 ring-green-500/50",
                          showResults && isWrongOption && "bg-red-500/20 border-red-500/50 text-red-500 ring-1 ring-red-500/50",
                          showResults && !isCorrectOption && !isWrongOption && "opacity-40 bg-white/5 border-transparent text-textMuted scale-95"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {showResults && isCorrectOption && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {!showResults && Object.keys(answers).length === quiz.length && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowResults(true)}
          className="mt-8 w-full py-4 bg-green-500 text-white font-bold text-lg rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 active:scale-[0.98]"
        >
          Submit Answers
        </motion.button>
      )}
    </div>
  );
}
