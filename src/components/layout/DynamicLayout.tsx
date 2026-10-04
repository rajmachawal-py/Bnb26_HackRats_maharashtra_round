'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { CreatorSidebar } from '@/components/layout/CreatorSidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useRole } from '@/lib/roleContext';

export function DynamicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole } = useRole();

  const isLandingPage = pathname === '/';
  const isBrandOnboarding = pathname === '/brand/onboarding';

  if (isLandingPage || isBrandOnboarding) {
    return <>{children}</>;
  }

  const isCreatorPath = pathname.startsWith('/creator');
  const isBrandPath = pathname.startsWith('/brand');
  
  const showCreatorSidebar = isCreatorPath || (!isBrandPath && currentRole === 'creator');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {showCreatorSidebar ? <CreatorSidebar /> : <Sidebar />}
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
