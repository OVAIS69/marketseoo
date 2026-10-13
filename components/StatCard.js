import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, delta, subtext, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-brand-50 text-brand-600',
    },
    green: {
      bg: 'bg-emerald-50 text-emerald-600',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
    },
    sky: {
      bg: 'bg-sky-50 text-sky-600',
    },
  };

  const isPositive = delta && delta.startsWith('+');

  return (
    <div className="bg-white rounded-2xl p-5 border border-surface-border shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-txt-secondary uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[color]?.bg || 'bg-brand-50 text-brand-600'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          {value}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${
              isPositive ? 'bg-growth-green/10 text-growth-green' : 'bg-red-50 text-red-600'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-txt-muted">
          {subtext}
        </p>
      )}
    </div>
  );
}
