'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Shield, MapPin, Phone, Mail, MessageSquare, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { config } = useSiteSettings();

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  return (
    <footer className="bg-polri-dark border-t border-polri-gold/20 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-polri-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-polri-gold p-0.5 shadow-glow-gold flex items-center justify-center">
                <div className="w-full h-full bg-polri-dark rounded-[6px] flex items-center justify-center overflow-hidden">
                  <Shield className="w-5 h-5 text-polri-gold" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">{config.policeName}</h3>
                <p className="text-xs text-polri-gold font-semibold">Polresta Pontianak - Polda Kalbar</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Wadah resmi Survei Kepuasan Masyarakat (SKM) Polsek Dwikora Pontianak. Mewujudkan pelayanan kepolisian yang Presisi, transparan, dan berkeadilan.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-polri-card border border-polri-gold/30 text-xs text-polri-gold font-semibold">
              <span>POLRI PRESISI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-polri-gold pl-3">Navigasi Utama</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-polri-gold transition-colors flex items-center gap-1.5">
                  <span className="text-polri-gold">›</span> Beranda & Form Survey
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="hover:text-polri-gold transition-colors flex items-center gap-1.5">
                  <span className="text-polri-gold">›</span> Informasi Persyaratan Pelayanan
                </Link>
              </li>
              <li>
                <Link href="/jadwal-sim" className="hover:text-polri-gold transition-colors flex items-center gap-1.5">
                  <span className="text-polri-gold">›</span> Jadwal SIM Keliling
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-polri-gold transition-colors flex items-center gap-1.5">
                  <span className="text-polri-gold">›</span> Lokasi & Kontak Polsek
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-polri-gold transition-colors flex items-center gap-1.5">
                  <span className="text-polri-gold">›</span> Login Administrator / Petugas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-polri-gold pl-3">Jenis Pelayanan</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['SKCK', 'SPKT 24 Jam', 'Laporan Kehilangan', 'Pengaduan Masyarakat', 'SIM Keliling', 'Sidik Jari', 'Izin Keramaian'].map(s => (
                <span key={s} className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                  {s}
                </span>
              ))}
            </div>
            <div className="p-3.5 rounded-xl bg-polri-card/60 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Layanan Darurat 110
              </span>
              <p className="text-slate-400">Bebas pulsa 24 jam untuk laporan kejadian darurat & gangguan Kamtibmas.</p>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-polri-gold pl-3">Kontak & Alamat</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-5 h-5 text-polri-gold shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{config.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-polri-gold shrink-0" />
                <span className="text-xs">{config.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">WA Center: {config.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-polri-gold shrink-0" />
                <span className="text-xs truncate">{config.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {config.policeName}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <span>Website Resmi Survei Kepuasan Masyarakat</span>
            <span>•</span>
            <span className="text-polri-gold">Pontianak - Kalimantan Barat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
