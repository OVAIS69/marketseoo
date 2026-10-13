'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CourseQuizPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user, addXP } = useAuth();
  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.course && data.course.quizzes && data.course.quizzes.length > 0) {
          setCourse(data.course);
          setQuiz(data.course.quizzes[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-80 bg-white rounded-3xl border border-surface-border animate-pulse" />
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center bg-white rounded-3xl border border-surface-border">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-navy-900">Quiz not available</h3>
        <p className="text-xs text-txt-secondary mt-1">
          No quiz has been added to this course yet.
        </p>
        <Link
          href={`/dashboard/courses/${slug}`}
          className="mt-4 inline-block px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold"
        >
          Return to Course
        </Link>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQ = questions[currentQIdx];
  const options = JSON.parse(currentQ.optionsJson || '[]');

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const finalAnswers = { ...userAnswers, [currentQ.id]: selectedOption };

    try {
      const res = await fetch(`/api/quizzes/${quiz.id}/attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'user_alex_morgan',
          userAnswers: finalAnswers,
        }),
      });
      const data = await res.json();
      setQuizResults(data);

      if (data.passed) {
        addXP(data.xpEarned || 50);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error('Quiz attempt submit failed', err);
    }
  };

  const handleRestart = () => {
    setQuizResults(null);
    setCurrentQIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
  };

  const isCorrect = selectedOption === currentQ.correctAnswerIndex;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <Link
          href={`/dashboard/courses/${slug}`}
          className="text-xs font-bold text-txt-secondary hover:text-navy-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {course?.title}</span>
        </Link>
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
          Knowledge Check
        </span>
      </div>

      {!quizResults ? (
        /* Quiz Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-txt-secondary uppercase tracking-wider">
                Question {currentQIdx + 1} of {questions.length}
              </span>
              <span className="text-brand-600">
                Passing: {quiz.passingScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div>
            <h3 className="text-lg font-bold text-navy-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {options.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isThisTheCorrectAnswer = optIdx === currentQ.correctAnswerIndex;

              let optionStyle = 'border-surface-border hover:bg-surface-subtle text-navy-900';
              if (isAnswerSubmitted) {
                if (isThisTheCorrectAnswer) {
                  optionStyle = 'border-growth-green bg-emerald-50 text-growth-green font-bold';
                } else if (isSelected && !isThisTheCorrectAnswer) {
                  optionStyle = 'border-red-400 bg-red-50 text-red-700 font-medium';
                } else {
                  optionStyle = 'border-surface-border opacity-50 text-txt-muted';
                }
              } else if (isSelected) {
                optionStyle = 'border-brand-500 bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-500';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <span>{optText}</span>
                  <div className="flex-shrink-0">
                    {isAnswerSubmitted && isThisTheCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-growth-green fill-growth-green text-white" />
                    )}
                    {isAnswerSubmitted && isSelected && !isThisTheCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 fill-red-500 text-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation (Section 18 Specification) */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl border space-y-1 animate-in fade-in duration-200 ${
                isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-growth-green" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-600" />
                )}
                <span className={`text-xs font-bold ${isCorrect ? 'text-growth-green' : 'text-amber-800'}`}>
                  {isCorrect ? 'Correct! Well done.' : 'Incorrect.'}
                </span>
              </div>
              <p className="text-xs text-navy-900 leading-relaxed pt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-surface-border flex items-center justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
              >
                <span>{currentQIdx === questions.length - 1 ? 'View Final Results' : 'Continue to Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Summary View (Section 18 Specification) */
        <div className="bg-white rounded-3xl p-8 border border-surface-border shadow-card text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center shadow-sm">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
                Knowledge Check Completed
              </span>
              <h3 className="text-2xl font-black text-navy-900 mt-1">
                Quiz Complete
              </h3>
            </div>

            {/* Score display: 8/10 style */}
            <div className="p-4 rounded-2xl bg-surface-subtle inline-block min-w-44">
              <span className="text-xs font-semibold text-txt-secondary block">Your Score</span>
              <span className="text-4xl font-black text-navy-900">
                {quizResults.correctCount} / {quizResults.totalQuestions}
              </span>
              <span className="text-xs font-bold text-brand-600 block mt-0.5">
                ({quizResults.percentage}%)
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              {quizResults.passed ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-growth-green text-xs font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Passed • +50 XP Awarded</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                  <span>Below 70% threshold • Try again to earn XP</span>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold text-navy-900 hover:bg-surface-subtle flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <Link
                href={`/dashboard/courses/${slug}`}
                className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Return to Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
