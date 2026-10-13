import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Share2,
  Search,
  FileText,
  Target,
  BarChart3,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Compass,
  Share2,
  Search,
  FileText,
  Target,
  BarChart3,
};

export default function CourseCard({ course, showProgress = true }) {
  const IconComponent = iconMap[course.iconName] || Compass;

  const accentStyles = {
    '#635BFF': {
      bg: 'bg-brand-50',
      text: 'text-brand-600',
      border: 'hover:border-brand-200',
      badge: 'bg-brand-50 text-brand-700',
      bar: 'bg-brand-500',
    },
    '#8B7CF6': {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'hover:border-purple-200',
      badge: 'bg-purple-50 text-purple-700',
      bar: 'bg-purple-500',
    },
    '#0EA5E9': {
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      border: 'hover:border-sky-200',
      badge: 'bg-sky-50 text-sky-700',
      bar: 'bg-sky-500',
    },
    '#EC4899': {
      bg: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'hover:border-pink-200',
      badge: 'bg-pink-50 text-pink-700',
      bar: 'bg-pink-500',
    },
    '#F59E0B': {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'hover:border-amber-200',
      badge: 'bg-amber-50 text-amber-700',
      bar: 'bg-amber-500',
    },
    '#22C55E': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-200',
      badge: 'bg-emerald-50 text-emerald-700',
      bar: 'bg-emerald-500',
    },
  }[course.accentColor] || {
    bg: 'bg-brand-50',
    text: 'text-brand-600',
    border: 'hover:border-brand-200',
    badge: 'bg-brand-50 text-brand-700',
    bar: 'bg-brand-500',
  };

  const progress = course.progressPercent !== undefined ? course.progressPercent : 0;
  const isCompleted = progress === 100;

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-surface-border p-6 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between ${accentStyles.border}`}
    >
      <div>
        {/* Top row: Category, Difficulty, Icon */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${accentStyles.badge}`}>
              {course.category}
            </span>
            <span className="text-[11px] font-medium text-txt-secondary bg-surface-subtle px-2 py-0.5 rounded-md">
              {course.difficulty}
            </span>
          </div>
          <div className={`w-10 h-10 rounded-xl ${accentStyles.bg} ${accentStyles.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
          <Link href={`/dashboard/courses/${course.slug}`}>
            {course.title}
          </Link>
        </h3>
        <p className="text-sm text-txt-secondary line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="pt-4 border-t border-surface-border/60">
        {/* Duration & Lessons count */}
        <div className="flex items-center justify-between text-xs text-txt-secondary mb-3">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-txt-muted" />
            {course.duration}
          </span>
          <span className="font-medium">
            {course.totalLessons || (course.lessons?.length || 3)} Lessons
          </span>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
              <span className="text-txt-secondary">Progress</span>
              <span className={isCompleted ? 'text-growth-green font-bold' : 'text-brand-600'}>
                {progress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-growth-green' : accentStyles.bar}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/dashboard/courses/${course.slug}`}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            isCompleted
              ? 'bg-growth-green/10 text-growth-green hover:bg-growth-green/20'
              : progress > 0
              ? 'bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white'
              : 'bg-navy-900 text-white hover:bg-navy-800'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-growth-green" />
              <span>Review Course</span>
            </>
          ) : progress > 0 ? (
            <>
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Start Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
