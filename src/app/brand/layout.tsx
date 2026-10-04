'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === '/brand/onboarding';

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-[260px]">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="page-container py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
