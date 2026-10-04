'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={isActive ? 'text-primary-600' : 'text-slate-400'}>
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
    <aside className="w-[260px] h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href="/brand/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Layers className="text-white w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg text-slate-900">
            CreatorFlow
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        <div>
          <h3 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Main</h3>
          {renderNavItems(mainNav)}
        </div>

        <div>
          <h3 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</h3>
          {renderNavItems(managementNav)}
        </div>

        <div>
          <h3 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">System</h3>
          {renderNavItems(systemNav)}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-slate-600">TB</span>
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-slate-900 truncate">TechBrand Inc.</div>
            <div className="text-xs text-slate-500 truncate">Brand Marketer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
