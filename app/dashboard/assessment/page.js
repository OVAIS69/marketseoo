'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  BarChart3,
  Search,
  Share2,
  FileText,
  Target,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

const assessmentQuestions = [
  {
    id: 'social_presence',
    category: 'Social Media',
    question: 'How consistently does your business publish content on social media?',
    options: [
      { text: 'We rarely or never post on any channel', score: 20 },
      { text: 'We post sporadically once or twice a month', score: 45 },
      { text: 'We post 2-3 times per week with consistent brand themes', score: 80 },
      { text: 'We have an active weekly calendar with reels, stories, and engagement', score: 100 },
    ],
  },
  {
    id: 'google_seo',
    category: 'SEO',
    question: 'Is your Google Business Profile claimed, verified, and regularly updated with photos and reviews?',
    options: [
      { text: 'No, we haven’t set up or claimed our profile yet', score: 15 },
      { text: 'We claimed it once but haven’t added photos or gathered reviews', score: 40 },
      { text: 'Claimed with business hours, but fewer than 15 reviews and rare photo updates', score: 55 },
      { text: 'Fully optimized with weekly posts, 50+ reviews, and frequent owner responses', score: 95 },
    ],
  },
  {
    id: 'content_strategy',
    category: 'Content',
    question: 'Do you create educational or problem-solving content that directly answers customer buying questions?',
    options: [
      { text: 'We only post direct sales pitches or generic holiday greetings', score: 25 },
      { text: 'We occasionally answer FAQs when customers ask in-store', score: 50 },
      { text: 'We have guides or articles addressing our most common customer objections', score: 72 },
      { text: 'We run a comprehensive "They Ask, You Answer" system across social and web', score: 95 },
    ],
  },
  {
    id: 'ad_tracking',
    category: 'Advertising',
    question: 'Have you run paid digital ads (Google Search, Meta, or local promotions) with a defined target audience?',
    options: [
      { text: 'We have never spent money on digital advertising', score: 20 },
      { text: 'We occasionally clicked "Boost Post" without tracking results', score: 45 },
      { text: 'We run structured campaigns targeting a 5-10 mile radius with clear budget caps', score: 65 },
      { text: 'We have continuous multi-channel campaigns with calculated CAC and ROAS targets', score: 90 },
    ],
  },
  {
    id: 'analytics_setup',
    category: 'Analytics',
    question: 'Can you accurately determine how much it costs your business to acquire one new paying customer (CAC)?',
    options: [
      { text: 'We have no analytics installed and do not track acquisition cost', score: 20 },
      { text: 'We look at website page views but do not track conversions or costs', score: 48 },
      { text: 'We track leads and approximate cost-per-lead monthly', score: 75 },
      { text: 'We have full conversion tracking in GA4 and know our exact customer LTV to CAC ratio', score: 95 },
    ],
  },
  {
    id: 'customer_engagement',
    category: 'Customer Engagement',
    question: 'Do you maintain an email list or automated follow-up system for existing customers?',
    options: [
      { text: 'No customer database or email list exists', score: 20 },
      { text: 'We collect emails occasionally on paper or receipts without sending newsletters', score: 45 },
      { text: 'We send a monthly newsletter or promotional update to our list', score: 75 },
      { text: 'We have automated welcome series, review requests, and repeat-order reminders', score: 95 },
    ],
  },
];

