'use client';

import React from 'react';
import { ExternalLink, Edit3, Share2, Users, Eye, Activity } from 'lucide-react';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import Link from 'next/link';

export default function MediaKitPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Media Kit</h1>
          <p className="text-slate-500">Manage your public profile, rates, and connected platforms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary flex items-center gap-2">
            <Share2 size={16} /> Share Kit
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Identity */}
        <div className="lg:col-span-1 space-y-6">
          <div className="saas-card p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-primary-100 border-4 border-white shadow-lg overflow-hidden mb-4">
              <img src="/avatars/creator-1.jpg" alt="Alex Vance" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Alex Vance</h2>
            <p className="text-sm text-slate-500 mb-4">Tech & Developer Tools</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Web Development</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">React</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">SaaS</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
              Senior frontend developer making tutorials and tech reviews. I help brands reach highly technical audiences through practical, code-first video essays.
            </p>
          </div>

          <div className="saas-card p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Connected Accounts</h3>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-red-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <PlatformIcon platform="youtube" size={16} />
                </div>
                <span className="font-semibold text-slate-900">@AlexVanceCode</span>
              </div>
              <ExternalLink size={14} className="text-slate-400" />
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-purple-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                  <PlatformIcon platform="twitch" size={16} />
                </div>
                <span className="font-semibold text-slate-900">vance_dev</span>
              </div>
              <ExternalLink size={14} className="text-slate-400" />
            </div>
            <button className="w-full py-2 border-2 border-dashed border-slate-200 text-slate-500 font-semibold rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors">
              + Connect Platform
            </button>
          </div>
        </div>

        {/* Analytics & Rates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="saas-card p-6">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Users size={18} className="text-primary-500" />
                <span className="text-sm font-medium">Total Audience</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">142K</div>
              <div className="text-sm text-emerald-600 font-semibold">+2.4k this week</div>
            </div>
            <div className="saas-card p-6">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Eye size={18} className="text-blue-500" />
                <span className="text-sm font-medium">Avg. Views</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">45K</div>
              <div className="text-sm text-slate-500 font-semibold">Per dedicated video</div>
            </div>
            <div className="saas-card p-6">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Activity size={18} className="text-amber-500" />
                <span className="text-sm font-medium">Engagement Rate</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">5.2%</div>
              <div className="text-sm text-emerald-600 font-semibold">High tier</div>
            </div>
          </div>

          <div className="saas-card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Rate Card</h2>
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <PlatformIcon platform="youtube" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Dedicated YouTube Video</h3>
                    <p className="text-sm text-slate-500 max-w-sm">A full 8-10 minute video completely dedicated to the brand's product, including custom tutorial.</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <div className="text-2xl font-bold text-emerald-600">₹1,50,000</div>
                  <div className="text-xs font-semibold text-slate-400">STARTING AT</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <PlatformIcon platform="youtube" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Integrated YouTube Mention</h3>
                    <p className="text-sm text-slate-500 max-w-sm">A 60-90 second organic integration placed within the first 3 minutes of a regular video.</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <div className="text-2xl font-bold text-emerald-600">₹65,000</div>
                  <div className="text-xs font-semibold text-slate-400">STARTING AT</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <PlatformIcon platform="twitch" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Twitch Stream Sponsorship</h3>
                    <p className="text-sm text-slate-500 max-w-sm">2-hour live segment playing or reviewing the game/product with chat commands.</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <div className="text-2xl font-bold text-emerald-600">₹40,000</div>
                  <div className="text-xs font-semibold text-slate-400">PER STREAM</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
