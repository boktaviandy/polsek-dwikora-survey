'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import Link from 'next/link';
import { 
  FileText, 
  ShieldAlert, 
  FileSearch, 
  CreditCard, 
  Fingerprint, 
  Megaphone, 
  FileCheck,
  Clock,
  Banknote,
  CheckCircle2,
  ListOrdered,
  ArrowRight,
  Shield
} from 'lucide-react';

export default function InformasiPelayananPage() {
  const { services } = useSiteSettings();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(services.map(s => s.category)))];

  const iconMap = {
    FileText,
    ShieldAlert,
    FileSearch,
    CreditCard,
    Fingerprint,
    Megaphone,
    FileCheck
  };

  const filteredServices = selectedCategory === 'Semua' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-polri-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polri-gold/15 border border-polri-gold/40 text-polri-gold text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>STANDAR PELAYANAN PUBLIK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Informasi & Persyaratan Pelayanan
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Panduan lengkap mengenai persyaratan dokumen, alur prosedur, biaya PNBP, dan jam operasional pelayanan di Polsek Dwikora Pontianak.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-polri-gold text-polri-dark shadow-glow-gold scale-105'
                    : 'bg-polri-card text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services List Grid */}
        <div className="space-y-8">
          {filteredServices.map((service) => {
            const IconComp = iconMap[service.icon] || FileText;

            return (
              <div 
                key={service.id}
                id={service.id}
                className="bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-polri-gold/60 transition-all space-y-6"
              >
                {/* Header Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-polri-blue to-blue-600 text-polri-gold border border-polri-gold/40 flex items-center justify-center shrink-0 shadow-glow">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-polri-gold/20 text-polri-gold uppercase tracking-wider">
                        {service.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href="/#form-survey-section"
                    className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105 shrink-0"
                  >
                    <span>Isi Survei Layanan Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Key Info Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-polri-dark/80 border border-slate-800 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-polri-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Jam Operasional</span>
                      <span className="text-sm font-semibold text-white">{service.operationalHours}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-polri-dark/80 border border-slate-800 flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Biaya / Tarif PNBP</span>
                      <span className="text-sm font-semibold text-emerald-300">{service.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Requirements & Flow Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Persyaratan */}
                  <div className="p-5 rounded-2xl bg-polri-dark/60 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-polri-gold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Persyaratan Berkas</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {service.requirements?.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-polri-gold font-bold">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alur Prosedur */}
                  <div className="p-5 rounded-2xl bg-polri-dark/60 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-polri-gold flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-polri-gold" />
                      <span>Alur & Prosedur Pelayanan</span>
                    </h3>
                    <ol className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {service.flow?.map((fl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-polri-gold/20 text-polri-gold text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{fl}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
