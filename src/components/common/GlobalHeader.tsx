'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/lib/roleContext';
import { 
  Compass, 
  PlusCircle, 
  FileText, 
  Briefcase, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

export function GlobalHeader() {
  const pathname = usePathname();
  const { currentRole, profile } = useRole();

  const navItems = [
    { label: 'Discover Creators', href: '/discover', icon: <Compass size={16} /> },
    { label: 'Campaign Builder', href: '/campaigns/new', icon: <PlusCircle size={16} /> },
    { label: 'Deal Room', href: '/deals/DEAL-2026-X89B', icon: <FileText size={16} /> },
    { label: 'Workspace Hub', href: '/campaigns/cyberflow/workspace', icon: <Briefcase size={16} /> },
    { label: 'Trust Verification', href: '/deals/verify/DEAL-2026-X89B', icon: <ShieldCheck size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      {/* Top spacing to account for floating RoleSwitcher */}
      <div className="h-16 w-full" />

      <div className="page-container flex items-center justify-between py-3">
        {/* Brand Logo & Platform Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
              <Layers className="text-white w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-violet-300 transition-colors">
                  SYNAPSE<span className="text-cyan-400">OS</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Trust Layer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Creator–Brand Collaboration Network
              </p>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 border border-white/5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600/20 text-violet-200 border border-violet-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-violet-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Active User & Persona Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10">
            {profile.avatar.startsWith('http') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-7 h-7 rounded-full object-cover border border-violet-400/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-sm">
                {profile.avatar}
              </div>
            )}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-white leading-tight">
                {profile.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {profile.badgeLabel}
              </div>
            </div>
          </div>

          {currentRole === 'brand' ? (
            <Link
              href="/campaigns/new"
              className="btn btn-primary btn-sm hidden md:inline-flex"
            >
              <PlusCircle size={14} />
              <span>Create Campaign</span>
            </Link>
          ) : currentRole === 'creator' ? (
            <Link
              href="/campaigns/cyberflow/workspace"
              className="btn btn-primary btn-sm hidden md:inline-flex"
            >
              <Briefcase size={14} />
              <span>Submit Draft</span>
            </Link>
          ) : (
            <Link
              href="/deals/verify/DEAL-2026-X89B"
              className="btn btn-glass btn-sm hidden md:inline-flex"
            >
              <ShieldCheck size={14} />
              <span>Audit State</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
