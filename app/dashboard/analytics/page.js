'use client';

import React, { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import {
  TrendingUp,
  DollarSign,
  Users,
  MousePointerClick,
  Percent,
  ShoppingCart,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AnalyticsDashboardPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics?days=${days}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [days]);

  const kpis = data?.kpis || {
    totalCampaigns: 3,
    totalBudget: 900,
    totalReach: 23180,
    totalClicks: 1460,
    totalConversions: 201,
    avgCTR: '6.3%',
    avgConversionRate: '13.7%',
    estimatedCAC: '$4.48',
    growthPercent: '+24.8%',
  };

  const timelineData = data?.timelineData || [];
  const channelBreakdown = data?.channelBreakdown || [];
  const funnelData = data?.funnelData || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Real-Time Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
            Performance Analytics
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Track reach, clicks, conversion rates, and acquisition costs across active campaigns.
          </p>
        </div>

        {/* Timeframe Filters (Section 22 Specification: 7 days, 30 days, 90 days) */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-surface-border shadow-subtle">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                days === d
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle'
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Budget Spent"
          value={`$${kpis.totalBudget}`}
          delta="+18%"
          subtext={`${kpis.totalCampaigns} campaigns running`}
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          title="Estimated Reach"
          value={kpis.totalReach?.toLocaleString()}
          delta="+34%"
          subtext="Unique audience impressions"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Total Clicks"
          value={kpis.totalClicks?.toLocaleString()}
          delta="+22%"
          subtext={`Avg CTR: ${kpis.avgCTR}`}
          icon={MousePointerClick}
          color="sky"
        />
        <StatCard
          title="Conversions"
          value={kpis.totalConversions?.toLocaleString()}
          delta="+28%"
          subtext={`Est. CAC: ${kpis.estimatedCAC}`}
          icon={ShoppingCart}
          color="green"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reach & Clicks Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">Reach & Visitor Clicks Over Time</h3>
              <p className="text-xs text-txt-secondary">Progression across the selected {days}-day window</p>
            </div>
            <span className="text-xs font-bold text-growth-green bg-emerald-50 px-2.5 py-1 rounded-full">
              +24.8% vs Prev Period
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635BFF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#635BFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="reach" stroke="#635BFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReach)" name="Audience Reach" />
                <Area type="monotone" dataKey="clicks" stroke="#22C55E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicks)" name="Website Clicks" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Breakdown Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">Channel Share</h3>
            <p className="text-xs text-txt-secondary">Traffic & leads by marketing channel</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {channelBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => `${val}%`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-surface-border">
            {channelBreakdown.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="font-semibold text-navy-900">{c.name}</span>
                </div>
                <span className="font-bold text-txt-secondary">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">Acquisition & Conversion Funnel</h3>
            <p className="text-xs text-txt-secondary">From first ad impression to verified customer purchase</p>
          </div>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Overall CVR: {kpis.avgConversionRate}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {funnelData.map((f, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-2">
              <span className="text-[10px] font-bold text-txt-muted uppercase tracking-wider">
                Stage 0{idx + 1}
              </span>
              <p className="text-xs font-bold text-navy-900">{f.stage}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-navy-900">{f.count.toLocaleString()}</span>
                <span className="text-xs font-bold text-brand-600">{f.percentage}%</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, f.percentage * 1.5)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
