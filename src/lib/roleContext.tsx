'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type DemoRole = 'brand' | 'creator' | 'unclaimed' | 'verify';

export interface UserProfileInfo {
  role: DemoRole;
  name: string;
  subtitle: string;
  avatar: string;
  badgeLabel: string;
  badgeColor: 'emerald' | 'amber' | 'purple' | 'cyan';
}

export const ROLE_PROFILES: Record<DemoRole, UserProfileInfo> = {
  brand: {
    role: 'brand',
    name: 'TechBrand Inc.',
    subtitle: 'CyberFlow AI Launch Team',
    avatar: '🚀',
    badgeLabel: 'Brand Marketer Mode',
    badgeColor: 'purple',
  },
  creator: {
    role: 'creator',
    name: 'Alex Vance',
    subtitle: 'Full-Stack & AI Creator (Claimed)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    badgeLabel: 'Claimed Creator Mode',
    badgeColor: 'emerald',
  },
  unclaimed: {
    role: 'unclaimed',
    name: 'Marques B.',
    subtitle: 'Unclaimed Profile (18.4M Subs)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    badgeLabel: 'Unclaimed Creator View',
    badgeColor: 'amber',
  },
  verify: {
    role: 'verify',
    name: 'Public Verification',
    subtitle: 'Deal ID: DEAL-2026-X89B',
    avatar: '🛡️',
    badgeLabel: 'Public Trust Audit',
    badgeColor: 'cyan',
  },
};

interface RoleContextValue {
  currentRole: DemoRole;
  setRole: (role: DemoRole) => void;
  profile: UserProfileInfo;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<DemoRole>('brand');

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('demo_role') as DemoRole;
      if (saved && ROLE_PROFILES[saved]) {
        setCurrentRole(saved);
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  const handleSetRole = (role: DemoRole) => {
    setCurrentRole(role);
    try {
      localStorage.setItem('demo_role', role);
    } catch {
      // Ignore
    }
  };

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        profile: ROLE_PROFILES[currentRole],
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
