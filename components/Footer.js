import React from 'react';
import Link from 'next/link';
import { TrendingUp, Twitter, Linkedin, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-sm">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Market<span className="text-brand-300">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Learn. Apply. Grow. The practical digital marketing education and growth platform built specifically for small-business owners.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="MarketLearn Twitter"
                className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-500/20 hover:text-brand-300 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="MarketLearn LinkedIn"
                className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-500/20 hover:text-brand-300 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="MarketLearn Instagram"
                className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-500/20 hover:text-brand-300 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="MarketLearn YouTube"
                className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-500/20 hover:text-brand-300 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/dashboard/courses" className="hover:text-white transition-colors">Courses</Link>
              </li>
              <li>
                <Link href="/dashboard/tools" className="hover:text-white transition-colors">Practical Tools</Link>
              </li>
              <li>
                <Link href="/dashboard/assessment" className="hover:text-white transition-colors">Growth Assessment</Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link>
              </li>
              <li>
                <Link href="/dashboard/certificate" className="hover:text-white transition-colors">Certificates</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/#courses" className="hover:text-white transition-colors">Small Biz Guides</Link>
              </li>
              <li>
                <Link href="/dashboard/tools?tool=plan" className="hover:text-white transition-colors">Marketing Plan Templates</Link>
              </li>
              <li>
                <Link href="/dashboard/tools?tool=caption" className="hover:text-white transition-colors">Social Captions</Link>
              </li>
              <li>
                <Link href="/dashboard/assessment" className="hover:text-white transition-colors">Marketing FAQs</Link>
              </li>
              <li>
                <Link href="/dashboard/achievements" className="hover:text-white transition-colors">XP & Badges</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/#testimonials" className="hover:text-white transition-colors">About MarketLearn</Link>
              </li>
              <li>
                <a href="mailto:support@marketlearn.dev" className="hover:text-white transition-colors">Contact Support</a>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-growth-green text-xs font-semibold mt-1">
                  ● Systems Operational
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© {new Date().getFullYear()} MarketLearn Inc. Built for small business growth.</p>
          <div className="flex items-center gap-6">
            <span>Inter & Plus Jakarta Sans typography</span>
            <span>SQLite & Prisma Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
