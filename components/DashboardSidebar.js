'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Sparkles,
  Wrench,
  Calendar,
  Send,
  BarChart3,
  Award,
  FileCheck,
  Settings,
  Shield,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardSidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const { user, logout, switchAccount } = useAuth();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Learning', href: '/dashboard/learning', icon: GraduationCap },
    { label: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { label: 'Assessment', href: '/dashboard/assessment', icon: Sparkles },
    { label: 'Marketing Tools', href: '/dashboard/tools', icon: Wrench },
    { label: 'Content Planner', href: '/dashboard/content-planner', icon: Calendar },
    { label: 'Campaigns', href: '/dashboard/campaigns', icon: Send },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Achievements', href: '/dashboard/achievements', icon: Award },
    { label: 'Certificate', href: '/dashboard/certificate', icon: FileCheck },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-surface-border flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-surface-border">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white shadow-sm">
              <TrendingUp className="w-4 h-4 text-growth-green" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-navy-900">
              Market<span className="text-brand-500">Learn</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
            PRO
          </span>
        </div>

        {/* Business Badge */}
        {user?.businessProfile && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-surface-subtle border border-surface-border">
            <p className="text-[11px] font-semibold text-txt-secondary uppercase tracking-wider">Active Workspace</p>
            <p className="text-xs font-bold text-navy-900 truncate mt-0.5">{user.businessProfile.businessName}</p>
            <div className="flex items-center justify-between mt-1 text-[11px] text-txt-secondary">
              <span>Growth Score</span>
              <span className="font-bold text-brand-600">{user.businessProfile.growthScore}/100</span>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
              </Link>
            );
          })}

          {/* Admin shortcut if applicable */}
          {user?.role === 'ADMIN' && (
            <div className="pt-2">
              <div className="px-3 pb-1 text-[10px] font-bold text-txt-secondary uppercase tracking-wider">
                Administration
              </div>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  pathname.startsWith('/admin')
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Shield className="w-4 h-4 text-purple-500" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer profile & actions */}
        <div className="p-3 border-t border-surface-border bg-surface-subtle/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-surface-border">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-100 flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-navy-900 truncate">{user?.name || 'Alex Morgan'}</p>
                <p className="text-[10px] text-txt-secondary capitalize">{user?.level || 'Learner'} • {user?.xp || 420} XP</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="p-1.5 text-txt-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <button
              onClick={() => switchAccount(user?.role === 'ADMIN' ? 'USER' : 'ADMIN')}
              className="text-[10px] text-brand-600 hover:underline font-medium"
            >
              Switch to {user?.role === 'ADMIN' ? 'Learner (Alex)' : 'Admin (Sarah)'}
            </button>
            <span className="text-[10px] text-txt-secondary">{user?.role}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
