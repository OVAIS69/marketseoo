'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, LayoutDashboard, Users, BookOpen, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, switchAccount } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="h-16 bg-navy-950 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Market<span className="text-purple-400">Learn</span>{' '}
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                ADMIN
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learner Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Logged in as {user?.name || 'Sarah Jenkins'}</span>
            <button
              onClick={() => switchAccount('USER')}
              className="text-xs text-purple-400 hover:underline"
            >
              (Switch to Learner)
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
