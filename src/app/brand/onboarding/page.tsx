'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  Globe, 
  Mail, 
  User, 
  Briefcase, 
  Coins, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { useBrandProfile } from '@/lib/brandContext';
import { BrandProfile } from '@/types/brand';

const INDUSTRIES = [
  'Tech & Software',
  'D2C & E-Commerce',
  'Gaming & Esports',
  'Fashion & Apparel',
  'Health, Fitness & Wellness',
  'Finance & Fintech',
  'EdTech & Learning',
  'Food, Beverage & FMCG',
  'Media & Entertainment',
  'Other',
];

const COMPANY_SIZES = [
  '1-10 employees (Early Startup)',
  '11-50 employees (Growth)',
  '51-200 employees (Scale-up)',
  '201-1000 employees (Mid-Market)',
  '1000+ employees (Enterprise)',
];

const BUDGET_RANGES = [
  'Under ₹50,000 ($500)',
  '₹50,000 - ₹2,00,000 ($2,500)',
  '₹2,00,000 - ₹10,00,000 ($12,000)',
  '₹10,00,000+ ($50,000+ Enterprise)',
];

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { brandProfile, isCompleted, saveBrandProfile } = useBrandProfile();

  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    industry: 'Tech & Software',
    website: '',
    companySize: '51-200 employees (Scale-up)',
    country: 'India',
    currency: 'INR' as 'INR' | 'USD' | 'EUR' | 'GBP',
    typicalBudget: '₹2,00,000 - ₹10,00,000 ($12,000)',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill existing data if editing
  useEffect(() => {
    if (brandProfile) {
      setFormData({
        companyName: brandProfile.companyName || '',
        tagline: brandProfile.tagline || '',
        industry: brandProfile.industry || 'Tech & Software',
        website: brandProfile.website || '',
        companySize: brandProfile.companySize || '51-200 employees (Scale-up)',
        country: brandProfile.country || 'India',
        currency: brandProfile.currency || 'INR',
        typicalBudget: brandProfile.typicalBudget || '₹2,00,000 - ₹10,00,000 ($12,000)',
        contactName: brandProfile.contactName || '',
        contactEmail: brandProfile.contactEmail || '',
        contactPhone: brandProfile.contactPhone || '',
      });
    }
  }, [brandProfile]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company / Brand Name is required';
    }
    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required';
    } else if (!formData.website.startsWith('http://') && !formData.website.startsWith('https://')) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Representative contact name is required';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Headquarters location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Save profile to context and localStorage
    saveBrandProfile({
      companyName: formData.companyName.trim(),
      tagline: formData.tagline.trim(),
      industry: formData.industry,
      website: formData.website.trim(),
      companySize: formData.companySize,
      country: formData.country.trim(),
      currency: formData.currency,
      typicalBudget: formData.typicalBudget,
      contactName: formData.contactName.trim(),
      contactEmail: formData.contactEmail.trim(),
      contactPhone: formData.contactPhone.trim(),
    });

    setTimeout(() => {
      router.push('/brand/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Top Header */}
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center shadow-md shadow-primary-900/10">
            <Layers className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-slate-900">CreatorFlow</span>
            <span className="text-xs text-primary-600 font-semibold block leading-none">Brand OS</span>
          </div>
        </Link>

        {isCompleted && (
          <Link 
            href="/brand/dashboard"
            className="text-xs font-semibold text-slate-600 hover:text-primary-600 flex items-center gap-1 transition-colors"
          >
            <span>Skip to Dashboard</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/5 p-6 sm:p-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-3 border border-primary-100">
            <Sparkles size={13} className="text-primary-600" />
            <span>Step 1 of 1: Brand Onboarding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Your Brand Profile
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Set up your brand profile once. This information will personalize your dashboard, pre-populate your campaign briefs, and identify your business to creators.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Company Essentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="text-primary-600 w-4 h-4" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Company Identity</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Brand Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g., TechBrand Inc., Zomato, Acme Corp"
                    className={`input-field pl-9 ${errors.companyName ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand Tagline / Description
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g., Next-generation developer tools & AI cloud infrastructure"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industry / Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="select-field"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Website <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className={`input-field pl-9 ${errors.website ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Scale & Commercial Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Coins className="text-emerald-600 w-4 h-4" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Scale & Budget Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headquarters Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., India, United States"
                    className={`input-field pl-9 ${errors.country ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="select-field"
                >
                  {COMPANY_SIZES.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Default Currency
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['INR', 'USD', 'EUR', 'GBP'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setFormData({ ...formData, currency: curr })}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        formData.currency === curr
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Monthly Influencer Budget
                </label>
                <select
                  value={formData.typicalBudget}
                  onChange={(e) => setFormData({ ...formData, typicalBudget: e.target.value })}
                  className="select-field"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Primary Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="text-indigo-600 w-4 h-4" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Primary Marketer / Contact</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g., Sarah Jenkins"
                    className={`input-field pl-9 ${errors.contactName ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.contactName && <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="sarah@yourbrand.com"
                    className={`input-field pl-9 ${errors.contactEmail ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.contactEmail && <p className="text-xs text-red-500 mt-1">{errors.contactEmail}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="input-field pl-9"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Trust Note */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="text-emerald-600 w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Your contact details are encrypted and securely stored. They are only shared with creators when you issue a formal Campaign Deal Offer.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors order-2 sm:order-1"
            >
              ← Back to Portal Select
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-full sm:w-auto order-1 sm:order-2 shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <span>Save Profile & Enter Brand OS</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-slate-400">
        CreatorFlow OS • BNB&apos;26 Hackathon Prototype • Profile saved locally to browser
      </div>
    </div>
  );
}
