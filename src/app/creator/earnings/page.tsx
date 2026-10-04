'use client';

import React from 'react';
import { Wallet, ShieldCheck, ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, History } from 'lucide-react';

export default function EarningsEscrowPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Earnings & Escrow</h1>
        <p className="text-slate-500">Manage your payments, view funds in escrow, and track your financial history.</p>
      </div>

      {/* Main Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="saas-card p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden border-0">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-slate-300 mb-4">
              <Wallet size={18} />
              <span className="text-sm font-medium">Available Balance</span>
            </div>
            <div className="text-4xl font-bold mb-2">₹1,24,500</div>
            <button className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
              Withdraw Funds <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="saas-card p-6 border-amber-200 bg-amber-50/30">
          <div className="flex items-center gap-2 text-amber-700 mb-4">
            <ShieldCheck size={18} />
            <span className="text-sm font-medium">Funds in Escrow</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">₹85,000</div>
          <p className="text-sm text-slate-600 mt-4">
            Secured by platform. Automatically released upon brand approval.
          </p>
        </div>

        <div className="saas-card p-6">
          <div className="flex items-center gap-2 text-slate-500 mb-4">
            <History size={18} />
            <span className="text-sm font-medium">Lifetime Earnings</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">₹4,50,000</div>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <TrendingUpIcon />
            +12% this month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Escrow Visual Rails */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Active Escrow Milestones</h2>
          
          <div className="saas-card p-6 space-y-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-slate-900">CyberFlow Launch Video</h3>
                <p className="text-sm text-slate-500">TechBrand Inc. • DEAL-2026-X89B</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">₹50,000</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Value</div>
              </div>
            </div>

            {/* Escrow Pipeline Graphic */}
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100 z-0"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border-4 border-white">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-slate-900">Contract Signed</h4>
                    <p className="text-sm text-slate-500">Funds secured in escrow account.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border-4 border-white">
                    <Clock size={20} />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-slate-900">Script Approved (Pending)</h4>
                    <p className="text-sm text-slate-500 mb-2">Awaiting brand approval to release Milestone 1.</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-md">
                      Releases ₹15,000 (30%)
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border-4 border-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-slate-900">Final Video Published</h4>
                    <p className="text-sm text-slate-500 mb-2">Awaiting final delivery.</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-md">
                      Releases ₹35,000 (70%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold text-slate-900">Transaction History</h2>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">View All</button>
          </div>
          
          <div className="saas-card overflow-hidden">
            <div className="divide-y divide-slate-100">
              
              <div className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <ArrowDownRight size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Milestone Payment</p>
                    <p className="text-xs text-slate-500">React Dev Shorts • Oct 1, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">+₹25,000</p>
                  <p className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">Completed</p>
                </div>
              </div>

              <div className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <ArrowDownRight size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Final Payment</p>
                    <p className="text-xs text-slate-500">Shopify Integration Demo • Sep 24, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">+₹45,000</p>
                  <p className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">Completed</p>
                </div>
              </div>

              <div className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Bank Withdrawal</p>
                    <p className="text-xs text-slate-500">HDFC Bank ending in 4022 • Sep 20, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">-₹70,000</p>
                  <p className="text-xs text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full inline-block mt-1">Processed</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}
