import React, { useState } from 'react';
import { BookOpen, List, Target, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      {/* Summary Section */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-primary">
          <BookOpen className="w-5 h-5" />
          Summary
        </h2>
        <ul className="space-y-3">
          {data.summary?.map((point, i) => (
            <li key={i} className="flex gap-3 text-textMain/90 leading-relaxed">
              <span className="text-primary mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Concepts Section */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-blue-400">
          <List className="w-5 h-5" />
          Key Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.keyConcepts?.map((concept, i) => (
            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h3 className="font-medium text-textMain mb-1">{concept.term}</h3>
              <p className="text-sm text-textMuted leading-relaxed">{concept.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <QuizSection quiz={data.quiz} />
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
    <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <h2 className="flex items-center justify-between text-xl font-semibold mb-6 text-green-400">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Knowledge Check
        </div>
        {showResults && (
          <span className="text-sm px-3 py-1 bg-green-400/10 text-green-400 rounded-full border border-green-400/20">
            Score: {getScore()} / {quiz.length}
          </span>
        )}
      </h2>

      <div className="space-y-6">
        {quiz.map((q, idx) => {
          const isCorrectAnswerSelected = answers[idx] === q.correctAnswer;
          const hasAnswered = !!answers[idx];

          return (
            <div key={idx} className="space-y-3">
              <p className="font-medium text-textMain/90">{idx + 1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[idx] === opt;
                  const isCorrectOption = showResults && opt === q.correctAnswer;
                  const isWrongOption = showResults && isSelected && !isCorrectOption;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(idx, opt)}
                      disabled={showResults}
                      className={cn(
                        "text-left p-3 rounded-xl border text-sm transition-all duration-200",
                        !showResults && isSelected && "bg-primary/20 border-primary/50 text-textMain",
                        !showResults && !isSelected && "bg-white/5 border-white/5 text-textMuted hover:bg-white/10 hover:text-textMain",
                        showResults && isCorrectOption && "bg-green-500/20 border-green-500/50 text-green-400 font-medium",
                        showResults && isWrongOption && "bg-red-500/20 border-red-500/50 text-red-400",
                        showResults && !isCorrectOption && !isWrongOption && "opacity-50 bg-white/5 border-transparent text-textMuted"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        {opt}
                        {showResults && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!showResults && Object.keys(answers).length === quiz.length && (
        <button
          onClick={() => setShowResults(true)}
          className="mt-6 w-full py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 active:scale-[0.98]"
        >
          Check Answers
        </button>
      )}
    </div>
  );
}
