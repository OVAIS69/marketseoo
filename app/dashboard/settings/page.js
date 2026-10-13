'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Building2, User, Globe, Target, DollarSign, Save, Check, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { user, switchAccount } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex@marketlearn.dev',
    businessName: user?.businessProfile?.businessName || 'Artisan Roast Coffee Co.',
    industry: user?.businessProfile?.industry || 'Retail & Specialty Food',
    website: user?.businessProfile?.website || 'https://artisanroast.example.com',
    primaryGoal: user?.businessProfile?.primaryGoal || 'Attract More Local Foot Traffic',
    monthlyBudget: user?.businessProfile?.monthlyBudget || 850,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Workspace Settings
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
          Business Profile & Account
        </h2>
        <p className="text-xs sm:text-sm text-txt-secondary mt-1">
          Manage your organization information, growth parameters, and demo switches.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-surface-border pb-4">
            <h3 className="text-base font-bold text-navy-900">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-slate-400 bg-surface-subtle"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-surface-border pb-4">
            <h3 className="text-base font-bold text-navy-900">Business Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                >
                  <option>Retail & Specialty Food</option>
                  <option>Professional & Local Services</option>
                  <option>Health, Beauty & Fitness</option>
                  <option>E-commerce Brand</option>
                  <option>Art, Craft & Design</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Monthly Marketing Budget ($)</label>
                <input
                  type="number"
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-txt-secondary font-medium">Quick Role Switch:</span>
              <button
                type="button"
                onClick={() => switchAccount(user?.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                Switch to {user?.role === 'ADMIN' ? 'User (Alex)' : 'Admin (Sarah)'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs font-bold text-growth-green flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  Settings Saved!
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
