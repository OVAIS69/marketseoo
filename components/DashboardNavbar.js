'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, Zap, Sparkles, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardNavbar({ setMobileOpen, pageTitle = 'Dashboard' }) {
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-surface-border px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-navy-900 leading-tight">
            {pageTitle}
          </h1>
          <p className="text-xs text-txt-secondary hidden sm:block">
            {user?.businessProfile?.businessName || 'MarketLearn Workspace'}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* XP counter badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
          <span>{user?.xp || 420} XP</span>
        </div>

        {/* Level badge */}
        <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-growth-green/10 text-growth-green border border-growth-green/20 text-xs font-bold">
          <Sparkles className="w-3 h-3" />
          {user?.level || 'Learner'}
        </span>

        {/* Notification toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="p-2 text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle rounded-lg relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-surface-border p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                <span className="text-xs font-bold text-navy-900">Notifications</span>
                <span className="text-[11px] text-brand-600 font-medium">Mark all read</span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-brand-50/60 text-navy-900">
                  <p className="font-semibold text-brand-700">Digital Assessment Ready</p>
                  <p className="text-txt-secondary mt-0.5 text-[11px]">Your SEO score is 55%. Complete the Google Business Profile module to improve visibility.</p>
                </div>
                <div className="p-2 rounded-lg bg-surface-subtle text-navy-900">
                  <p className="font-semibold">Badge Earned: Content Creator</p>
                  <p className="text-txt-secondary mt-0.5 text-[11px]">+75 XP has been added to your profile.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Public Site */}
        <Link
          href="/"
          target="_blank"
          title="Open Landing Page"
          className="p-2 text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle rounded-lg hidden sm:flex items-center"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
