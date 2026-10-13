'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Award,
  Zap,
  Sparkles,
  Search,
  Share2,
  Calendar,
  BarChart3,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function AchievementsPage() {
  const { user } = useAuth();
  const xp = user?.xp || 420;
  const currentLevel = user?.level || 'Learner';

  const levelTiers = [
    { name: 'Beginner', minXp: 0, maxXp: 300, desc: 'Starting your marketing fundamentals' },
    { name: 'Learner', minXp: 300, maxXp: 600, desc: 'Executing core hooks & local search' },
    { name: 'Digital Marketer', minXp: 600, maxXp: 1000, desc: 'Running active multi-channel campaigns' },
    { name: 'Growth Expert', minXp: 1000, maxXp: 2000, desc: 'Mastering unit economics & scale' },
  ];

  const currentTier = levelTiers.find((t) => t.name === currentLevel) || levelTiers[1];
  const nextTier = levelTiers[levelTiers.indexOf(currentTier) + 1] || currentTier;
  const progressInTier = Math.min(100, Math.round(((xp - currentTier.minXp) / (currentTier.maxXp - currentTier.minXp)) * 100));

  const badges = [
    {
      name: 'SEO Starter',
      slug: 'seo-starter',
      category: 'Starter',
      description: 'Completed local search optimization basics and keyword research.',
      icon: Search,
      unlocked: true,
      reward: '+50 XP',
      dateEarned: 'Sep 24, 2026',
    },
    {
      name: 'Content Creator',
      slug: 'content-creator',
      category: 'Tool',
      description: 'Crafted 5 high-converting social media posts and scheduled a monthly calendar.',
      icon: Sparkles,
      unlocked: true,
      reward: '+75 XP',
      dateEarned: 'Sep 25, 2026',
    },
    {
      name: 'Social Media Starter',
      slug: 'social-media-starter',
      category: 'Starter',
      description: 'Mastered audience targeting and hook writing on Instagram and LinkedIn.',
      icon: Share2,
      unlocked: true,
      reward: '+50 XP',
      dateEarned: 'Sep 26, 2026',
    },
    {
      name: 'Marketing Planner',
      slug: 'marketing-planner',
      category: 'Tool',
      description: 'Generated a comprehensive quarterly promotional plan and budget.',
      icon: Calendar,
      unlocked: false,
      reward: '+100 XP',
      criteria: 'Create 1 full marketing plan in the tools suite',
    },
    {
      name: 'Analytics Beginner',
      slug: 'analytics-beginner',
      category: 'Mastery',
      description: 'Interpreted CAC, CTR, and conversion metrics to optimize ad spend.',
      icon: BarChart3,
      unlocked: false,
      reward: '+75 XP',
      criteria: 'Complete the Analytics knowledge check quiz',
    },
    {
      name: 'Official Growth Certification',
      slug: 'growth-certification',
      category: 'Mastery',
      description: 'Earned passing scores across all core course quizzes.',
      icon: ShieldCheck,
      unlocked: true,
      reward: '+150 XP',
      dateEarned: 'Sep 26, 2026',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Gamification & Milestones
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
          Achievements & XP
        </h2>
        <p className="text-xs sm:text-sm text-txt-secondary mt-1">
          Level up your digital marketing skills, unlock verifiable badges, and track your learning milestones.
        </p>
      </div>

      {/* Level Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-black shadow-inner">
              <Zap className="w-7 h-7 fill-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
                  Current Level
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-growth-green font-bold">
                  {currentLevel}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-navy-900 mt-0.5">
                {xp} Total Experience Points
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-txt-secondary block">
              Next Rank: <strong className="text-navy-900">{nextTier.name}</strong>
            </span>
            <span className="text-xs font-bold text-brand-600">
              {Math.max(0, nextTier.minXp - xp)} XP required
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-txt-secondary">
            <span>{currentTier.name} ({currentTier.minXp} XP)</span>
            <span>{progressInTier}%</span>
            <span>{nextTier.name} ({nextTier.minXp} XP)</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-purple-soft rounded-full transition-all duration-500"
              style={{ width: `${progressInTier}%` }}
            />
          </div>
        </div>

        {/* XP Rules Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-surface-border">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-subtle">
            <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-bold text-brand-600">
              +25
            </span>
            <span className="text-navy-900 font-medium">Complete any lesson</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-subtle">
            <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-bold text-purple-600">
              +50
            </span>
            <span className="text-navy-900 font-medium">Pass course quiz</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-subtle">
            <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-bold text-growth-green">
              +100
            </span>
            <span className="text-navy-900 font-medium">Complete entire course</span>
          </div>
        </div>
      </div>

      {/* Badges Grid (Section 23 Specification) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-navy-900">
          Earned & Available Badges
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  b.unlocked
                    ? 'bg-white border-surface-border shadow-subtle hover:shadow-card'
                    : 'bg-surface-subtle/70 border-dashed border-slate-300 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        b.unlocked
                          ? 'bg-brand-50 text-brand-600 shadow-sm'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.unlocked
                          ? 'bg-emerald-50 text-growth-green'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {b.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-navy-900 mb-1">
                    {b.name}
                  </h4>
                  <p className="text-xs text-txt-secondary leading-relaxed mb-4">
                    {b.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                  {b.unlocked ? (
                    <>
                      <span className="text-txt-muted text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-growth-green" />
                        {b.dateEarned}
                      </span>
                      <span className="font-bold text-growth-green">{b.reward}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-txt-muted text-[11px] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        {b.criteria}
                      </span>
                      <span className="font-bold text-txt-muted">{b.reward}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
