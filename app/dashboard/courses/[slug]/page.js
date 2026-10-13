'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  CheckCircle2,
  Circle,
  Play,
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  HelpCircle,
  Check,
  Send,
  BookOpen
} from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user, addXP } = useAuth();
  const [course, setCourse] = useState(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [userExerciseNotes, setUserExerciseNotes] = useState('');
  const [savedExerciseMessage, setSavedExerciseMessage] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.course) {
          setCourse(data.course);
          // Set first uncompleted lesson as active if available
          const firstIncompleteIdx = data.course.lessons.findIndex((l) => !l.isCompleted);
          if (firstIncompleteIdx !== -1) {
            setActiveLessonIdx(firstIncompleteIdx);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleToggleComplete = async (lesson) => {
    setUpdating(true);
    const newStatus = !lesson.isCompleted;

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'user_alex_morgan',
          courseId: course.id,
          lessonId: lesson.id,
          completed: newStatus,
        }),
      });

      // Update state locally
      setCourse((prev) => {
        const updatedLessons = prev.lessons.map((l) =>
          l.id === lesson.id ? { ...l, isCompleted: newStatus } : l
        );
        const completedCount = updatedLessons.filter((l) => l.isCompleted).length;
        const progressPercent = Math.round((completedCount / updatedLessons.length) * 100);

        return {
          ...prev,
          lessons: updatedLessons,
          completedCount,
          progressPercent,
        };
      });

      if (newStatus) {
        addXP(25);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveExercise = () => {
    setSavedExerciseMessage(true);
    addXP(15);
    setTimeout(() => setSavedExerciseMessage(false), 3000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-96 bg-white rounded-3xl border border-surface-border animate-pulse" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-surface-border">
        <h3 className="text-lg font-bold text-navy-900">Course not found</h3>
        <Link href="/dashboard/courses" className="mt-3 inline-block text-xs font-bold text-brand-600">
          ← Return to course library
        </Link>
      </div>
    );
  }

  const activeLesson = course.lessons[activeLessonIdx] || course.lessons[0];
  const hasQuiz = course.quizzes && course.quizzes.length > 0;
  const isLastLesson = activeLessonIdx === course.lessons.length - 1;

  return (
    <div className="space-y-6">
      {/* Course Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-xl border border-surface-border hover:bg-surface-subtle text-txt-secondary hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                {course.category}
              </span>
              <span className="text-xs text-txt-secondary">• {course.duration}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-navy-900">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Progress & Quiz Trigger */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-navy-900 block">
              {course.progressPercent}% Complete
            </span>
            <span className="text-[11px] text-txt-secondary">
              {course.completedCount} of {course.totalLessons} lessons
            </span>
          </div>

          {hasQuiz && (
            <Link
              href={`/dashboard/courses/${course.slug}/quiz`}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Take Quiz</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Course Learning Layout: Sidebar Modules + Lesson Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Course Modules & Lessons (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-surface-border p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
              Course Modules ({course.lessons.length})
            </span>
            <span className="text-xs font-bold text-growth-green">
              {course.completedCount}/{course.lessons.length} done
            </span>
          </div>

          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => {
              const isActive = idx === activeLessonIdx;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-3 ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'hover:bg-surface-subtle text-txt-primary border border-transparent'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {lesson.isCompleted ? (
                      <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-growth-green fill-growth-green' : 'text-growth-green fill-growth-green'}`} />
                    ) : (
                      <Circle className={`w-4 h-4 ${isActive ? 'text-slate-400' : 'text-slate-300'}`} />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-navy-900'}`}>
                      {idx + 1}. {lesson.title}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-txt-secondary'}`}>
                      {lesson.duration}
                    </p>
                  </div>
                </button>
              );
            })}

            {hasQuiz && (
              <Link
                href={`/dashboard/courses/${course.slug}/quiz`}
                className="w-full p-3 rounded-2xl text-left bg-purple-50/60 hover:bg-purple-100/70 border border-purple-100 transition-all flex items-center gap-3 text-purple-900 mt-3"
              >
                <HelpCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold">Knowledge Check Quiz</p>
                  <p className="text-[10px] text-purple-600">Earn +50 XP and test retention</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card space-y-8">
          {/* Active Lesson Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
            <div>
              <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                Lesson {activeLessonIdx + 1} of {course.lessons.length}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-1">
                {activeLesson.title}
              </h1>
            </div>

            <button
              onClick={() => handleToggleComplete(activeLesson)}
              disabled={updating}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeLesson.isCompleted
                  ? 'bg-growth-green/10 text-growth-green hover:bg-growth-green/20'
                  : 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm'
              }`}
            >
              {activeLesson.isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-growth-green" />
                  <span>Completed (+25 XP)</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>

          {/* Video Placeholder or Interactive Visual */}
          <div className="rounded-2xl overflow-hidden bg-navy-950 aspect-video relative flex flex-col items-center justify-center text-white p-6 shadow-inner border border-navy-800">
            <div className="w-16 h-16 rounded-full bg-brand-500/90 hover:scale-105 transition-transform flex items-center justify-center cursor-pointer shadow-lg">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
            <p className="text-xs font-bold mt-4 tracking-wide uppercase text-slate-300">
              Interactive Video Lesson
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {activeLesson.title} • {activeLesson.duration}
            </p>
          </div>

          {/* Key Takeaways Box */}
          {activeLesson.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Key Business Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-navy-900">
                {activeLesson.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lesson Content Prosaic Markdown-Style Text */}
          <div className="prose prose-sm max-w-none text-navy-900 space-y-4 leading-relaxed">
            {activeLesson.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-lg font-bold text-navy-900 pt-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={pIdx} className="text-base font-bold text-navy-900 pt-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote
                    key={pIdx}
                    className="p-4 rounded-xl bg-surface-subtle border-l-4 border-brand-500 text-xs text-navy-900 italic"
                  >
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return (
                <p key={pIdx} className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Practical Interactive Exercise Worksheet */}
          {activeLesson.exercisePrompt && (
            <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Practical Business Exercise
                </span>
                <span className="text-[11px] font-semibold text-growth-green">+15 XP upon saving</span>
              </div>
              <p className="text-xs text-txt-secondary font-medium">
                {activeLesson.exercisePrompt}
              </p>
              <textarea
                rows={3}
                placeholder="Write your business notes, customer profile, or draft response here..."
                value={userExerciseNotes}
                onChange={(e) => setUserExerciseNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-border bg-white text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSaveExercise}
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save to Business Notebook</span>
                </button>
                {savedExerciseMessage && (
                  <span className="text-xs font-bold text-growth-green animate-in fade-in">
                    ✓ Saved! +15 XP added
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Lesson Navigation */}
          <div className="pt-6 border-t border-surface-border flex items-center justify-between">
            <button
              onClick={() => setActiveLessonIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeLessonIdx === 0}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-bold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Lesson</span>
            </button>

            {isLastLesson ? (
              hasQuiz && (
                <Link
                  href={`/dashboard/courses/${course.slug}/quiz`}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>Take Course Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )
            ) : (
              <button
                onClick={() => setActiveLessonIdx((prev) => Math.min(course.lessons.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
