'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Wrench,
  Sparkles,
  Hash,
  Lightbulb,
  FileSpreadsheet,
  Calculator,
  CheckSquare,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const dynamic = 'force-dynamic';

function MarketingToolsContent() {
  const searchParams = useSearchParams();
  const initialTool = searchParams.get('tool') || 'caption';
  const [activeTool, setActiveTool] = useState(initialTool);
  const { addXP } = useAuth();
  const [copiedKey, setCopiedKey] = useState(null);

  // Helper for copying text
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addXP(5);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // -------------------------------------------------------------
  // Tool 1: Caption Generator State
  // -------------------------------------------------------------
  const [captionForm, setCaptionForm] = useState({
    platform: 'Instagram',
    tone: 'Engaging & Authentic',
    topic: 'Announcing our new seasonal cold brew blend crafted with Ethiopian single-origin beans',
    offer: 'Get 15% off your first bag with code FIRSTBREW',
  });
  const [generatedCaptions, setGeneratedCaptions] = useState([
    {
      hook: "Stop scrolling if you care about what's in your morning cup. ☕✨",
      body: "We just dropped our limited-batch Ethiopian Cold Brew—slow-steeped for 18 hours for natural notes of bergamot and blueberry chocolate.\n\nCrafted fresh in small batches every morning right here at the roastery.",
      cta: "Tap the link in bio to grab a bag, or use code FIRSTBREW for 15% off your first order!",
      tags: "#SpecialtyCoffee #ColdBrewSeason #CoffeeRoasters #SmallBatchCoffee #LocalCafe"
    }
  ]);

  const handleGenerateCaptions = () => {
    addXP(10);
    const hooks = [
      `The secret to perfect ${captionForm.topic.toLowerCase().includes('coffee') ? 'coffee' : 'results'} isn't what you think... 👀`,
      `We spent weeks perfecting this, and today it’s finally live. 🚀`,
      `If you’ve been looking for a sign to upgrade your routine, this is it.`
    ];
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
    setGeneratedCaptions([
      {
        hook: randomHook,
        body: `Here’s why we created this for you: ${captionForm.topic}.\n\nEvery single detail was dialed in so you get the highest quality possible without the hassle.`,
        cta: `${captionForm.offer ? captionForm.offer + '. ' : ''}Link in bio to experience it today!`,
        tags: `#SmallBusiness #QualityFirst #${captionForm.platform}Marketing #ShopLocal`
      }
    ]);
  };

  // -------------------------------------------------------------
  // Tool 2: Hashtag Generator State
  // -------------------------------------------------------------
  const [niche, setNiche] = useState('Coffee Roasting & Cafe');
  const hashtagSets = {
    'Coffee Roasting & Cafe': {
      highReach: ['#SpecialtyCoffee', '#CoffeeLover', '#CoffeeTime', '#BaristaLife', '#CoffeeAddict'],
      nicheTargeted: ['#SingleOriginCoffee', '#ThirdWaveCoffee', '#SmallBatchRoaster', '#PourOverCoffee', '#ArtisanRoast'],
      localCommunity: ['#SupportLocalRoasters', '#LocalCafeVibes', '#NeighborhoodCoffee', '#ShopSmall', '#IndieBusiness'],
    },
    'Retail & Boutique': {
      highReach: ['#BoutiqueStyle', '#OOTD', '#ShopLocal', '#FashionInspo', '#CuratedGoods'],
      nicheTargeted: ['#HandcraftedGoods', '#SustainableFashion', '#SlowLiving', '#ArtisanMade', '#ModernAesthetic'],
      localCommunity: ['#MainStreetShop', '#ShopLocalCommunity', '#SupportSmallMakers', '#SmallBizLove'],
    },
    'Fitness & Wellness': {
      highReach: ['#FitnessMotivation', '#WellnessJourney', '#HealthyHabits', '#WorkoutInspo'],
      nicheTargeted: ['#MindfulMovement', '#FunctionalStrength', '#PersonalTrainerTips', '#HolisticHealth'],
      localCommunity: ['#LocalGymCommunity', '#NeighborhoodFitness', '#CommunityWellness'],
    }
  };
  const activeTags = hashtagSets[niche] || hashtagSets['Coffee Roasting & Cafe'];

  // -------------------------------------------------------------
  // Tool 3: Content Idea Generator State
  // -------------------------------------------------------------
  const [ideaCategory, setIdeaCategory] = useState('Food & Hospitality');
  const ideaPillars = [
    {
      pillar: '1. Behind-The-Scenes',
      concept: 'Show the unpolished prep work',
      prompt: 'Record a 20-second time-lapse of your morning prep station or ingredient unboxing. Add trending audio with text explaining why fresh prep matters.',
    },
    {
      pillar: '2. "They Ask, You Answer"',
      concept: 'Address the #1 customer hesitation',
      prompt: 'Pick the question you were asked most this week (e.g. "How long does whole-bean coffee stay fresh?"). Provide a definitive 60-second video answer.',
    },
    {
      pillar: '3. Customer Transformation',
      concept: 'Highlight a customer story',
      prompt: 'Share a photo or quote from a loyal regular explaining how your product improved their daily morning routine.',
    },
    {
      pillar: '4. Myth Busters',
      concept: 'Debunk a common industry misconception',
      prompt: 'Explain why the cheapest option or common shortcut actually costs customers more in the long run.',
    },
    {
      pillar: '5. Community Spotlight',
      concept: 'Cross-promote a local partner',
      prompt: 'Feature a fellow local small business or supplier you love working with to generate collaborative goodwill and cross-audience reach.',
    },
  ];

  // -------------------------------------------------------------
  // Tool 4: Marketing Plan Generator State
  // -------------------------------------------------------------
  const [planGoal, setPlanGoal] = useState('Attract 50 New Local Customers');
  const [planBudget, setPlanBudget] = useState('600');

  // -------------------------------------------------------------
  // Tool 5: Budget & ROI Calculator State
  // -------------------------------------------------------------
  const [targetCustomers, setTargetCustomers] = useState(15);
  const [avgOrderValue, setAvgOrderValue] = useState(45);
  const [convRate, setConvRate] = useState(3.0); // 3%
  const [cpcEstimate, setCpcEstimate] = useState(0.85); // $0.85 per click

  const requiredClicks = Math.ceil(targetCustomers / (convRate / 100));
  const estimatedAdSpend = Math.round(requiredClicks * cpcEstimate);
  const estimatedRevenue = targetCustomers * avgOrderValue;
  const breakEvenROAS = estimatedAdSpend > 0 ? (estimatedRevenue / estimatedAdSpend).toFixed(2) : 0;

  // -------------------------------------------------------------
  // Tool 6: SEO Checklist State
  // -------------------------------------------------------------
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Claimed and verified Google Business Profile', checked: true, impact: 'High' },
    { id: 2, label: 'NAP (Name, Address, Phone) identical on all online listings', checked: true, impact: 'High' },
    { id: 3, label: 'Added primary keyword + city name to homepage Title Tag', checked: true, impact: 'High' },
    { id: 4, label: 'Uploaded 10+ high-resolution photos of premises and products', checked: false, impact: 'Medium' },
    { id: 5, label: 'Set up systematic process to request reviews from every customer', checked: false, impact: 'High' },
    { id: 6, label: 'Mobile responsiveness test passed on Google PageSpeed Insights', checked: true, impact: 'Medium' },
    { id: 7, label: 'Configured local schema markup or structured business data', checked: false, impact: 'Low' },
  ]);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
    addXP(10);
  };

  const completedChecks = checklist.filter((c) => c.checked).length;
  const seoScore = Math.round((completedChecks / checklist.length) * 100);

  const tools = [
    { id: 'caption', name: 'Caption Generator', icon: Sparkles, desc: 'Engaging hooks & captions' },
    { id: 'hashtag', name: 'Hashtag Generator', icon: Hash, desc: 'Targeted tags by category' },
    { id: 'idea', name: 'Content Idea Generator', icon: Lightbulb, desc: '5 pillars for your niche' },
    { id: 'plan', name: 'Marketing Plan Generator', icon: FileSpreadsheet, desc: 'Quarterly roadmap & spend' },
    { id: 'budget', name: 'Budget Calculator', icon: Calculator, desc: 'Estimate spending & ROAS' },
    { id: 'seo', name: 'SEO Checklist', icon: CheckSquare, desc: 'Small business audit list' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Productivity Suite
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
          Practical Marketing Tools
        </h2>
        <p className="text-xs sm:text-sm text-txt-secondary mt-1">
          Apply your marketing knowledge immediately with functional generators, calculators, and checklists.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-navy-900 text-white shadow-md border-navy-900'
                  : 'bg-white text-navy-900 hover:border-brand-200 border-surface-border shadow-subtle'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                isActive ? 'bg-white/10 text-growth-green' : 'bg-brand-50 text-brand-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{t.name}</p>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-txt-secondary'}`}>
                  {t.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: CAPTION GENERATOR */}
      {activeTool === 'caption' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-4">
            <h3 className="text-base font-bold text-navy-900">Configure Your Post</h3>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">Target Platform</label>
              <select
                value={captionForm.platform}
                onChange={(e) => setCaptionForm({ ...captionForm, platform: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900 font-medium"
              >
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
                <option>TikTok</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">Tone of Voice</label>
              <select
                value={captionForm.tone}
                onChange={(e) => setCaptionForm({ ...captionForm, tone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900 font-medium"
              >
                <option>Engaging & Authentic</option>
                <option>Professional & Authoritative</option>
                <option>Playful & Lighthearted</option>
                <option>Urgent & Promotional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">What are you announcing / sharing?</label>
              <textarea
                rows={3}
                value={captionForm.topic}
                onChange={(e) => setCaptionForm({ ...captionForm, topic: e.target.value })}
                className="w-full p-3 rounded-xl border border-surface-border text-xs text-navy-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">Offer or Call to Action (optional)</label>
              <input
                type="text"
                value={captionForm.offer}
                onChange={(e) => setCaptionForm({ ...captionForm, offer: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
              />
            </div>

            <button
              onClick={handleGenerateCaptions}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate High-Converting Captions (+10 XP)</span>
            </button>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-navy-900">Generated Captions</h3>
            {generatedCaptions.map((cap, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-surface-border shadow-card space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                    Hook + Body + CTA Structure
                  </span>
                  <button
                    onClick={() => copyToClipboard(`${cap.hook}\n\n${cap.body}\n\n${cap.cta}\n\n${cap.tags}`, `cap-${i}`)}
                    className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    {copiedKey === `cap-${i}` ? <Check className="w-3.5 h-3.5 text-growth-green" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `cap-${i}` ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>

                <p className="text-xs font-bold text-navy-900">{cap.hook}</p>
                <p className="text-xs text-txt-secondary whitespace-pre-line leading-relaxed">{cap.body}</p>
                <p className="text-xs font-semibold text-brand-600">{cap.cta}</p>
                <p className="text-[11px] text-slate-400 font-mono pt-2">{cap.tags}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 2: HASHTAG GENERATOR */}
      {activeTool === 'hashtag' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-navy-900">Curated Small Business Hashtags</h3>
              <p className="text-xs text-txt-secondary">Balanced between high search volume and local target discovery</p>
            </div>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="p-2.5 rounded-xl border border-surface-border text-xs font-bold text-navy-900"
            >
              <option>Coffee Roasting & Cafe</option>
              <option>Retail & Boutique</option>
              <option>Fitness & Wellness</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">Broad Reach (500k+)</span>
                <button
                  onClick={() => copyToClipboard(activeTags.highReach.join(' '), 'high')}
                  className="text-xs text-brand-600 font-bold hover:underline"
                >
                  {copiedKey === 'high' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeTags.highReach.map((tag) => (
                  <span key={tag} className="text-xs bg-white px-2 py-1 rounded-md border border-surface-border text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">Niche Targeted (50k-200k)</span>
                <button
                  onClick={() => copyToClipboard(activeTags.nicheTargeted.join(' '), 'niche')}
                  className="text-xs text-brand-600 font-bold hover:underline"
                >
                  {copiedKey === 'niche' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeTags.nicheTargeted.map((tag) => (
                  <span key={tag} className="text-xs bg-white px-2 py-1 rounded-md border border-surface-border text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">Local & Community</span>
                <button
                  onClick={() => copyToClipboard(activeTags.localCommunity.join(' '), 'local')}
                  className="text-xs text-brand-600 font-bold hover:underline"
                >
                  {copiedKey === 'local' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeTags.localCommunity.map((tag) => (
                  <span key={tag} className="text-xs bg-white px-2 py-1 rounded-md border border-surface-border text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: CONTENT IDEA GENERATOR */}
      {activeTool === 'idea' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">5 Evergreen Content Pillars</h3>
              <p className="text-xs text-txt-secondary">Never run out of social media or newsletter topics again</p>
            </div>
            <button
              onClick={() => {
                addXP(10);
                alert('Refreshed ideas for your category!');
              }}
              className="p-2 text-txt-secondary hover:text-navy-900 rounded-lg hover:bg-surface-subtle flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shuffle Ideas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideaPillars.map((idea, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-surface-border hover:border-brand-200 hover:shadow-subtle transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600">{idea.pillar}</span>
                  <span className="text-[11px] text-txt-secondary font-medium">{idea.concept}</span>
                </div>
                <p className="text-xs text-navy-900 leading-relaxed font-normal">{idea.prompt}</p>
                <button
                  onClick={() => copyToClipboard(idea.prompt, `idea-${idx}`)}
                  className="text-[11px] font-bold text-navy-900 hover:text-brand-600 flex items-center gap-1 pt-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedKey === `idea-${idx}` ? 'Copied prompt' : 'Copy prompt template'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 4: MARKETING PLAN GENERATOR */}
      {activeTool === 'plan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">Quarterly Target Goal</label>
              <select
                value={planGoal}
                onChange={(e) => setPlanGoal(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
              >
                <option>Attract 50 New Local Customers</option>
                <option>Launch E-commerce Product Subscriptions</option>
                <option>Double Foot Traffic for Weekend Events</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">Monthly Ad Spend ($)</label>
              <input
                type="number"
                value={planBudget}
                onChange={(e) => setPlanBudget(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-surface-border space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
              Generated 90-Day Execution Roadmap
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-2">
                <span className="text-[10px] font-bold text-brand-600 uppercase">Month 1: Foundation</span>
                <p className="text-xs font-bold text-navy-900">Audit & Local Presence</p>
                <ul className="text-xs text-txt-secondary space-y-1.5 leading-relaxed">
                  <li>• Claim and optimize Google Business Profile</li>
                  <li>• Gather 15 verified 5-star customer reviews</li>
                  <li>• Allocate ${Math.round(planBudget * 0.3)} to test Google local ads</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-2">
                <span className="text-[10px] font-bold text-purple-600 uppercase">Month 2: Demand Capture</span>
                <p className="text-xs font-bold text-navy-900">Social Hooks & Retargeting</p>
                <ul className="text-xs text-txt-secondary space-y-1.5 leading-relaxed">
                  <li>• Publish 3 weekly reels solving customer friction</li>
                  <li>• Launch ${Math.round(planBudget * 0.5)} Meta geo-targeted campaign</li>
                  <li>• Implement lead magnet on website</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-2">
                <span className="text-[10px] font-bold text-growth-green uppercase">Month 3: Retention</span>
                <p className="text-xs font-bold text-navy-900">Repeat Orders & Referrals</p>
                <ul className="text-xs text-txt-secondary space-y-1.5 leading-relaxed">
                  <li>• Launch automated 14-day re-order email campaign</li>
                  <li>• Scale top-performing search ads with ${planBudget}</li>
                  <li>• Calculate customer CAC vs lifetime order value</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: BUDGET CALCULATOR */}
      {activeTool === 'budget' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-8">
          <div>
            <h3 className="text-base font-bold text-navy-900">Marketing Budget & ROI Simulator</h3>
            <p className="text-xs text-txt-secondary">Model required ad spend based on your target customer acquisition numbers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Target New Customers Per Month</span>
                  <span className="text-brand-600">{targetCustomers} customers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={targetCustomers}
                  onChange={(e) => setTargetCustomers(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Average Customer Order Value ($)</span>
                  <span className="text-brand-600">${avgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="250"
                  step="5"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Estimated Website Conversion Rate</span>
                  <span className="text-brand-600">{convRate}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.5"
                  value={convRate}
                  onChange={(e) => setConvRate(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>
            </div>

            <div className="bg-navy-900 text-white rounded-2xl p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-growth-green">
                Calculated Budget Forecast
              </span>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[11px] text-slate-300">Recommended Ad Spend</span>
                  <p className="text-2xl font-black text-white mt-0.5">${estimatedAdSpend}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-300">Estimated Revenue</span>
                  <p className="text-2xl font-black text-growth-green mt-0.5">${estimatedRevenue}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-300">Required Website Clicks</span>
                  <p className="text-lg font-bold text-white mt-0.5">{requiredClicks.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-300">Estimated ROAS</span>
                  <p className="text-lg font-bold text-brand-300 mt-0.5">{breakEvenROAS}x</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-navy-800">
                Target CAC is ${(estimatedAdSpend / targetCustomers).toFixed(2)} per paying customer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 6: SEO CHECKLIST */}
      {activeTool === 'seo' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
            <div>
              <h3 className="text-base font-bold text-navy-900">Small Business SEO Audit Checklist</h3>
              <p className="text-xs text-txt-secondary">Essential optimizations to capture high-intent local searchers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-navy-900">{seoScore}% Optimized</span>
                <span className="text-[11px] text-txt-secondary block">{completedChecks} of {checklist.length} completed</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-brand-500 flex items-center justify-center font-black text-xs text-navy-900">
                {seoScore}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  item.checked
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-surface-border hover:bg-surface-subtle'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      item.checked ? 'bg-growth-green border-growth-green text-white' : 'border-slate-300'
                    }`}
                  >
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${item.checked ? 'text-navy-900 line-through text-opacity-70' : 'text-navy-900'}`}>
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.impact} Impact
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketingToolsPage() {
  return (
    <Suspense fallback={<div className="h-96 bg-white rounded-3xl border border-surface-border animate-pulse p-8" />}>
      <MarketingToolsContent />
    </Suspense>
  );
}
