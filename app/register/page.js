'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, ArrowRight, Building2, User, Globe, Target, DollarSign, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    industry: 'Retail & Specialty Goods',
    website: '',
    stage: 'Growing',
    primaryGoal: 'Attract More Local Customers',
    monthlyBudget: '500',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in your name, email, and password.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        register(formData);
        router.push('/dashboard/assessment');
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      // Local fallback
      register(formData);
      router.push('/dashboard/assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-growth-green" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-navy-900">
            Market<span className="text-brand-500">Learn</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          {step === 1 ? 'Start Your Growth Journey' : 'Tell Us About Your Business'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-txt-secondary">
          Step {step} of 2 — {step === 1 ? 'Account Credentials' : 'Business Profile'}
        </p>

        {/* Progress indicator */}
        <div className="max-w-xs mx-auto mt-4 flex items-center gap-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-slate-200'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-slate-200'}`} />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-3xl border border-surface-border">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Work / Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@yourbusiness.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Continue to Business Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-center text-xs text-txt-secondary pt-2">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-brand-600 hover:underline">
                  Log in here
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Business or Brand Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="e.g. Artisan Roast Coffee Co."
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Industry / Category
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
                  >
                    <option>Retail & Specialty Goods</option>
                    <option>Food, Beverage & Cafe</option>
                    <option>Professional & Local Services</option>
                    <option>Health, Beauty & Fitness</option>
                    <option>E-commerce Brand</option>
                    <option>Art, Craft & Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Stage
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
                  >
                    <option>Startup (Under 1 year)</option>
                    <option>Growing (1-3 years)</option>
                    <option>Established (3+ years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Primary 90-Day Growth Goal
                </label>
                <select
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
                >
                  <option>Attract More Local Foot Traffic</option>
                  <option>Increase Online Store Orders & Subscriptions</option>
                  <option>Generate Qualified Service Leads & Bookings</option>
                  <option>Build Strong Social Media Brand Awareness</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Website or Social Link (optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://mybusiness.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Monthly Marketing Budget ($)
                  </label>
                  <input
                    type="number"
                    name="monthlyBudget"
                    placeholder="500"
                    value={formData.monthlyBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 px-4 rounded-xl border border-surface-border text-navy-900 font-bold text-xs hover:bg-surface-subtle transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{loading ? 'Creating...' : 'Complete & Take Audit'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
