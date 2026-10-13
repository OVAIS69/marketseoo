'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardNavbar from '@/components/DashboardNavbar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Compute title based on route
  const getPageTitle = (path) => {
    if (path === '/dashboard') return 'Overview & Learning';
    if (path.startsWith('/dashboard/courses')) return 'Digital Marketing Courses';
    if (path.startsWith('/dashboard/learning')) return 'My Learning Path';
    if (path.startsWith('/dashboard/assessment')) return 'Digital Marketing Assessment';
    if (path.startsWith('/dashboard/tools')) return 'Marketing Tools & Generators';
    if (path.startsWith('/dashboard/content-planner')) return 'Social Content Planner';
    if (path.startsWith('/dashboard/campaigns')) return 'Campaign Manager';
    if (path.startsWith('/dashboard/analytics')) return 'Performance Analytics';
    if (path.startsWith('/dashboard/achievements')) return 'Achievements & Badges';
    if (path.startsWith('/dashboard/certificate')) return 'Certificates & Credentials';
    if (path.startsWith('/dashboard/settings')) return 'Settings & Business Profile';
    return 'Workspace Dashboard';
  };

  return (
    <div className="min-h-screen bg-surface-bg flex">
      {/* Sidebar */}
      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <DashboardNavbar setMobileOpen={setMobileOpen} pageTitle={getPageTitle(pathname)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
