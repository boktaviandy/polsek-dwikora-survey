'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Briefcase, Plus, Edit3, Trash2, X, Check } from 'lucide-react';

export default function KelolaPelayananPage() {
  const { services, addService, updateService, deleteService } = useSiteSettings();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SKCK');
  const [description, setDescription] = useState('');
  const [operationalHours, setOperationalHours] = useState('');
  const [fee, setFee] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('SKCK');
    setDescription('');
    setOperationalHours('Senin - Jumat: 08.00 - 15.00 WIB');
    setFee('Rp 30.000');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingItem(srv);
    setTitle(srv.title);
    setCategory(srv.category);
    setDescription(srv.description);
    setOperationalHours(srv.operationalHours);
    setFee(srv.fee);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingItem) {
      updateService(editingItem.id, {
        title,
        category,
        description,
        operationalHours,
        fee
      });
    } else {
      addService({
        title,
        category,
        description,
        operationalHours,
        fee
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Manajemen Layanan</span>
          <h1 className="text-2xl font-extrabold text-white">Kelola Halaman Pelayanan</h1>
          <p className="text-xs text-slate-400 mt-0.5">Atur daftar layanan publik, biaya PNBP, dan jam operasional Polsek.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Pelayanan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-polri-gold/20 text-polri-gold uppercase">
                  {srv.category}
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {srv.status || 'Aktif'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white">{srv.title}</h2>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{srv.description}</p>
              
              <div className="p-3 rounded-xl bg-polri-dark/80 text-xs space-y-1 text-slate-300">
                <p>🕒 <strong>Jam:</strong> {srv.operationalHours}</p>
                <p>💵 <strong>Biaya:</strong> {srv.fee}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-polri-gold hover:bg-polri-gold hover:text-polri-dark text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Hapus layanan ${srv.title}?`)) deleteService(srv.id);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-polri-card border border-polri-gold rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fade-in relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">
              {editingItem ? 'Edit Pelayanan' : 'Tambah Pelayanan Baru'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nama Pelayanan</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: SKCK Online / SPKT"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Kategori Pelayanan</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="SKCK, SPKT, SIM, dll"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan ringkas jenis layanan ini..."
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Jam Operasional</label>
                <input
                  type="text"
                  required
                  value={operationalHours}
                  onChange={(e) => setOperationalHours(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Biaya / Tarif</label>
                <input
                  type="text"
                  required
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold shadow-glow-gold"
                >
                  Simpan Pelayanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
