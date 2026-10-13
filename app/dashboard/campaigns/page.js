'use client';

import React, { useState, useEffect } from 'react';
import {
  Send,
  Plus,
  Play,
  Pause,
  Trash2,
  DollarSign,
  Users,
  MousePointerClick,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  X,
  Target
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CampaignManagerPage() {
  const { user, addXP } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Instagram',
    objective: 'Brand Awareness & Local Foot Traffic',
    targetAudience: 'Locals within 5 miles interested in specialty coffee',
    budget: '350',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    status: 'Active',
  });

  const loadCampaigns = () => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'user_alex_morgan',
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.campaign) {
        setCampaigns((prev) => [data.campaign, ...prev]);
        addXP(30);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (campaign) => {
    const nextStatus = campaign.status === 'Active' ? 'Paused' : 'Active';
    try {
      await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaign.id ? { ...c, status: nextStatus } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Paid & Organic Promotion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
            Campaign Manager
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Plan, launch, and monitor small business ad campaigns across Google, Meta, and email.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* Campaign Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-white rounded-3xl border border-surface-border animate-pulse p-6" />
          ))}
        </div>
      ) : campaigns.length > 0 ? (
        <div className="space-y-4">
          {campaigns.map((camp) => {
            const startFormatted = new Date(camp.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            const endFormatted = new Date(camp.endDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            const isActive = camp.status === 'Active';

            return (
              <div
                key={camp.id}
                className="bg-white rounded-3xl p-6 border border-surface-border shadow-subtle hover:shadow-card transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
                        {camp.platform}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-emerald-50 text-growth-green border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        ● {camp.status}
                      </span>
                      <span className="text-xs text-txt-secondary flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {startFormatted} – {endFormatted}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-navy-900 leading-snug">
                      {camp.name}
                    </h3>

                    <p className="text-xs text-txt-secondary">
                      <strong className="text-navy-900 font-medium">Target:</strong> {camp.targetAudience}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md pt-2 space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-txt-secondary">
                        <span>Campaign Duration Progress</span>
                        <span>{camp.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full"
                          style={{ width: `${camp.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 lg:py-0 border-y lg:border-y-0 lg:border-l border-surface-border lg:pl-6">
                    <div>
                      <span className="text-[11px] text-txt-secondary block">Budget</span>
                      <span className="text-sm font-extrabold text-navy-900 mt-0.5 block">
                        ${camp.budget.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-txt-secondary block">Reach</span>
                      <span className="text-sm font-extrabold text-navy-900 mt-0.5 block">
                        {camp.reach.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-txt-secondary block">Clicks</span>
                      <span className="text-sm font-extrabold text-navy-900 mt-0.5 block">
                        {camp.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-txt-secondary block">Conversions</span>
                      <span className="text-sm font-extrabold text-growth-green mt-0.5 block">
                        {camp.conversions.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 lg:flex-col lg:justify-center">
                    <button
                      onClick={() => handleToggleStatus(camp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all w-full justify-center ${
                        isActive
                          ? 'border border-surface-border text-navy-900 hover:bg-surface-subtle'
                          : 'bg-navy-900 text-white hover:bg-navy-800'
                      }`}
                    >
                      {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isActive ? 'Pause' : 'Activate'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(camp.id)}
                      title="Delete Campaign"
                      className="p-1.5 text-txt-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-surface-border">
          <Send className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900">No campaigns created yet</h3>
          <p className="text-xs text-txt-secondary mt-1">
            Launch your first local promotion or awareness campaign.
          </p>
        </div>
      )}

      {/* Create Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-border space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-base font-bold text-navy-900">Create New Marketing Campaign</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-txt-secondary hover:text-navy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fall Coffee Tasting & Bean Sale"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  >
                    <option>Instagram</option>
                    <option>Google Ads</option>
                    <option>Facebook</option>
                    <option>LinkedIn</option>
                    <option>TikTok</option>
                    <option>Email Newsletter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Campaign Budget ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="350"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Primary Objective</label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                >
                  <option>Brand Awareness & Local Foot Traffic</option>
                  <option>High-Intent In-Store Visits</option>
                  <option>Direct E-Commerce Orders</option>
                  <option>Lead Generation & Consultations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Target Audience Description</label>
                <input
                  type="text"
                  placeholder="e.g. Coffee lovers within 5 miles of downtown"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold text-navy-900 hover:bg-surface-subtle"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-md"
                >
                  Launch Campaign (+30 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
