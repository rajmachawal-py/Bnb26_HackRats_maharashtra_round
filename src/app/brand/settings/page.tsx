'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Globe, Mail, User, Coins, MapPin, Edit3, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useBrandProfile } from '@/lib/brandContext';

export default function BrandSettingsPage() {
  const router = useRouter();
  const { brandProfile, isCompleted, resetBrandProfile } = useBrandProfile();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your brand profile? You will be redirected to the Brand Onboarding setup.')) {
      resetBrandProfile();
      router.push('/brand/onboarding');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Brand Settings & Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your company identity, default campaign currency, and primary contact details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="btn btn-secondary text-xs flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Reset profile to re-run onboarding flow"
          >
            <RotateCcw size={14} />
            <span>Reset Profile</span>
          </button>
          <Link
            href="/brand/onboarding"
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {isCompleted && brandProfile ? (
        <div className="space-y-6">
          {/* Company Details Card */}
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 border border-primary-200 flex items-center justify-center font-bold text-primary-700">
                  {brandProfile.companyName
                    .split(' ')
                    .map((w) => w[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{brandProfile.companyName}</h2>
                  <p className="text-xs text-slate-500">{brandProfile.tagline || 'Brand Partner'}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 size={13} />
                Profile Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Industry</span>
                <span className="text-sm font-medium text-slate-800">{brandProfile.industry}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Website</span>
                <a
                  href={brandProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary-600 hover:underline flex items-center gap-1"
                >
                  <Globe size={13} />
                  <span className="truncate">{brandProfile.website}</span>
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Headquarters</span>
                <span className="text-sm font-medium text-slate-800 flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {brandProfile.country}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Company Size</span>
                <span className="text-sm font-medium text-slate-800">{brandProfile.companySize}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Default Currency</span>
                <span className="text-sm font-bold text-slate-800">{brandProfile.currency}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Monthly Budget</span>
                <span className="text-sm font-medium text-slate-800">{brandProfile.typicalBudget}</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="saas-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <User size={16} className="text-primary-600" />
              Primary Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Full Name</span>
                <span className="text-sm font-semibold text-slate-900">{brandProfile.contactName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Work Email</span>
                <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Mail size={14} className="text-slate-400" />
                  {brandProfile.contactEmail}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Phone / WhatsApp</span>
                <span className="text-sm font-semibold text-slate-900">
                  {brandProfile.contactPhone || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="saas-card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Building2 size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No Brand Profile Found</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You have not set up your brand profile yet. Complete onboarding to personalize your brand experience.
          </p>
          <Link href="/brand/onboarding" className="btn btn-primary">
            Start Brand Onboarding
          </Link>
        </div>
      )}
    </div>
  );
}
