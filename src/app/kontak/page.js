'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Shield, ExternalLink } from 'lucide-react';

export default function KontakPage() {
  const { config } = useSiteSettings();
  const [msgSent, setMsgSent] = useState(false);
  const [form, setForm] = useState({ nama: '', email: '', hp: '', pesan: '' });

  const handleSubmitMsg = (e) => {
    e.preventDefault();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setForm({ nama: '', email: '', hp: '', pesan: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-polri-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polri-gold/15 border border-polri-gold/40 text-polri-gold text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>LAYANAN PENGADUAN & INFORMASI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Kontak & Lokasi Polsek Dwikora
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hubungi Polsek Dwikora Pontianak atau datangi markas komando kami untuk pelayanan kepolisian langsung.
          </p>
        </div>

        {/* Info Grid & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 space-y-6 backdrop-blur-xl shadow-xl">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
                Informasi Kontak Resmi
              </h2>

              <div className="space-y-5">
                
                {/* Alamat */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-polri-gold/20 text-polri-gold shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Markas Polsek</h3>
                    <p className="text-sm font-semibold text-white mt-0.5 leading-relaxed">{config.address}</p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telepon Kantor</h3>
                    <p className="text-sm font-semibold text-white mt-0.5">{config.phone}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Center SPKT</h3>
                    <p className="text-sm font-semibold text-emerald-300 mt-0.5">{config.whatsapp}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-polri-gold shrink-0 mt-0.5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Layanan</h3>
                    <p className="text-sm font-semibold text-white mt-0.5">{config.email}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Emergency Hotline 110 Callout */}
            <div className="bg-gradient-to-r from-rose-900/60 via-red-900/40 to-polri-card border border-rose-500/40 rounded-3xl p-6 space-y-2 shadow-xl">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-500 text-white uppercase tracking-wider">
                LAYANAN DARURAT 24 JAM
              </span>
              <h3 className="text-2xl font-black text-white">Call Center Polri 110</h3>
              <p className="text-xs text-rose-200 leading-relaxed">
                Bebas pulsa dari semua operator telepon. Gunakan layanan ini apabila mengalami atau melihat gangguan keamanan & ketertiban darurat.
              </p>
            </div>

          </div>

          {/* Right Column: Google Maps Embed + Message Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Maps Card */}
            <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-4 overflow-hidden shadow-xl space-y-3">
              <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-polri-gold" /> Google Maps Polsek Dwikora
                </span>
                <a
                  href={`https://maps.google.com/?q=Polsek+Dwikora+Pontianak`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-polri-gold font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                <iframe
                  title="Google Maps Polsek Dwikora"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8173456789!2d109.333333!3d-0.033333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDIn00LjMCIgMTA5wrAyMCcwMC4wIkU!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-xl">
              <h2 className="text-xl font-bold text-white">Kirim Pesan atau Pertanyaan</h2>
              
              {msgSent && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Pesan Anda telah berhasil terkirim ke sekretariat Polsek Dwikora!</span>
                </div>
              )}

              <form onSubmit={handleSubmitMsg} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda..."
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Nomor HP / WA..."
                    value={form.hp}
                    onChange={(e) => setForm({ ...form, hp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Alamat Email (opsional)..."
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
                />

                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
                />

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-sm shadow-glow-gold flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
