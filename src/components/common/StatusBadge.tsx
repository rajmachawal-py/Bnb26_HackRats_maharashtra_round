import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';
import { CreatorState } from '@/types/creator';
import { DealStatus } from '@/types/deal';

interface StatusBadgeProps {
  type?: 'creatorState' | 'dealStatus' | 'custom';
  state?: CreatorState;
  dealStatus?: DealStatus;
  label?: string;
  variant?: 'emerald' | 'amber' | 'purple' | 'cyan' | 'danger' | 'neutral';
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
  // Creator State
  if (type === 'creatorState' || state) {
    if (state === 'claimed') {
      return (
        <span className={`badge badge-claimed ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
          <CheckCircle2 size={size === 'sm' ? 12 : 14} />
          Verified Partner
        </span>
      );
    }
    if (state === 'unclaimed') {
      return (
        <span className={`badge badge-cyan ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
          <Globe size={size === 'sm' ? 12 : 14} />
          Global Network
        </span>
      );
    }
    if (state === 'active') {
      return (
        <span className={`badge badge-cyan ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
          <Sparkles size={size === 'sm' ? 12 : 14} />
          Active Live Deal
        </span>
      );
    }
    return (
      <span className={`badge badge-neutral ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
        Discoverable
      </span>
    );
  }

  // Deal Status
  if (type === 'dealStatus' || dealStatus) {
    switch (dealStatus) {
      case 'confirmed':
        return (
          <span className={`badge badge-claimed ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
            <ShieldCheck size={size === 'sm' ? 12 : 14} />
            Dual-Confirmed Deal
          </span>
        );
      case 'offer_sent':
      case 'negotiating':
        return (
          <span className={`badge badge-unclaimed ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
            <Clock size={size === 'sm' ? 12 : 14} />
            Negotiating (v2)
          </span>
        );
      case 'completed':
        return (
          <span className={`badge badge-cyan ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
            <CheckCircle2 size={size === 'sm' ? 12 : 14} />
            Campaign Completed
          </span>
        );
      default:
        return (
          <span className={`badge badge-neutral ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
            {dealStatus || 'Draft'}
          </span>
        );
    }
  }

  // Custom Variant
  const badgeClass = 
    variant === 'emerald' ? 'badge-claimed' :
    variant === 'amber' ? 'badge-unclaimed' :
    variant === 'danger' ? 'badge-danger' :
    variant === 'purple' ? 'badge-purple' :
    variant === 'cyan' ? 'badge-cyan' : 'badge-neutral';

  return (
    <span className={`badge ${badgeClass} ${size === 'sm' ? 'text-xs py-0.5 px-2' : ''}`}>
      {label}
    </span>
  );
}
