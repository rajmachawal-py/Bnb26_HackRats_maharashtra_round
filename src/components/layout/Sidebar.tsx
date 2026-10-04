'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBrandProfile } from '@/lib/brandContext';
import { 
  LayoutDashboard, 
  Search, 
  Megaphone, 
  Handshake, 
  Briefcase,
  CheckCircle,
  BarChart3,
  Settings,
  HelpCircle,
  Layers
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { brandProfile } = useBrandProfile();

  const mainNav = [
    { label: 'Dashboard', href: '/brand/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Discover Creators', href: '/brand/discover', icon: <Search size={18} /> },
    { label: 'Campaigns', href: '/brand/campaigns', icon: <Megaphone size={18} /> },
    { label: 'Deal Room', href: '/deals/DEAL-2026-X89B', icon: <Handshake size={18} /> },
    { label: 'Workspace', href: '/brand/campaigns/campaign-cyberflow-launch', icon: <Briefcase size={18} /> },
  ];

  const managementNav = [
    { label: 'Verification', href: '/deals/verify/DEAL-2026-X89B', icon: <CheckCircle size={18} /> },
    { label: 'Analytics', href: '#', icon: <BarChart3 size={18} /> },
  ];

  const systemNav = [
    { label: 'Settings', href: '/brand/settings', icon: <Settings size={18} /> },
    { label: 'Help & Support', href: '/brand/support', icon: <HelpCircle size={18} /> },
  ];

  const renderNavItems = (items: typeof mainNav) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={isActive ? 'text-emerald-100' : 'text-slate-500'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="w-[260px] bg-slate-900 h-screen fixed left-0 top-0 border-r border-slate-800 flex flex-col z-20 shadow-2xl shadow-slate-900/20 overflow-y-auto">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/brand/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Layers size={20} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            BrandFlow
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        <div>
          <h3 className="px-3 mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Main</h3>
          {renderNavItems(mainNav)}
        </div>

        <div>
          <h3 className="px-3 mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Management</h3>
          {renderNavItems(managementNav)}
        </div>

        <div>
          <h3 className="px-3 mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">System</h3>
          {renderNavItems(systemNav)}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <Link 
          href="/brand/onboarding" 
          title="Click to view or edit Brand Profile"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-300">
              {brandProfile?.companyName
                ? brandProfile.companyName
                    .split(' ')
                    .map((w) => w[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'TB'}
            </span>
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
              {brandProfile?.companyName || 'TechBrand Inc.'}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {brandProfile?.contactName || 'Brand Marketer'}
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
