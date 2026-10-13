'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import CourseCard from '@/components/CourseCard';
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Wrench,
  Calendar,
  Zap,
  BarChart3,
  Award,
  Play
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/courses').then((r) => r.json()),
      fetch('/api/assessment').then((r) => r.json()),
    ])
      .then(([courseData, assessData]) => {
        if (courseData.courses) setCourses(courseData.courses);
        if (assessData.result) setAssessment(assessData.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const growthScore = user?.businessProfile?.growthScore || assessment?.overallScore || 72;

  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Personalized Small-Business Growth Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Good morning, {user?.name?.split(' ')[0] || 'Alex'} 👋
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
            Your marketing engine for <strong className="text-navy-900 font-semibold">{user?.businessProfile?.businessName || 'Artisan Roast Coffee Co.'}</strong> is active. You have completed 68% of your core roadmap.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            href="/dashboard/assessment"
            className="px-4 py-2.5 rounded-xl border border-surface-border hover:bg-surface-subtle text-navy-900 font-bold text-xs shadow-subtle transition-all"
          >
            Retake Audit
          </Link>
          <Link
            href="/dashboard/courses/search-engine-optimization-seo"
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume Next Lesson</span>
          </Link>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* 4 Core Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Digital Growth Score"
          value={`${growthScore}/100`}
          delta="+4 pts"
          subtext="Based on your business audit"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Learning Progress"
          value="68%"
          delta="+12%"
          subtext="8 of 12 lessons finished"
          icon={BookOpen}
          color="indigo"
        />
        <StatCard
          title="Courses Completed"
          value="6/10"
          delta="+1 this week"
          subtext="Fundamental modules"
          icon={CheckCircle2}
          color="purple"
        />
        <StatCard
          title="Quiz Average"
          value="84%"
          delta="Top 15%"
          subtext="All knowledge checks"
          icon={Target}
          color="sky"
        />
      </div>

      {/* Continue Learning + Recommended For You */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Continue Learning Card (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-navy-900">
              Continue Learning
            </h3>
            <Link
              href="/dashboard/courses"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View all courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Current In-Progress Course Banner */}
          <div className="bg-white rounded-3xl p-6 border border-surface-border shadow-subtle hover:shadow-card transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-700">
                SEO & Local Search
              </span>
              <span className="text-xs font-semibold text-txt-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 18 mins remaining
              </span>
            </div>

            <h4 className="text-lg font-bold text-navy-900 mb-2">
              Google Business Profile Masterclass
            </h4>
            <p className="text-xs text-txt-secondary mb-6 leading-relaxed">
              Learn how to claim your local listing, upload photo updates that drive calls, and systematically gather 5-star customer reviews.
            </p>

            {/* Progress bar */}
            <div className="space-y-1.5 mb-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-txt-secondary">Course Progress</span>
                <span className="text-brand-600">50% completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full w-1/2" />
              </div>
            </div>

            <Link
              href="/dashboard/courses/search-engine-optimization-seo"
              className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Continue Lesson 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Practical Tool Shortcuts */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Link
              href="/dashboard/tools?tool=caption"
              className="p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-200 shadow-subtle hover:shadow-card transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-900">Caption Generator</p>
                <p className="text-[11px] text-txt-secondary">Create social hooks in seconds</p>
              </div>
            </Link>

            <Link
              href="/dashboard/content-planner"
              className="p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-200 shadow-subtle hover:shadow-card transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-growth-green flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-900">Content Calendar</p>
                <p className="text-[11px] text-txt-secondary">4 posts scheduled for next week</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recommended For You (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-navy-900">
              Recommended For You
            </h3>
            <span className="text-xs font-semibold text-txt-secondary">
              Based on lowest audit scores
            </span>
          </div>

          <div className="space-y-3">
            {/* Recommendation 1 */}
            <Link
              href="/dashboard/courses/search-engine-optimization-seo"
              className="block p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-200 hover:shadow-card transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    SEO
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      Complete SEO Basics
                    </h4>
                    <p className="text-[11px] text-txt-secondary mt-0.5">
                      Boost local search presence (Audit score: 55%)
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>

            {/* Recommendation 2 */}
            <Link
              href="/dashboard/courses/social-media-marketing"
              className="block p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-200 hover:shadow-card transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    SOC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      Learn Instagram Marketing
                    </h4>
                    <p className="text-[11px] text-txt-secondary mt-0.5">
                      Stop the scroll with value reels and carousels
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>

            {/* Recommendation 3 */}
            <Link
              href="/dashboard/campaigns"
              className="block p-4 rounded-2xl bg-white border border-surface-border hover:border-brand-200 hover:shadow-card transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ADS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      Create Your First Campaign
                    </h4>
                    <p className="text-[11px] text-txt-secondary mt-0.5">
                      Target local high-intent customers on Google & Meta
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          </div>

          {/* Gamification / Achievement Teaser */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 text-white shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-growth-green">
                Next Milestone
              </span>
              <span className="text-xs text-slate-300 font-semibold">180 XP to Level Up</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Digital Marketer Level</p>
                <p className="text-[11px] text-slate-300">Unlock official certification badge</p>
              </div>
            </div>
            <Link
              href="/dashboard/achievements"
              className="text-xs font-bold text-brand-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View all badges & leaderboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy-900">
              Your Course Roadmap
            </h3>
            <p className="text-xs text-txt-secondary">
              Step-by-step masterclasses designed for small businesses
            </p>
          </div>
          <Link
            href="/dashboard/courses"
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            See full library →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} showProgress={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