export default function AssessmentPage() {
  const { user, addXP } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scores, setScores] = useState({
    overall: 72,
    social: 80,
    seo: 55,
    content: 72,
    advertising: 61,
    analytics: 48,
  });
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Load existing result from API
    fetch('/api/assessment')
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setScores({
            overall: data.result.overallScore,
            social: data.result.socialScore,
            seo: data.result.seoScore,
            content: data.result.contentScore,
            advertising: data.result.advertisingScore,
            analytics: data.result.analyticsScore,
          });
          setRecommendations(data.result.recommendations || []);
          setIsCompleted(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelectOption = (questionId, optionScore) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionScore,
    }));
  };

  const handleNext = () => {
    if (currentIdx < assessmentQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      calculateAndSubmit();
    }
  };

  const calculateAndSubmit = async () => {
    setSaving(true);

    // Calculate category breakdown
    const social = selectedAnswers['social_presence'] || 80;
    const seo = selectedAnswers['google_seo'] || 55;
    const content = selectedAnswers['content_strategy'] || 72;
    const advertising = selectedAnswers['ad_tracking'] || 61;
    const analytics = selectedAnswers['analytics_setup'] || 48;
    const overall = Math.round((social + seo + content + advertising + analytics) / 5);

    const updatedScores = {
      overall,
      social,
      seo,
      content,
      advertising,
      analytics,
    };
    setScores(updatedScores);

    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'user_alex_morgan',
          socialScore: social,
          seoScore: seo,
          contentScore: content,
          advertisingScore: advertising,
          analyticsScore: analytics,
        }),
      });
      const data = await res.json();
      if (data.result?.recommendations) {
        setRecommendations(data.result.recommendations);
      }
    } catch (err) {
      console.error('Failed to save assessment', err);
    } finally {
      setIsCompleted(true);
      setSaving(false);
      addXP(50);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  const currentQ = assessmentQuestions[currentIdx];
  const isCurrentAnswered = selectedAnswers[currentQ?.id] !== undefined;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Small Business Growth Diagnostic
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Digital Marketing Assessment
        </h2>
        <p className="text-xs sm:text-sm text-txt-secondary max-w-xl mx-auto">
          Identify your business’s highest-leverage growth opportunities across SEO, social media, paid ads, and analytics.
        </p>
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-border shadow-card space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-txt-secondary">
                Question {currentIdx + 1} of {assessmentQuestions.length}
              </span>
              <span className="text-brand-600">
                {Math.round(((currentIdx + 1) / assessmentQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / assessmentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="pt-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              {currentQ.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === option.score;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, option.score)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/70 text-navy-900 shadow-sm ring-1 ring-brand-500'
                      : 'border-surface-border hover:bg-surface-subtle text-txt-secondary hover:text-navy-900'
                  }`}
                >
                  <span>{option.text}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-white text-brand-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="pt-6 border-t border-surface-border flex items-center justify-between">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle transition-all"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered || saving}
              className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>{saving ? 'Calculating...' : currentIdx === assessmentQuestions.length - 1 ? 'View Growth Report' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Score Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-border shadow-card text-center relative overflow-hidden">
            <div className="max-w-md mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
                Your Digital Marketing Score
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-6xl sm:text-7xl font-black text-navy-900 tracking-tight">
                  {scores.overall}
                </span>
                <span className="text-2xl font-bold text-slate-400">/100</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-growth-green text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Intermediate Growth Stage</span>
              </div>

              <p className="text-xs text-txt-secondary leading-relaxed pt-2">
                Your business has established steady social media traction, but is missing high-intent local search customers and analytics attribution.
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface-subtle text-xs font-bold text-navy-900 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
                <Link
                  href="/dashboard/courses"
                  className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Start Recommended Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Category Breakdown (Section 16 Specification) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-subtle space-y-6">
            <h3 className="text-base font-bold text-navy-900">
              Channel Mastery Breakdown
            </h3>

            <div className="space-y-4">
              {/* Social Media - 80% */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-purple-600" />
                    <span className="text-navy-900">Social Media Marketing</span>
                  </div>
                  <span className="text-purple-600 font-extrabold">{scores.social}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${scores.social}%` }} />
                </div>
              </div>

              {/* SEO - 55% */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-sky-600" />
                    <span className="text-navy-900">Search Engine Optimization (SEO)</span>
                  </div>
                  <span className="text-sky-600 font-extrabold">{scores.seo}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${scores.seo}%` }} />
                </div>
              </div>

              {/* Content - 72% */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-pink-600" />
                    <span className="text-navy-900">Content Marketing</span>
                  </div>
                  <span className="text-pink-600 font-extrabold">{scores.content}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${scores.content}%` }} />
                </div>
              </div>

              {/* Advertising - 61% */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span className="text-navy-900">Online Advertising</span>
                  </div>
                  <span className="text-amber-600 font-extrabold">{scores.advertising}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${scores.advertising}%` }} />
                </div>
              </div>

              {/* Analytics - 48% */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span className="text-navy-900">Analytics & Tracking</span>
                  </div>
                  <span className="text-emerald-600 font-extrabold">{scores.analytics}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.analytics}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Focus Areas (Section 16 Specification) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-900">
                  Recommended Focus Areas
                </h3>
                <p className="text-xs text-txt-secondary">
                  Prioritized by lowest scores to yield immediate marketing return
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.length > 0 ? (
                recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                          {rec.priority} Priority
                        </span>
                        <span className="text-xs font-black text-slate-400">{rec.score}%</span>
                      </div>
                      <h4 className="text-xs font-bold text-navy-900 mb-1.5">{rec.area}</h4>
                      <p className="text-xs text-txt-secondary leading-relaxed">{rec.action}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-surface-border">
                      <Link
                        href={`/dashboard/courses/${rec.suggestedCourse || 'analytics-and-growth-tracking'}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center justify-between group"
                      >
                        <span>Open Recommended Course</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-6 text-center text-xs text-txt-secondary bg-white rounded-2xl border border-surface-border">
                  Complete the questionnaire above to generate your customized action plan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
