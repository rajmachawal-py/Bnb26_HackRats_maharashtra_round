import React from 'react';
import Link from 'next/link';
import { Building2, UserCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            CreatorFlow is Live
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            The collaborative OS for <span className="text-primary-600">brands</span> and <span className="text-emerald-500">creators</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Manage campaigns, secure escrow payments, and automate compliance checking in one unified ecosystem. Choose your portal below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {/* Brand Portal Card */}
          <Link href="/brand/dashboard" className="saas-card p-8 flex flex-col items-center text-center hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/5 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Brand OS</h2>
            <p className="text-slate-500 mb-8">Discover creators, launch campaigns, and track ROI with precision.</p>
            <div className="mt-auto w-full flex items-center justify-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
              Enter Brand Portal <ArrowRight size={18} />
            </div>
          </Link>

          {/* Creator Portal Card */}
          <Link href="/creator/dashboard" className="saas-card p-8 flex flex-col items-center text-center hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Creator OS</h2>
            <p className="text-slate-500 mb-8">Manage deals, submit deliverables, and get paid securely via escrow.</p>
            <div className="mt-auto w-full flex items-center justify-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
              Enter Creator Portal <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
