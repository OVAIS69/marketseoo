'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Lightbulb,
  Users,
  Compass,
  Wrench,
  BookOpen,
  Award,
  Star,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  BarChart,
  Target,
  FileText,
  Search,
  Check,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [statsCount, setStatsCount] = useState({ businesses: 0, lessons: 0, progress: 0, rating: 0 });

  useEffect(() => {
    // Fetch courses
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
      })
      .catch((err) => console.error('Failed to load courses', err));

    // Animate stats numbers
    const timer = setTimeout(() => {
      setStatsCount({ businesses: 1240, lessons: 54, progress: 95, rating: 4.8 });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 6. HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/40 via-purple-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Small Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-surface-border shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-growth-green animate-pulse" />
                  <span className="text-xs font-bold text-navy-900 tracking-wide uppercase">
                    Digital Marketing Training for Small Businesses
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.12]">
                  Learn. Apply.{' '}
                  <br className="hidden sm:inline" />
                  Grow Your Business{' '}
                  <span className="text-gradient">Online.</span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-txt-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Simple and practical digital marketing training designed for small-business owners. Learn real-world strategies, create better marketing campaigns, and grow your online presence.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-surface-subtle text-navy-900 border border-surface-border font-bold text-sm shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-brand-600 ml-0.5" />
                    </div>
                    <span>Watch Demo</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs font-semibold text-txt-secondary">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-growth-green stroke-[2.5]" />
                    Beginner Friendly
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-growth-green stroke-[2.5]" />
                    Practical Learning
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-growth-green stroke-[2.5]" />
                    Marketing Tools
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-growth-green stroke-[2.5]" />
                    Certificate on Completion
                  </span>
                </div>
              </div>

              {/* Right Column: Premium Business-Growth Visual with Floating UI Cards */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
                  {/* Central Business Owner Card */}
                  <div className="relative mx-auto rounded-3xl overflow-hidden border border-surface-border shadow-2xl bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80"
                      alt="Small business owner reviewing online customer orders"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-growth-green">
                        Real-World Results
                      </span>
                      <h4 className="text-lg font-bold">Maya Chen</h4>
                      <p className="text-xs text-slate-200">Founder, Bloom & Stone Floral Studio</p>
                    </div>
                  </div>

                  {/* Floating Card 1: Social Media Growth */}
                  <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-surface-border flex items-center gap-3 animate-bounce [animation-duration:5s]">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-navy-900">Social Media Growth</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-blue-600">f</span>
                        <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-blue-700">in</span>
                        <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-red-600">▶</span>
                        <span className="text-[10px] font-bold text-growth-green ml-1">+142% reach</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Card 2: Business Growth */}
                  <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-surface-border animate-bounce [animation-duration:6s]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-growth-green flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-navy-900">Business Growth</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-xl font-black text-navy-900">+78%</span>
                      <span className="text-[10px] font-semibold text-growth-green">revenue lift</span>
                    </div>
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="w-4/5 h-full bg-growth-green rounded-full" />
                    </div>
                  </div>

                  {/* Floating Card 3: Create Better Content */}
                  <div className="absolute -top-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-surface-border flex items-center gap-2.5 animate-bounce [animation-duration:5.5s]">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-navy-900">Create Better Content</p>
                      <p className="text-[10px] text-txt-secondary">High-converting hooks</p>
                    </div>
                  </div>

                  {/* Floating Card 4: Get More Customers */}
                  <div className="absolute -bottom-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-surface-border flex items-center gap-2.5 animate-bounce [animation-duration:6.5s]">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-navy-900">Get More Customers</p>
                      <p className="text-[10px] text-txt-secondary">Google & Local Search</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. VALUE PROPOSITION STRIP */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white border-y border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-surface-bg border border-surface-border hover:border-brand-200 hover:shadow-card transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1.5">Easy to Understand</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">
                  Step-by-step lessons in simple language. No jargon, no fluff, just practical guidance for busy business owners.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-surface-bg border border-surface-border hover:border-brand-200 hover:shadow-card transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1.5">Practical Tools</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">
                  Use real tools for real business growth. Caption generators, ROI calculators, content calendars, and checklists.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-surface-bg border border-surface-border hover:border-brand-200 hover:shadow-card transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1.5">Expert Guidance</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">
                  Learn proven digital marketing concepts tested on hundreds of local shops, e-commerce stores, and service firms.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-surface-bg border border-surface-border hover:border-brand-200 hover:shadow-card transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-growth-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1.5">Track Your Progress</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">
                  Measure your learning and marketing progress with gamified XP, skill badges, and official certificates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. DIGITAL MARKETING COURSES */}
        {/* ========================================================================= */}
        <section id="courses" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Structured Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3 mb-4">
              Explore Our Digital Marketing Courses
            </h2>
            <p className="text-base text-txt-secondary">
              Learn the most important digital marketing skills to grow your small business online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress={false} />
              ))
            ) : (
              // Loading fallback cards
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 bg-white rounded-2xl border border-surface-border animate-pulse p-6" />
              ))
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. HOW IT WORKS */}
        {/* ========================================================================= */}
        <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-growth-green">
                A Clear Path To Growth
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
                How MarketLearn Works
              </h2>
              <p className="text-sm text-slate-300">
                Four simple steps from novice to running confident digital marketing campaigns for your business.
              </p>
            </div>

            {/* Steps Grid with Visual Connecting Line */}
            <div className="relative">
              {/* Connecting line on desktop */}
              <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-navy-800 -translate-y-8 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-brand-300 uppercase block mb-3">
                      01 — Profile
                    </span>
                    <h3 className="text-lg font-bold mb-2">Create Your Account</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Set up your business profile, specify your industry, target audience, and monthly budget.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-growth-green font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Takes only 60 seconds
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-purple-300 uppercase block mb-3">
                      02 — Diagnostic
                    </span>
                    <h3 className="text-lg font-bold mb-2">Take a Skill Assessment</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Understand your current digital marketing level and discover high-priority growth gaps.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-growth-green font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 7-minute audit
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-sky-300 uppercase block mb-3">
                      03 — Execution
                    </span>
                    <h3 className="text-lg font-bold mb-2">Learn & Apply</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Complete bite-sized courses and immediately use practical tools to craft captions and launch campaigns.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-growth-green font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Practical worksheets
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-growth-green uppercase block mb-3">
                      04 — Recognition
                    </span>
                    <h3 className="text-lg font-bold mb-2">Track Your Progress</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Improve your skills, earn achievement badges, boost your growth score, and get certified.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-growth-green font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verifiable certificate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. PRODUCT PREVIEW SECTION */}
        {/* ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mockup */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-surface-border shadow-2xl p-6 sm:p-8">
                {/* Mockup Top Header */}
                <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
                  <div>
                    <span className="text-xs text-txt-secondary">Business Dashboard</span>
                    <h4 className="text-base font-bold text-navy-900">Good morning, Alex 👋</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-growth-green text-xs font-bold">
                    Growth Score: 72/100
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-surface-subtle">
                    <span className="text-[11px] text-txt-secondary font-medium">Learning Progress</span>
                    <p className="text-xl font-extrabold text-brand-600 mt-0.5">68%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-subtle">
                    <span className="text-[11px] text-txt-secondary font-medium">Courses Completed</span>
                    <p className="text-xl font-extrabold text-navy-900 mt-0.5">6/10</p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-subtle">
                    <span className="text-[11px] text-txt-secondary font-medium">Quiz Average</span>
                    <p className="text-xl font-extrabold text-growth-green mt-0.5">84%</p>
                  </div>
                </div>

                {/* Recommended Lessons Preview */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
                    Recommended For You
                  </p>
                  <div className="p-3 rounded-xl border border-surface-border flex items-center justify-between hover:bg-surface-subtle transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-bold">
                        SEO
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy-900">Google Business Profile Masterclass</p>
                        <p className="text-[10px] text-txt-secondary">18 mins • Module 3</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-600">Resume →</span>
                  </div>
                  <div className="p-3 rounded-xl border border-surface-border flex items-center justify-between hover:bg-surface-subtle transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold">
                        SOC
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy-900">Writing Compelling Hooks and Captions</p>
                        <p className="text-[10px] text-txt-secondary">16 mins • Module 2</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-600">Resume →</span>
                  </div>
                </div>

                {/* Continue Learning CTA */}
                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Feature Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                SaaS Productivity Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Everything You Need to Grow Your Business
              </h2>
              <p className="text-sm text-txt-secondary leading-relaxed">
                MarketLearn bridges the gap between passive course watching and active business growth. We equip you with the practical tools and personalized recommendations you need right now.
              </p>

              {/* Feature List */}
              <div className="space-y-3.5 pt-2">
                {[
                  'Personalized learning path based on your industry',
                  'Interactive lessons, exercises, and quizzes',
                  'Social media content planner with status tracking',
                  'Marketing tools: Captions, ROI calculator, and SEO checklist',
                  'Business growth score with diagnostic focus areas',
                  'Verifiable certificate on completion',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-growth-green flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-navy-900">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 group"
                >
                  <span>Explore the interactive dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. PLATFORM STATISTICS */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-y border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
                  {statsCount.businesses.toLocaleString()}+
                </p>
                <p className="text-xs sm:text-sm font-semibold text-txt-secondary mt-1">
                  Small Businesses Trained
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
                  {statsCount.lessons}+
                </p>
                <p className="text-xs sm:text-sm font-semibold text-txt-secondary mt-1">
                  Practical Lessons
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
                  {statsCount.progress}%
                </p>
                <p className="text-xs sm:text-sm font-semibold text-txt-secondary mt-1">
                  Learners Show Progress
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
                  {statsCount.rating}/5
                </p>
                <p className="text-xs sm:text-sm font-semibold text-txt-secondary mt-1">
                  Average Rating
                </p>
              </div>
            </div>
            <p className="text-[11px] text-txt-muted text-center mt-6">
              * Metrics reflect platform design benchmarks and small-business sample simulations.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12. TESTIMONIALS */}
        {/* ========================================================================= */}
        <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Stories From Founders
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3 mb-4">
              Trusted by Ambitious Business Owners
            </h2>
            <p className="text-sm text-txt-secondary">
              See how everyday entrepreneurs transform their marketing from overwhelming to systematic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-txt-primary italic leading-relaxed mb-6">
                  “MarketLearn helped me understand digital marketing without making it complicated. In 3 weeks, our bakery’s Google Maps views shot up by 140%.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80"
                  alt="Elena Vance"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Elena Vance</h4>
                  <p className="text-[11px] text-txt-secondary">Owner, Hearth & Crumb Bakery</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-txt-primary italic leading-relaxed mb-6">
                  “The caption generator and content calendar alone saved me 5 hours every week. I finally know what to post and how to target customers who actually book.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80"
                  alt="Marcus Sterling"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Marcus Sterling</h4>
                  <p className="text-[11px] text-txt-secondary">Founder, Apex Auto Detailing</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-txt-primary italic leading-relaxed mb-6">
                  “The diagnostic assessment pinpointed that my analytics tracking was broken. Once fixed, I stopped wasting ad spend and doubled my return within a month.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80"
                  alt="Samantha Reed"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Samantha Reed</h4>
                  <p className="text-[11px] text-txt-secondary">Managing Director, Studio K Ceramics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13. FINAL CTA */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-navy-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
          {/* Subtle decorative gradient shapes */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Grow Your Business Online?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
              Start learning practical digital marketing skills today. Free forever for solo business owners getting started.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/assessment"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm transition-all text-center"
              >
                Take Free Growth Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Demo Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-surface-border">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
                <span className="text-sm font-bold text-navy-900">MarketLearn Product Walkthrough</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-slate-900 aspect-video flex flex-col items-center justify-center text-center text-white relative">
              <div className="w-16 h-16 rounded-full bg-brand-500/90 text-white flex items-center justify-center mb-3 shadow-lg">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <h4 className="text-base font-bold">Interactive Platform Overview</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                Explore how the courses, practical marketing tools, and diagnostic assessments work together to grow your business.
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition-colors"
                >
                  Launch Live Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
