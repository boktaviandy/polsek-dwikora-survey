'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Settings, Save, Check, Globe, MapPin, Phone, Mail, MessageSquare, Search } from 'lucide-react';

export default function PengaturanWebsitePage() {
  const { config, updateConfig } = useSiteSettings();
  const [form, setForm] = useState({ ...config });
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateConfig(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Konfigurasi Sistem</span>
          <h1 className="text-2xl font-extrabold text-white">Pengaturan Umum Website</h1>
          <p className="text-xs text-slate-400 mt-0.5">Ubah alamat, nomor telepon, WhatsApp center, email, Google Maps embed, dan SEO dasar.</p>
        </div>

        {savedMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        
        {/* Section 1: Identitas & Kontak */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-polri-gold uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>1. Alamat & Kontak Resmi</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1 md:col-span-2">
              <label className="font-semibold text-slate-300">Alamat Lengkap Polsek</label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nomor Telepon Mako</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">WhatsApp Center SPKT</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="font-semibold text-slate-300">Email Resmi</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="font-semibold text-slate-300">URL Embed Google Maps (iframe src)</label>
              <input
                type="text"
                value={form.googleMapsEmbed}
                onChange={(e) => setForm({ ...form, googleMapsEmbed: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold font-mono"
              />
            </div>

          </div>
        </div>

        {/* Section 2: SEO Dasar */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-polri-gold uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>2. Pengaturan SEO (Search Engine Optimization)</span>
          </h2>

          <div className="grid grid-cols-1 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Meta Title (Judul Tab Browser)</label>
              <input
                type="text"
                value={form.seo?.metaTitle || ''}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Meta Description (Deskripsi Pencarian Google)</label>
              <textarea
                rows={2}
                value={form.seo?.metaDescription || ''}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-extrabold text-xs shadow-glow-gold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Seluruh Pengaturan</span>
          </button>
        </div>

      </form>

    </div>
  );
}
