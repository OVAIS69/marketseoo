'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, ArrowRight, Lock, Mail, Shield, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('alex@marketlearn.dev');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        login(email, password);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      // Local fallback
      login(email, password);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (userEmail) => {
    login(userEmail, 'password123');
    if (userEmail.includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-growth-green" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-navy-900">
            Market<span className="text-brand-500">Learn</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-txt-secondary">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500">
            Get started free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-3xl border border-surface-border space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                  placeholder="alex@marketlearn.dev"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-navy-900">
                  Password
                </label>
                <span className="text-[11px] text-brand-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-navy-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>{loading ? 'Signing in...' : 'Sign in to Workspace'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-4 border-t border-surface-border space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-txt-muted text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex@marketlearn.dev')}
                className="p-2.5 rounded-xl border border-surface-border hover:bg-brand-50/50 hover:border-brand-200 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-navy-900 font-bold text-xs">
                  <User className="w-3.5 h-3.5 text-brand-500" />
                  <span>Learner</span>
                </div>
                <p className="text-[10px] text-txt-secondary mt-0.5 truncate">Alex Morgan (Coffee Co.)</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@marketlearn.dev')}
                className="p-2.5 rounded-xl border border-surface-border hover:bg-purple-50/50 hover:border-purple-200 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-navy-900 font-bold text-xs">
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
                  <span>Admin</span>
                </div>
                <p className="text-[10px] text-txt-secondary mt-0.5 truncate">Sarah Jenkins (Full CRM)</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
