'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Search, Menu, X, ArrowRight, Sparkles, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { user, isAuthenticated, switchAccount } = useAuth();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/#courses' },
    { label: 'Tools', href: '/dashboard/tools' },
    { label: 'Assessment', href: '/dashboard/assessment' },
    { label: 'About', href: '/#testimonials' },
  ];

  const filteredItems = [
    { title: 'Digital Marketing Fundamentals', type: 'Course', href: '/dashboard/courses/digital-marketing-fundamentals' },
    { title: 'Social Media Hook & Caption Generator', type: 'Tool', href: '/dashboard/tools?tool=caption' },
    { title: 'Local SEO Audit & Google Business Profile', type: 'Course', href: '/dashboard/courses/search-engine-optimization-seo' },
    { title: 'Interactive Small Business Growth Assessment', type: 'Audit', href: '/dashboard/assessment' },
    { title: 'Marketing Budget & ROI Calculator', type: 'Tool', href: '/dashboard/tools?tool=budget' },
    { title: 'Campaign Performance Analytics', type: 'Analytics', href: '/dashboard/analytics' },
  ].filter(i => searchQuery.trim() === '' || i.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-surface-border transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-growth-green" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-navy-900 leading-none">
                Market<span className="text-brand-500">Learn</span>
              </span>
              <span className="text-[10px] text-txt-secondary font-medium tracking-wide">
                GROWTH PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search courses and tools"
              className="p-2 text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <div className="h-4 w-px bg-surface-border mx-1" />
                <button
                  onClick={() => switchAccount(user.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                  title="Switch between Demo User and Admin"
                  className="text-[11px] font-medium text-txt-secondary hover:text-navy-900 bg-white border border-surface-border px-2 py-1 rounded-md"
                >
                  Role: <span className="text-brand-600 font-bold">{user.role}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-txt-secondary hover:text-navy-900 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-txt-secondary hover:text-navy-900 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-txt-secondary hover:text-navy-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-txt-secondary hover:bg-surface-subtle hover:text-navy-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-surface-border flex flex-col gap-2.5">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-500 text-white rounded-lg font-semibold text-sm shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Open Dashboard
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-navy-900 text-white rounded-lg font-semibold text-xs"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold text-navy-900 border border-surface-border rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 text-sm font-semibold text-white bg-navy-900 rounded-lg shadow-sm"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-surface-border w-full max-w-xl overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center gap-3">
              <Search className="w-5 h-5 text-txt-secondary" />
              <input
                type="text"
                autoFocus
                placeholder="Search courses, marketing tools, or templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base bg-transparent border-none outline-none placeholder:text-txt-muted text-txt-primary"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs bg-surface-subtle px-2 py-1 rounded text-txt-secondary hover:text-navy-900"
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-subtle group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-navy-900">{item.title}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold">
                      {item.type}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-txt-secondary">
                  No results found for &ldquo;{searchQuery}&rdquo;. Try &ldquo;SEO&rdquo;, &ldquo;Caption&rdquo;, or &ldquo;Analytics&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
