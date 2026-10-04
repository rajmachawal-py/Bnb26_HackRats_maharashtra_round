'use client';

import React from 'react';
import { Calendar, PlayCircle, FileText, UploadCloud, AlertCircle, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Tasks & Deliverables</h1>
        <p className="text-slate-500">Manage your active campaign deliverables, scripts, and deadlines.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Active Task 1 - Requires Action */}
        <div className="saas-card overflow-hidden border-amber-200">
          <div className="bg-amber-50/50 p-4 border-b border-amber-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
              <AlertCircle size={16} /> ACTION REQUIRED BY TOMORROW
            </div>
            <div className="text-sm font-semibold text-slate-600">
              DEAL-2026-X89B
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <PlayCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">CyberFlow Launch Dedicated Video</h3>
                  <p className="text-slate-500 mb-3">TechBrand Inc. • 8-10 Minute YouTube Video</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md flex items-center gap-1.5">
                      <FileText size={14} /> Script Due: Oct 15
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md flex items-center gap-1.5">
                      <UploadCloud size={14} /> Final Due: Oct 24
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Link href="/campaigns/campaign-cyberflow-launch" className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2">
                  Open Workspace <ChevronRight size={18} />
                </Link>
                <p className="text-xs text-center text-slate-400 mt-2">Submit script for AI review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Task 2 - Pending Brand Approval */}
        <div className="saas-card overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
              <ClockIcon /> PENDING BRAND REVIEW
            </div>
            <div className="text-sm font-semibold text-slate-600">
              DEAL-2026-M44C
            </div>
          </div>
          <div className="p-6 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                  <InstagramIcon />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">React Dev Shorts</h3>
                  <p className="text-slate-500 mb-3">Vercel • 60s Instagram Reel</p>
                  <p className="text-sm font-medium text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> AI Script Passed. Waiting for brand sign-off.
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <button className="btn btn-secondary w-full md:w-auto flex items-center justify-center gap-2" disabled>
                  View Workspace
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ClockIcon() {
  return <Clock size={16} />;
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}
