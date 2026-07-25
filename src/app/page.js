'use client';

import React from 'react';
import SurveyHero from '@/components/survey/SurveyHero';
import SurveyForm from '@/components/survey/SurveyForm';
import Link from 'next/link';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { 
  FileText, 
  ShieldAlert, 
  FileSearch, 
  CreditCard, 
  Fingerprint, 
  Megaphone, 
  Calendar, 
  Phone,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function HomePage() {
  const { config, services } = useSiteSettings();

  const iconMap = {
    FileText: FileText,
    ShieldAlert: ShieldAlert,
    FileSearch: FileSearch,
    CreditCard: CreditCard,
    Fingerprint: Fingerprint,
    Megaphone: Megaphone
  };

  return (
    <div className="min-h-screen bg-polri-dark text-slate-100 font-sans selection:bg-polri-gold selection:text-polri-dark">
      
      {/* Hero Banner with Kapolsek Message & Real-time Stats */}
      <SurveyHero />

      {/* Main Form Survey Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-20">
        <SurveyForm />
      </section>

      {/* Service Shortcuts Section */}
      <section className="py-16 bg-polri-navy/50 border-t border-polri-gold/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-polri-gold uppercase tracking-widest px-3 py-1 rounded-full bg-polri-gold/10 border border-polri-gold/30">
              Layanan Kepolisian Polsek Dwikora
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Persyaratan & Alur Pelayanan Resmi
            </h2>
            <p className="text-slate-400 text-sm">
              Klik pada salah satu layanan di bawah ini untuk melihat persyaratan berkas dan alur pengurusan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((srv) => {
              const IconComp = iconMap[srv.icon] || FileText;
              return (
                <Link
                  key={srv.id}
                  href="/informasi"
                  className="group bg-polri-card/80 border border-slate-800 hover:border-polri-gold rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-glow-gold flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-polri-blue/40 text-polri-gold border border-polri-gold/30 flex items-center justify-center group-hover:bg-polri-gold group-hover:text-polri-dark transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-polri-gold transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-polri-gold">
                    <span>Lihat Persyaratan</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/informasi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-polri-card border border-polri-gold/40 text-polri-gold font-bold text-sm hover:bg-polri-gold hover:text-polri-dark transition-all shadow-md"
            >
              <span>Lihat Semua Informasi Pelayanan ({services.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Quick SIM Schedule Banner */}
      <section className="py-12 bg-gradient-to-r from-polri-dark via-polri-navy to-polri-dark border-t border-b border-polri-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-polri-gold/20 text-polri-gold border border-polri-gold/40 shrink-0">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Jadwal SIM Keliling Polsek Dwikora</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cek lokasi dan jam operasional layanan perpanjangan SIM Keliling minggu ini di Kota Pontianak.
              </p>
            </div>
          </div>
          
          <Link
            href="/jadwal-sim"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-sm shadow-glow-gold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>Lihat Jadwal Lengkap</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
