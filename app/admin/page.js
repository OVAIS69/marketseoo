'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  Award,
  Trash2,
  Plus,
  TrendingUp,
  Shield,
  Search,
  CheckCircle2,
  Calendar,
  X,
  FileText
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, courses, users
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    duration: '2.0 Hours',
    description: '',
  });

  const loadAll = () => {
    Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()),
      fetch('/api/admin/users').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
    ])
      .then(([statsData, usersData, coursesData]) => {
        if (statsData.stats) setStats(statsData.stats);
        if (usersData.users) setUsers(usersData.users);
        if (coursesData.courses) setCourses(coursesData.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm),
      });
      const data = await res.json();
      if (data.course) {
        setCourses((prev) => [...prev, data.course]);
        setCourseModalOpen(false);
        setCourseForm({
          title: '',
          slug: '',
          category: 'Fundamentals',
          difficulty: 'Beginner',
          duration: '2.0 Hours',
          description: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course and all its lessons?')) return;
    try {
      await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            Platform Administration
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Admin Management Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage course curriculum, monitor registered small businesses, and audit system performance.
          </p>
        </div>

        {activeTab === 'courses' && (
          <button
            onClick={() => setCourseModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'overview', label: 'Platform Overview' },
          { id: 'courses', label: `Courses (${courses.length})` },
          { id: 'users', label: `Learner Businesses (${users.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Users</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-2">{stats?.totalUsers || 2}</p>
              <p className="text-[11px] text-purple-400 mt-1">Active small business accounts</p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Active Courses</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-2">{stats?.totalCourses || 6}</p>
              <p className="text-[11px] text-growth-green mt-1">{stats?.totalLessons || 12} live lessons</p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Quiz Attempts</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-2">{stats?.totalAttempts || 3}</p>
              <p className="text-[11px] text-sky-400 mt-1">Avg 84% passing score</p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Certificates Issued</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-2">{stats?.totalCertificates || 1}</p>
              <p className="text-[11px] text-amber-400 mt-1">Verified credentials</p>
            </div>
          </div>

          {/* Recent Learners */}
          <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-white">Recent Learner Registrations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                    <th className="pb-3">Learner Name</th>
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">Industry</th>
                    <th className="pb-3">Growth Score</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {users.slice(0, 5).map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40">
                      <td className="py-3 font-bold text-white">{u.name}</td>
                      <td className="py-3">{u.businessName}</td>
                      <td className="py-3 text-slate-400">{u.industry}</td>
                      <td className="py-3 font-bold text-purple-400">{u.growthScore}/100</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div
                key={c.id}
                className="bg-slate-800/70 p-6 rounded-3xl border border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      {c.category}
                    </span>
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="p-1 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{c.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">{c.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span>{c.difficulty} • {c.duration}</span>
                  <span className="text-purple-400 font-bold">{c.lessons?.length || 3} Lessons</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: USERS */}
      {activeTab === 'users' && (
        <div className="bg-slate-800/70 rounded-3xl p-6 border border-slate-700 space-y-4">
          <h3 className="text-base font-bold text-white">All Small Business Learners</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                  <th className="pb-3">User & Email</th>
                  <th className="pb-3">Business Profile</th>
                  <th className="pb-3">Level & XP</th>
                  <th className="pb-3">Growth Score</th>
                  <th className="pb-3">Lessons Done</th>
                  <th className="pb-3">Certificates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="py-3">
                      <p className="font-bold text-white">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold">{u.businessName}</p>
                      <p className="text-[11px] text-slate-400">{u.industry}</p>
                    </td>
                    <td className="py-3">
                      <span className="text-white font-bold">{u.level}</span>
                      <p className="text-[11px] text-purple-400">{u.xp} XP</p>
                    </td>
                    <td className="py-3 font-black text-growth-green">{u.growthScore}/100</td>
                    <td className="py-3 font-bold">{u.lessonsCompleted}</td>
                    <td className="py-3 font-bold">{u.certificatesCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold">Create New Course Module</h3>
              <button
                onClick={() => setCourseModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Email Marketing & Newsletter Automation"
                  value={courseForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setCourseForm({ ...courseForm, title, slug });
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Course URL Slug</label>
                <input
                  type="text"
                  required
                  value={courseForm.slug}
                  onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option>Fundamentals</option>
                    <option>Social</option>
                    <option>SEO</option>
                    <option>Content</option>
                    <option>Advertising</option>
                    <option>Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={courseForm.difficulty}
                    onChange={(e) => setCourseForm({ ...courseForm, difficulty: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Estimated Duration</label>
                <input
                  type="text"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Course Summary</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
