'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { 
  Palette, 
  Image as ImageIcon, 
  Save, 
  Check, 
  RefreshCw, 
  Eye, 
  Upload, 
  FileImage,
  Link as LinkIcon 
} from 'lucide-react';

export default function KelolaTampilanPage() {
  const { config, updateConfig } = useSiteSettings();
  const [form, setForm] = useState({ ...config });
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); // 'kapolsekPhoto' | 'heroBannerImage' | 'logoUrl'

  const handleSave = (e) => {
    e.preventDefault();
    updateConfig(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm(prev => ({ ...prev, [fieldName]: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah file gambar.');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Terjadi kesalahan saat mengunggah file.');
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Kustomisasi Visual</span>
          <h1 className="text-2xl font-extrabold text-white">Kelola Tampilan Website</h1>
          <p className="text-xs text-slate-400 mt-0.5">Upload foto Kapolsek, banner, logo resmi Polri/Polda, dan pratinjau perubahan secara langsung.</p>
        </div>

        {savedMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Perubahan Tampilan Disimpan!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Config Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Palette className="w-5 h-5 text-polri-gold" />
            <span>Pengaturan Elemen Visual & Upload Gambar</span>
          </h2>

          <div className="space-y-5 text-xs">
            
            <div className="space-y-1">
              <label className="font-semibold text-slate-200">Nama Website Utama</label>
              <input
                type="text"
                value={form.siteName || ''}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-200">Sub-Judul Institusi</label>
              <input
                type="text"
                value={form.subTitle || ''}
                onChange={(e) => setForm({ ...form, subTitle: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-200">Nama Kapolsek & Gelar</label>
              <input
                type="text"
                value={form.kapolsekName || ''}
                onChange={(e) => setForm({ ...form, kapolsekName: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-200">Sambutan / Pesan Kapolsek</label>
              <textarea
                rows={3}
                value={form.kapolsekMessage || ''}
                onChange={(e) => setForm({ ...form, kapolsekMessage: e.target.value })}
                className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold leading-relaxed"
              />
            </div>

            {/* Upload Field 1: Foto Kapolsek */}
            <div className="space-y-2 p-4 rounded-2xl bg-polri-dark/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-polri-gold flex items-center gap-1.5">
                  <FileImage className="w-4 h-4" />
                  <span>1. Foto Kapolsek</span>
                </label>
                {uploadingField === 'kapolsekPhoto' && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Mengunggah...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 bg-black/40 shrink-0">
                  {form.kapolsekPhoto ? (
                    <img src={form.kapolsekPhoto} alt="Kapolsek" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">No Img</div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-polri-gold/20 hover:bg-polri-gold hover:text-polri-dark text-polri-gold font-bold text-xs border border-polri-gold/40 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Foto Dari Komputer</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'kapolsekPhoto')}
                    />
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Atau masukkan URL gambar..."
                      value={form.kapolsekPhoto || ''}
                      onChange={(e) => setForm({ ...form, kapolsekPhoto: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-polri-dark border border-slate-700 text-white text-[11px] focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Field 2: Header Banner Image */}
            <div className="space-y-2 p-4 rounded-2xl bg-polri-dark/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-polri-gold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>2. Header Banner Image</span>
                </label>
                {uploadingField === 'heroBannerImage' && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Mengunggah...
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {form.heroBannerImage && (
                  <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-700 relative">
                    <img src={form.heroBannerImage} alt="Banner" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-polri-gold/20 hover:bg-polri-gold hover:text-polri-dark text-polri-gold font-bold text-xs border border-polri-gold/40 cursor-pointer transition-colors shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload Banner Gambar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'heroBannerImage')}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Atau masukkan URL banner..."
                    value={form.heroBannerImage || ''}
                    onChange={(e) => setForm({ ...form, heroBannerImage: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-polri-dark border border-slate-700 text-white text-[11px] focus:outline-none focus:border-polri-gold"
                  />
                </div>
              </div>
            </div>

            {/* Upload Field 3: Logo Utama Polri / Polda */}
            <div className="space-y-2 p-4 rounded-2xl bg-polri-dark/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-polri-gold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>3. Logo Utama (Polri / Polda)</span>
                </label>
                {uploadingField === 'logoUrl' && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Mengunggah...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl p-1 overflow-hidden border border-slate-700 bg-black/40 shrink-0 flex items-center justify-center">
                  {form.logoUrl ? (
                    <img src={form.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="text-[10px] text-slate-600">No Logo</div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-polri-gold/20 hover:bg-polri-gold hover:text-polri-dark text-polri-gold font-bold text-xs border border-polri-gold/40 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Logo Dari Komputer</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'logoUrl')}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Atau masukkan URL logo..."
                    value={form.logoUrl || ''}
                    onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-polri-dark border border-slate-700 text-white text-[11px] focus:outline-none focus:border-polri-gold"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-extrabold text-xs shadow-glow-gold flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Tampilan</span>
            </button>
          </div>
        </form>

        {/* Right Column: Live Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Eye className="w-4 h-4 text-polri-gold" />
            <span>Pratinjau Langsung (Live Preview)</span>
          </div>

          <div className="bg-polri-card/90 border border-polri-gold/40 rounded-3xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
            {/* Header Preview */}
            <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-slate-700">
              {form.heroBannerImage ? (
                <img src={form.heroBannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-800" />
              )}
              <div className="absolute inset-0 bg-polri-dark/60 backdrop-blur-[2px] flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {form.logoUrl && (
                    <img src={form.logoUrl} alt="Logo Polri" className="w-10 h-10 object-contain drop-shadow" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">{form.policeName}</span>
                    <span className="text-[10px] text-polri-gold block">{form.subTitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kapolsek Preview Card */}
            <div className="p-4 rounded-2xl bg-polri-dark/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-4">
                {form.kapolsekPhoto ? (
                  <img src={form.kapolsekPhoto} alt="Kapolsek" className="w-16 h-16 rounded-2xl object-cover border-2 border-polri-gold shadow-glow-gold shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-polri-gold shrink-0" />
                )}
                <div className="text-xs">
                  <h3 className="font-bold text-white text-sm">{form.kapolsekName}</h3>
                  <span className="text-polri-gold font-semibold block">{form.kapolsekTitle}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic border-l-2 border-polri-gold pl-3 leading-relaxed">
                "{form.kapolsekMessage}"
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
