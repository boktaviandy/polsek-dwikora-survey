'use client';

import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Shield, Sparkles } from 'lucide-react';

export default function Preloader() {
  const { config } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 120);

    // Fade out preloader
    const timer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setLoading(false);
      }, 700); // 700ms for smooth fadeout transition
      return () => clearTimeout(hideTimer);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  const logoSrc = config?.logoUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Logo_Polda_Kalbar.png/360px-Logo_Polda_Kalbar.png";

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#070D1B] flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Decorative Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 space-y-6 max-w-sm w-full mx-auto flex flex-col items-center">
        
        {/* Animated Logo Container with Golden Ring Glow */}
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-60 blur-md animate-spin-slow" />
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-polri-card border-2 border-polri-gold/60 p-4 shadow-[0_0_50px_rgba(251,191,36,0.3)] flex items-center justify-center backdrop-blur-xl animate-bounce-subtle">
            <img 
              src={logoSrc} 
              alt="Logo Polri" 
              className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" 
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-polri-gold/15 border border-polri-gold/30 text-polri-gold text-[10px] font-bold uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            <span>Polresta Pontianak - Polda Kalbar</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            POLSEK DWIKORA
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Portal Survei Kepuasan Masyarakat
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full h-2 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-polri-gold via-yellow-400 to-amber-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 px-1">
            <span className="flex items-center gap-1 text-polri-gold">
              <Sparkles className="w-3 h-3 animate-spin" />
              <span>Memuat Sistem Presisi...</span>
            </span>
            <span className="font-mono text-white">{Math.min(progress, 100)}%</span>
          </div>
        </div>

      </div>

      {/* Footer Tagline */}
      <div className="absolute bottom-6 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
        Prediktif • Responsibilitas • Transparansi Berkeadilan
      </div>

    </div>
  );
}
