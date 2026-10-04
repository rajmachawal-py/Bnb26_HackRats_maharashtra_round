import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';
import { CreatorState } from '@/types/creator';
import { DealStatus } from '@/types/deal';

interface StatusBadgeProps {
  type?: 'creatorState' | 'dealStatus' | 'custom';
  state?: CreatorState;
  dealStatus?: DealStatus;
  label?: string;
  variant?: 'success' | 'warning' | 'info' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export function StatusBadge({
  type = 'custom',
  state,
  dealStatus,
  label,
  variant,
  size = 'md',
}: StatusBadgeProps) {
  
  const baseClasses = "inline-flex items-center gap-1.5 font-medium rounded-full";
  const sizeClasses = size === 'sm' ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";
  
  const getBadgeClasses = (colorVariant: string) => {
    switch (colorVariant) {
      case 'success': return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case 'warning': return "bg-amber-50 text-amber-700 border border-amber-200";
      case 'info': return "bg-sky-50 text-sky-700 border border-sky-200";
      case 'error': return "bg-red-50 text-red-700 border border-red-200";
      default: return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  // Creator State
  if (type === 'creatorState' || state) {
    if (state === 'claimed') {
      return (
        <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('success')}`}>
          <CheckCircle2 size={size === 'sm' ? 12 : 14} />
          Verified Partner
        </span>
      );
    }
    if (state === 'unclaimed') {
      return (
        <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('warning')}`}>
          <Globe size={size === 'sm' ? 12 : 14} />
          Global Network
        </span>
      );
    }
    if (state === 'active') {
      return (
        <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('info')}`}>
          <Sparkles size={size === 'sm' ? 12 : 14} />
          Active Live Deal
        </span>
      );
    }
    return (
      <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('neutral')}`}>
        Discoverable
      </span>
    );
  }

  // Deal Status
  if (type === 'dealStatus' || dealStatus) {
    switch (dealStatus) {
      case 'confirmed':
        return (
          <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('success')}`}>
            <ShieldCheck size={size === 'sm' ? 12 : 14} />
            Confirmed
          </span>
        );
      case 'offer_sent':
      case 'negotiating':
        return (
          <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('warning')}`}>
            <Clock size={size === 'sm' ? 12 : 14} />
            Negotiating
          </span>
        );
      case 'completed':
        return (
          <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('info')}`}>
            <CheckCircle2 size={size === 'sm' ? 12 : 14} />
            Completed
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses('neutral')}`}>
            {dealStatus || 'Draft'}
          </span>
        );
    }
  }

  return (
    <span className={`${baseClasses} ${sizeClasses} ${getBadgeClasses(variant || 'neutral')}`}>
      {label}
    </span>
  );
}
