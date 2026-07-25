'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Calendar, MapPin, Clock, FileText, CheckCircle2, Shield, Eye, X } from 'lucide-react';

export default function JadwalSIMPage() {
  const { schedules } = useSiteSettings();
  const [selectedPoster, setSelectedPoster] = useState(null);

  return (
    <div className="min-h-screen bg-polri-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polri-gold/15 border border-polri-gold/40 text-polri-gold text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>SATUAN LALU LINTAS - POLRESTA PONTIANAK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Jadwal Operasional SIM Keliling
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Informasi lokasi, tanggal, dan jam operasional pelayanan SIM Keliling di wilayah hukum Kota Pontianak.
          </p>
        </div>

        {/* Schedule Cards / Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedules.map((item) => {
            const isMendatang = item.status === 'Mendatang';

            return (
              <div 
                key={item.id}
                className="bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-polri-gold transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-polri-gold/20 text-polri-gold border border-polri-gold/40 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.hari}, {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      isMendatang ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-polri-gold shrink-0 mt-0.5" />
                      <span>{item.lokasi}</span>
                    </h3>

                    <div className="flex items-center gap-2 text-slate-300 text-xs">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Jam Operasional: <strong className="text-white">{item.jam}</strong></span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed pt-1">
                      {item.keterangan}
                    </p>
                  </div>
                </div>

                {/* Poster Preview Button */}
                {item.poster && (
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Poster Informasi</span>
                    <button
                      onClick={() => setSelectedPoster(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-polri-dark hover:bg-slate-800 text-polri-gold border border-polri-gold/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Poster</span>
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Requirements Reminder Note */}
        <div className="bg-polri-card/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-polri-gold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Ketentuan & Persyaratan SIM Keliling</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-polri-dark/80 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold text-sm">Persyaratan Berkas:</strong>
              <p>1. SIM Lama asli & 3 lembar fotokopi</p>
              <p>2. KTP asli & 3 lembar fotokopi</p>
              <p>3. Surat Keterangan Sehat Dokter Polri</p>
              <p>4. Hasil Tes Psikologi SIM</p>
            </div>
            <div className="p-4 rounded-2xl bg-polri-dark/80 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold text-sm">Catatan Penting:</strong>
              <p>• SIM Keliling hanya melayani perpanjangan SIM A dan SIM C yang masih berlaku.</p>
              <p>• Apabila masa berlaku SIM sudah habis (kadaluarsa), pemohon harus melakukan pembuatan SIM Baru di Satpas Polresta Pontianak.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Poster Zoom */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-polri-card border border-polri-gold rounded-3xl max-w-xl w-full p-6 space-y-4 relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white pr-8">
              Poster SIM Keliling - {selectedPoster.lokasi}
            </h3>

            <div className="rounded-2xl overflow-hidden border border-slate-700">
              <img src={selectedPoster.poster} alt="Poster SIM" className="w-full h-80 object-cover" />
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p><strong>Tanggal:</strong> {selectedPoster.hari}, {selectedPoster.tanggal}</p>
              <p><strong>Jam:</strong> {selectedPoster.jam}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
