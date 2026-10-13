'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Edit2,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  FileText
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ContentPlannerPage() {
  const { user, addXP } = useAuth();
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    platform: 'Instagram',
    contentType: 'Carousel',
    scheduledDate: new Date().toISOString().slice(0, 16),
    caption: '',
    hashtags: '',
    status: 'Planned',
  });

  const loadContent = () => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.contentItems) setContentItems(data.contentItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      platform: 'Instagram',
      contentType: 'Carousel',
      scheduledDate: new Date().toISOString().slice(0, 16),
      caption: '',
      hashtags: '',
      status: 'Planned',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      platform: item.platform,
      contentType: item.contentType,
      scheduledDate: new Date(item.scheduledDate).toISOString().slice(0, 16),
      caption: item.caption || '',
      hashtags: item.hashtags || '',
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this scheduled post?')) return;
    try {
      await fetch(`/api/content/${id}`, { method: 'DELETE' });
      setContentItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await fetch(`/api/content/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.item) {
          setContentItems((prev) =>
            prev.map((it) => (it.id === editingItem.id ? data.item : it))
          );
        }
      } else {
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.id || 'user_alex_morgan',
            ...formData,
          }),
        });
        const data = await res.json();
        if (data.item) {
          setContentItems((prev) => [...prev, data.item]);
          addXP(20);
        }
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = contentItems.filter((item) => {
    return statusFilter === 'All' || item.status === statusFilter;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4 text-blue-700" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'Twitter/X':
        return <Twitter className="w-4 h-4 text-sky-500" />;
      default:
        return <FileText className="w-4 h-4 text-brand-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-50 text-growth-green border-emerald-200';
      case 'Planned':
        return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'Draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Social & Multi-Channel Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
            Content Calendar
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Organize upcoming social posts, carousels, and announcements across channels.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Post</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-4">
        {['All', 'Planned', 'Published', 'Draft'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === st
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle border border-surface-border'
            }`}
          >
            {st}
          </button>
        ))}
        <span className="text-xs text-txt-muted ml-auto hidden sm:block">
          {filteredItems.length} posts
        </span>
      </div>

      {/* Posts Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white rounded-3xl border border-surface-border animate-pulse p-6" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const dateObj = new Date(item.scheduledDate);
            const dateFormatted = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center">
                        {getPlatformIcon(item.platform)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-navy-900 block">{item.platform}</span>
                        <span className="text-[10px] text-txt-secondary uppercase tracking-wider">{item.contentType}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-navy-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-txt-secondary line-clamp-3 leading-relaxed mb-3">
                    {item.caption || 'No caption entered.'}
                  </p>

                  {item.hashtags && (
                    <p className="text-[11px] text-brand-600 font-mono truncate mb-4">
                      {item.hashtags}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-txt-secondary font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dateFormatted}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Post"
                      className="p-1.5 text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete Post"
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
          <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900">No content scheduled</h3>
          <p className="text-xs text-txt-secondary mt-1">
            Click &ldquo;Schedule New Post&rdquo; to plan your first campaign piece.
          </p>
        </div>
      )}

      {/* Add / Edit Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-border space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-base font-bold text-navy-900">
                {editingItem ? 'Edit Scheduled Post' : 'Schedule New Content'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-txt-secondary hover:text-navy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Post Title / Concept</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Roasting Ethiopian Beans behind the scenes"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    <option>LinkedIn</option>
                    <option>Facebook</option>
                    <option>Twitter/X</option>
                    <option>TikTok</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Content Type</label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  >
                    <option>Carousel</option>
                    <option>Reel/Video</option>
                    <option>Single Image</option>
                    <option>Story</option>
                    <option>Article</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                  >
                    <option>Planned</option>
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Caption</label>
                <textarea
                  rows={3}
                  placeholder="Craft your hook and value text here..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full p-3 rounded-xl border border-surface-border text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">Hashtags</label>
                <input
                  type="text"
                  placeholder="#Coffee #SmallBusiness #LocalEats"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-navy-900"
                />
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
                  {editingItem ? 'Save Changes' : 'Schedule Post (+20 XP)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
