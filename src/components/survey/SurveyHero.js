'use client';

import React from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { useSurvey } from '@/context/SurveyContext';
import { Shield, Star, Users, Award, ChevronDown, CheckCircle2, Building2 } from 'lucide-react';

export default function SurveyHero() {
  const { config } = useSiteSettings();
  const { calculateStats } = useSurvey();
  const stats = calculateStats();

  const scrollToSurvey = () => {
    const el = document.getElementById('form-survey-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-polri-dark via-polri-navy to-polri-dark text-white overflow-hidden py-12 lg:py-16">
      
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-polri-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-polri-gold/15 border border-polri-gold/40 text-polri-gold text-xs font-bold uppercase tracking-wider shadow-sm">
            <Shield className="w-4 h-4 text-polri-gold" />
            <span>PORTAL RESMI SURVEI KEPUASAN MASYARAKAT (SKM)</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Pelayanan Kepolisian <span className="text-transparent bg-clip-text bg-gradient-to-r from-polri-gold via-yellow-300 to-amber-400">{config.policeName}</span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Sampaikan masukan & penilaian Anda secara cepat, transparan, dan objektif demi peningkatan mutu pelayanan kami kepada masyarakat Pontianak.
          </p>
        </div>

        {/* Hero Grid: Kapolsek Message + Realtime Stats Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Left Column: Kapolsek Card */}
          <div className="lg:col-span-7 bg-polri-card/80 border border-polri-gold/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-polri-gold/10 rounded-bl-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Kapolsek Photo */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-polri-gold shadow-glow-gold">
                  <img 
                    src={config.kapolsekPhoto} 
                    alt={config.kapolsekName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 p-1.5 bg-polri-gold rounded-full text-polri-dark shadow">
                  <Shield className="w-4 h-4 fill-current" />
                </span>
              </div>

              {/* Kapolsek Message */}
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{config.kapolsekName}</h2>
                  <p className="text-xs font-semibold text-polri-gold uppercase tracking-wider">{config.kapolsekTitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{config.kapolsekMessage}"
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bebas Pungli
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparan
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Respon Cepat
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Real-time Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Stat 1: Total Responden */}
            <div className="bg-polri-card/90 border border-slate-700/80 rounded-2xl p-5 hover:border-polri-gold/50 transition-all shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responden</span>
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{stats.totalSurveys}</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">+{stats.todaySurveys} survei hari ini</div>
              </div>
            </div>

            {/* Stat 2: Indeks Kepuasan (IKM) */}
            <div className="bg-polri-card/90 border border-slate-700/80 rounded-2xl p-5 hover:border-polri-gold/50 transition-all shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Indeks (IKM)</span>
                <div className="p-2 rounded-xl bg-amber-500/20 text-polri-gold">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-polri-gold tracking-tight">{stats.ikmScore}</div>
                <div className="text-xs text-slate-300 font-medium mt-1">Mutu Pelayanan A (Sangat Baik)</div>
              </div>
            </div>

            {/* Stat 3: Kepuasan (%) */}
            <div className="col-span-2 bg-gradient-to-r from-polri-card via-slate-800 to-polri-card border border-polri-gold/30 rounded-2xl p-5 shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tingkat Kepuasan Masyarakat</span>
                <div className="text-2xl font-extrabold text-emerald-400">{stats.satisfactionRate}% <span className="text-xs font-normal text-slate-300">Responden Puas</span></div>
              </div>
              <button 
                onClick={scrollToSurvey}
                className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-all transform hover:scale-105"
              >
                <span>Isi Survey Sekarang</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
