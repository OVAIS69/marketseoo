'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Award,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';

export default function CertificatePage() {
  const { user } = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => {
        if (data.certificates && data.certificates.length > 0) {
          setCertificate(data.certificates[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const certCode = certificate?.certificateCode || 'ML-2026-8942-GROWTH';
  const issueDateFormatted = certificate?.issueDate
    ? new Date(certificate.issueDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'September 26, 2026';

  const recipientName = user?.name || certificate?.issuedToName || 'Alex Morgan';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verify/${certCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Verified Credential
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
            Certificate of Completion
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Official verifiable accreditation for completing the MarketLearn Small Business Growth Program.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface-subtle text-navy-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Verification Link Copied!' : 'Share Link'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Visual Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border-4 border-slate-200/80 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
        {/* Ornate corner accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-brand-500/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-brand-500/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-brand-500/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-brand-500/40 rounded-br-xl pointer-events-none" />

        {/* Certificate Content */}
        <div className="text-center space-y-6 relative z-10 py-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white shadow-sm">
              <TrendingUp className="w-4 h-4 text-growth-green" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-navy-900">
              Market<span className="text-brand-500">Learn</span>
            </span>
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-txt-secondary block">
            Certificate of Achievement
          </span>

          <p className="text-xs text-txt-secondary uppercase tracking-widest">
            This is proudly awarded to
          </p>

          {/* Recipient Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight font-serif italic py-2">
            {recipientName}
          </h1>

          <p className="text-xs sm:text-sm text-txt-secondary max-w-xl mx-auto leading-relaxed">
            for successfully completing the rigorous curriculum in{' '}
            <strong className="text-navy-900 font-semibold">
              Digital Marketing Fundamentals, Local Search Engine Optimization (SEO), Paid Demand Generation, and Growth Analytics
            </strong>{' '}
            tailored for small enterprise operations.
          </p>

          {/* Seal and Signatures Row */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 items-end justify-items-center">
            {/* Signature 1 */}
            <div className="space-y-1 text-center w-48">
              <div className="font-serif italic text-lg text-slate-700 border-b border-slate-300 pb-1">
                Sarah Jenkins
              </div>
              <p className="text-[10px] uppercase font-bold text-txt-secondary tracking-wider">
                Head of Education, MarketLearn
              </p>
            </div>

            {/* Central Gold Seal Badge */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-dashed border-amber-800/40 flex flex-col items-center justify-center text-navy-950 p-2 text-center">
                <ShieldCheck className="w-6 h-6 text-navy-900 mb-0.5" />
                <span className="text-[8px] font-black uppercase tracking-wider leading-none">
                  Verified
                </span>
                <span className="text-[7px] font-bold text-navy-800 leading-tight">
                  ACCREDITED
                </span>
              </div>
            </div>

            {/* Date & ID */}
            <div className="space-y-1 text-center w-48">
              <div className="text-xs font-bold text-navy-900 border-b border-slate-300 pb-1">
                {issueDateFormatted}
              </div>
              <p className="text-[10px] uppercase font-bold text-txt-secondary tracking-wider">
                Date of Issuance
              </p>
            </div>
          </div>

          {/* Verification Bar & QR Placeholder */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-secondary">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-slate-600">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider font-semibold block text-txt-muted">Certificate ID</span>
                <span className="font-mono text-xs font-bold text-navy-900">{certCode}</span>
              </div>
            </div>

            <Link
              href={`/verify/${certCode}`}
              target="_blank"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>Public Verification Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
