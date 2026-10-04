'use client';

import React from 'react';
import { useRole, DemoRole } from '@/lib/roleContext';
import { Building2, UserCheck, Eye, ShieldCheck, Cog } from 'lucide-react';

export function RoleSwitcher() {
  const { currentRole, setRole, profile } = useRole();

  const roles: Array<{
    id: DemoRole;
    label: string;
    icon: React.ReactNode;
    desc: string;
    badge: string;
  }> = [
    {
      id: 'brand',
      label: 'Brand Mode',
      icon: <Building2 size={14} />,
      desc: 'TechBrand Inc. (Create Brief & Review)',
      badge: 'Brand OS',
    },
    {
      id: 'creator',
      label: 'Claimed Creator',
      icon: <UserCheck size={14} />,
      desc: 'Alex Vance (Accept Deal & AI Compliance)',
      badge: 'Creator OS',
    },
    {
      id: 'unclaimed',
      label: 'Unclaimed Profile',
      icon: <Eye size={14} />,
      desc: 'Marques B. (Public Wikipedia & Manager Route)',
      badge: 'Cold-Start',
    },
    {
      id: 'verify',
      label: 'Deal Verification',
      icon: <ShieldCheck size={14} />,
      desc: 'DEAL-2026-X89B (Audit & Cryptographic QR)',
      badge: 'Trust Layer',
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200 shadow-xl max-w-[96vw] overflow-x-auto text-sm">
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 border-r border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
        <Cog size={14} className="text-primary-500" />
        <span>Demo Dock</span>
      </div>

      <div className="flex items-center gap-1">
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={r.desc}
            >
              <span className={isActive ? 'text-slate-300' : 'text-slate-400'}>
                {r.icon}
              </span>
              <span className="whitespace-nowrap">{r.label}</span>
              <span
                className={`hidden md:inline-block whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isActive ? 'bg-slate-800 text-primary-300' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {r.badge}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center gap-2 pl-3 pr-4 border-l border-slate-100">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-slate-700 whitespace-nowrap">{profile.name}</span>
      </div>
    </div>
  );
}
