import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, UserFaction, FitProfile } from '../types';

interface ProfileContextValue {
  profile: UserProfile;
  setCallsign: (name: string) => void;
  setFaction: (faction: UserFaction) => void;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
  saveFitProfile: (fit: FitProfile) => void;
  isBlackMarketUnlocked: boolean;
}

const STORAGE_KEY = 'techwear_profile_v2';

const DEFAULT_PROFILE: UserProfile = {
  callsign: 'OPERATOR-07',
  faction: 'RECON',
  credits: 450,
  level: 2,
  appliedPromo: null
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  const setCallsign = useCallback((name: string) => {
    setProfile((prev) => ({ ...prev, callsign: name.trim() || 'OPERATOR-07' }));
  }, []);

  const setFaction = useCallback((faction: UserFaction) => {
    setProfile((prev) => ({ ...prev, faction }));
  }, []);

  const addCredits = useCallback((amount: number) => {
    setProfile((prev) => {
      const nextCredits = prev.credits + amount;
      const nextLevel = nextCredits >= 600 ? 3 : nextCredits >= 300 ? 2 : 1;
      return { ...prev, credits: nextCredits, level: nextLevel };
    });
  }, []);

  const deductCredits = useCallback((amount: number): boolean => {
    let success = false;
    setProfile((prev) => {
      if (prev.credits >= amount) {
        success = true;
        return { ...prev, credits: prev.credits - amount };
      }
      return prev;
    });
    return success;
  }, []);

  const saveFitProfile = useCallback((fit: FitProfile) => {
    setProfile((prev) => ({ ...prev, fitProfile: fit }));
  }, []);

  const isBlackMarketUnlocked = profile.level >= 2;

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setCallsign,
        setFaction,
        addCredits,
        deductCredits,
        saveFitProfile,
        isBlackMarketUnlocked
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextValue => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return ctx;
};
