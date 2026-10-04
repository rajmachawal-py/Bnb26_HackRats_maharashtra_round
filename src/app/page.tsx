'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, UserCheck, ArrowRight, ShieldCheck, Zap, BarChart3, CheckCircle2, ChevronRight, PlusCircle } from 'lucide-react';
import { useBrandProfile } from '@/lib/brandContext';
import { useRole } from '@/lib/roleContext';

const BRAND_LOGOS = [
  { name: 'Zomato', domain: 'zomato.com' },
  { name: 'Swiggy', domain: 'swiggy.com' },
  { name: 'Flipkart', domain: 'flipkart.com' },
  { name: 'Myntra', domain: 'myntra.com' },
  { name: 'CRED', domain: 'cred.club' },
  { name: 'boAt', domain: 'boat-lifestyle.com' },
  { name: 'Nykaa', domain: 'nykaa.com' },
  { name: 'Paytm', domain: 'paytm.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Samsung', domain: 'samsung.com' },
];

export default function LandingPage() {
  const router = useRouter();
  const { isCompleted, brandProfile } = useBrandProfile();
  const { setRole } = useRole();

  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showCreatorOptions, setShowCreatorOptions] = useState(false);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRole('brand');
    
    if (isCompleted && !showBrandOptions) {
      setShowBrandOptions(true);
      setShowCreatorOptions(false);
    } else if (!isCompleted) {
      router.push('/brand/onboarding');
    }
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRole('creator');
    
    if (!showCreatorOptions) {
      setShowCreatorOptions(true);
      setShowBrandOptions(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-slate-200 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="w-full border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center shadow-sm">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-slate-900">Collaboration</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Trust & Safety</a>
        </div>
        <div>
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 mr-6">Log in</button>
          <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm">Get Started</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 w-full relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Select your workspace portal
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Collaboration provides unified infrastructure for brands and professional creators to manage campaigns, compliance, and escrow payouts.
          </p>
        </div>

        {/* Trusted By Marquee (Scroller) */}
        <div className="w-full max-w-5xl mx-auto mb-16 overflow-hidden relative">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by top brands in India and globally
          </p>
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee flex items-center gap-12 md:gap-20 pt-2">
            {/* Render brands twice to create infinite scrolling effect */}
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
              <div key={i} className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`} 
                  alt={brand.name}
                  className="h-8 md:h-10 w-auto object-contain rounded-md"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const parent = img.parentElement;
                    if (parent) {
                      parent.innerText = brand.name;
                      parent.className = "text-xl font-bold text-slate-400";
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Portal Selection Grid with 3D Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 perspective-1000">
          
          {/* Brand Portal */}
          <div className={`group flex flex-col p-8 bg-white border ${showBrandOptions ? 'border-primary-400 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] -translate-y-2' : 'border-slate-200'} rounded-xl transition-all duration-500 cursor-pointer text-left hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300`}>
            
            <div onClick={handleBrandClick} className="flex-1">
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Building2 size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center justify-between">
                Brand Portal
                <ArrowRight className={`text-slate-400 transition-all ${showBrandOptions ? 'text-primary-600 translate-x-1' : 'group-hover:text-slate-900 group-hover:translate-x-1'}`} size={20} />
              </h2>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Manage influencer marketing campaigns, discover verified creators, and automate milestone-based payments.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Discover 1M+ creators
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Automated AI compliance checking
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Milestone-based escrow payouts
                </li>
              </ul>
            </div>

            {/* Action Area */}
            <div className="pt-6 border-t border-slate-100">
              {showBrandOptions && isCompleted && brandProfile ? (
                <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                  <button 
                    onClick={() => router.push('/brand/dashboard')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Continue as {brandProfile.companyName}</div>
                      <div className="text-xs text-slate-500">Go to existing dashboard</div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                  <button 
                    onClick={() => router.push('/brand/onboarding')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Create new organization</div>
                      <div className="text-xs text-slate-500">Set up a different brand</div>
                    </div>
                    <PlusCircle size={18} className="text-slate-400" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleBrandClick}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors"
                >
                  Enter Brand Portal
                </button>
              )}
            </div>
          </div>

          {/* Creator Portal */}
          <div className={`group flex flex-col p-8 bg-white border ${showCreatorOptions ? 'border-emerald-400 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] -translate-y-2' : 'border-slate-200'} rounded-xl transition-all duration-500 cursor-pointer text-left hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300`}>
            
            <div onClick={handleCreatorClick} className="flex-1">
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center justify-between">
                Creator Portal
                <ArrowRight className={`text-slate-400 transition-all ${showCreatorOptions ? 'text-emerald-600 translate-x-1' : 'group-hover:text-slate-900 group-hover:translate-x-1'}`} size={20} />
              </h2>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Review inbound deals, submit deliverables, and track your verified payments seamlessly.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Publish your professional media kit
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Cryptographic contract signing
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-400" /> Guaranteed escrow payouts
                </li>
              </ul>
            </div>

            {/* Action Area */}
            <div className="pt-6 border-t border-slate-100">
              {showCreatorOptions ? (
                <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                  <button 
                    onClick={() => router.push('/creator/dashboard')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Continue as Alex Vance</div>
                      <div className="text-xs text-slate-500">Go to existing dashboard</div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                  <button 
                    onClick={() => {
                       // Demo implementation - just route to dashboard for now
                       router.push('/creator/dashboard');
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Log in with different account</div>
                      <div className="text-xs text-slate-500">Switch profiles</div>
                    </div>
                    <PlusCircle size={18} className="text-slate-400" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleCreatorClick}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors"
                >
                  Enter Creator Portal
                </button>
              )}
            </div>
          </div>

        </div>

      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <p>© 2026 Collaboration Infrastructure. Built for BNB Hackathon.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">System Status</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
