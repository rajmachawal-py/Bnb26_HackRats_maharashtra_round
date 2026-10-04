'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrandProfile, DEFAULT_BRAND_PROFILE } from '@/types/brand';

interface BrandContextType {
  brandProfile: BrandProfile | null;
  isCompleted: boolean;
  isLoading: boolean;
  saveBrandProfile: (profile: Omit<BrandProfile, 'isCompleted' | 'createdAt'>) => void;
  resetBrandProfile: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const STORAGE_KEY = 'creatorflow_brand_profile';

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BrandProfile;
        setBrandProfile(parsed);
      }
    } catch (err) {
      console.error('Failed to load brand profile from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveBrandProfile = (data: Omit<BrandProfile, 'isCompleted' | 'createdAt'>) => {
    const newProfile: BrandProfile = {
      ...data,
      isCompleted: true,
      createdAt: brandProfile?.createdAt || new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setBrandProfile(newProfile);
    } catch (err) {
      console.error('Failed to save brand profile to localStorage:', err);
    }
  };

  const resetBrandProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setBrandProfile(null);
    } catch (err) {
      console.error('Failed to reset brand profile:', err);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        brandProfile,
        isCompleted: Boolean(brandProfile?.isCompleted),
        isLoading,
        saveBrandProfile,
        resetBrandProfile,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandProfile() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandProfile must be used within a BrandProvider');
  }
  return context;
}
