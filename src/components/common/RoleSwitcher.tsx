'use client';

import React from 'react';
import { useRole, DemoRole } from '@/lib/roleContext';
import { Building2, Sparkles, UserCheck, Eye, ShieldCheck } from 'lucide-react';

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
      icon: <Building2 size={15} />,
      desc: 'TechBrand Inc. (Create Brief & Review)',
      badge: 'Brand OS',
    },
    {
      id: 'creator',
      label: 'Claimed Creator',
      icon: <UserCheck size={15} />,
      desc: 'Alex Vance (Accept Deal & AI Compliance)',
      badge: 'Creator OS',
    },
    {
      id: 'unclaimed',
      label: 'Unclaimed Profile',
      icon: <Eye size={15} />,
      desc: 'Marques B. (Public Wikipedia & Manager Route)',
      badge: 'Cold-Start',
    },
    {
      id: 'verify',
      label: 'Deal Verification',
      icon: <ShieldCheck size={15} />,
      desc: 'DEAL-2026-X89B (Audit & Cryptographic QR)',
      badge: 'Trust Layer',
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-violet-500/30 shadow-2xl shadow-violet-950/60 max-w-[96vw] overflow-x-auto">
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 border-r border-white/10 text-xs font-semibold text-violet-300">
        <Sparkles size={13} className="text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>DEMO DOCK</span>
      </div>

      <div className="flex items-center gap-1">
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-600/40 border border-violet-400/40 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title={r.desc}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>
                {r.icon}
              </span>
              <span className="font-semibold">{r.label}</span>
              <span
                className={`hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/5 text-slate-500'
                }`}
              >
                {r.badge}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center gap-2 pl-2 pr-2 border-l border-white/10 text-[11px] text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-slate-300">{profile.name}</span>
      </div>
    </div>
  );
}
