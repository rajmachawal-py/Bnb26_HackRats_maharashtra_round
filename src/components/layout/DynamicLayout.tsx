'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { CreatorSidebar } from '@/components/layout/CreatorSidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useRole } from '@/lib/roleContext';

export function DynamicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole } = useRole();

  // Dynamic Browser Tab Title based on active route and portal
  useEffect(() => {
    const getPageTitle = (path: string): string => {
      // Landing page
      if (path === '/') return 'Collaboration | Creator–Brand Network';

      // Brand Portal routes
      if (path === '/brand/dashboard') return 'Brand Dashboard | Collaboration';
      if (path === '/brand/onboarding') return 'Brand Onboarding | Collaboration';
      if (path === '/brand/discover') return 'Discover Creators | Collaboration';
      if (path.startsWith('/brand/discover/')) return 'Creator Intelligence | Collaboration';
      if (path === '/brand/campaigns') return 'Campaigns | Collaboration';
      if (path === '/brand/campaigns/new') return 'New Campaign Brief | Collaboration';
      if (path.startsWith('/brand/campaigns/')) return 'Workspace | Collaboration';
      if (path === '/brand/settings') return 'Brand Settings | Collaboration';
      if (path === '/brand/support') return 'Help & Support | Collaboration';

      // Creator Studio routes
      if (path === '/creator/dashboard') return 'Creator Dashboard | Collaboration';
      if (path === '/creator/media-kit') return 'My Media Kit | Collaboration';
      if (path === '/creator/offers') return 'Incoming Offers | Collaboration';
      if (path === '/creator/tasks') return 'Tasks & Deliverables | Collaboration';
      if (path === '/creator/earnings') return 'Earnings & Escrow | Collaboration';
      if (path === '/creator/settings') return 'Creator Settings | Collaboration';
      if (path === '/creator/support') return 'Help & Support | Collaboration';

      // Deals & Trust routes
      if (path.startsWith('/deals/verify/')) return 'Verified Deal Audit | Collaboration';
      if (path.startsWith('/deals/')) return 'Deal Room | Collaboration';

      // Fallbacks
      if (path.startsWith('/brand')) return 'Brand Portal | Collaboration';
      if (path.startsWith('/creator')) return 'Creator Studio | Collaboration';
      return 'Collaboration | Creator–Brand Collaboration Network';
    };

    if (typeof document !== 'undefined') {
      document.title = getPageTitle(pathname);
    }
  }, [pathname]);

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
