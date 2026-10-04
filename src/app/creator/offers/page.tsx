'use client';

import React from 'react';
import { Inbox, CheckCircle2, XCircle, ArrowRight, Clock, Building2, Flame } from 'lucide-react';
import Link from 'next/link';

export default function IncomingOffersPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Incoming Offers</h1>
        <p className="text-slate-500">Review, negotiate, and accept campaign offers from verified brands.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Offers Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="saas-card overflow-hidden border-primary-200 shadow-lg shadow-primary-900/5 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                    <Building2 className="text-slate-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">CyberFlow Launch Campaign</h3>
                    <p className="text-sm font-medium text-primary-600">TechBrand Inc.</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600">₹75,000</div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full mt-1">
                    <Clock size={12} /> ACTION REQUIRED
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-semibold mb-1">FORMAT</p>
                  <p className="text-sm font-bold text-slate-900">Dedicated Video</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-semibold mb-1">DEADLINE</p>
                  <p className="text-sm font-bold text-slate-900">Oct 24, 2026</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 md:col-span-2">
                  <p className="text-xs text-slate-500 font-semibold mb-1">KEY OBJECTIVE</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-1">Drive signups using code HACK20</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <Link href="/deals/DEAL-2026-X89B" className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  Review & Negotiate Deal <ArrowRight size={18} />
                </Link>
                <button className="btn btn-secondary text-red-600 hover:bg-red-50 hover:border-red-200">
                  Decline
                </button>
              </div>
            </div>
          </div>

          <div className="saas-card overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                    <Flame className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">React Tools Spotlight</h3>
                    <p className="text-sm font-medium text-slate-500">Vercel</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">₹45,000</div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-1">
                    PENDING BRAND REPLY
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">Your counter-offer sent:</span> You requested a deadline extension to Nov 2, 2026 and an increased fee of ₹45,000. Waiting for brand approval.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="saas-card p-6 bg-slate-900 text-white border-0">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Inbox size={18} /> Deal Pipeline
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">New Offers</span>
                <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">In Negotiation</span>
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Active Deals</span>
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Declined</span>
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
