'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TrendingUp, ShieldCheck, CheckCircle2, ArrowLeft, Calendar, User, Award, ExternalLink } from 'lucide-react';

export default function CertificateVerificationPage() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/certificates?code=${code}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.certificate) setData(json.certificate);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [code]);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full space-y-6">
        {/* Brand */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white">
              <TrendingUp className="w-4 h-4 text-growth-green" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-navy-900">
              Market<span className="text-brand-500">Learn</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            Official Credential Verification
          </h2>
          <p className="text-xs text-txt-secondary mt-1">
            Validating authenticity against the MarketLearn cryptographic registry
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-card space-y-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
            </div>
          ) : data ? (
            <>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-growth-green text-white flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-growth-green uppercase tracking-wider">
                    Verified Authentic Certificate
                  </h4>
                  <p className="text-xs text-slate-700 mt-0.5">
                    This credential was officially issued by MarketLearn Education.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between py-2 border-b border-surface-border">
                  <span className="text-txt-secondary">Certificate ID:</span>
                  <span className="font-mono font-bold text-navy-900">{data.certificateCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-surface-border">
                  <span className="text-txt-secondary">Issued To:</span>
                  <span className="font-bold text-navy-900">{data.issuedToName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-surface-border">
                  <span className="text-txt-secondary">Program Completed:</span>
                  <span className="font-bold text-navy-900">{data.title}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-surface-border">
                  <span className="text-txt-secondary">Date of Issuance:</span>
                  <span className="font-bold text-navy-900">
                    {new Date(data.issueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-surface-border">
                  <span className="text-txt-secondary">Score Achieved:</span>
                  <span className="font-bold text-growth-green">{data.scoreAchieved}% (Pass with Distinction)</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm font-bold text-navy-900">Record not found for &ldquo;{code}&rdquo;</p>
              <p className="text-xs text-txt-secondary mt-1">Please check the certificate identifier and try again.</p>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to MarketLearn Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
