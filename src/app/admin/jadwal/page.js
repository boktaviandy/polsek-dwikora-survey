'use client';

import React, { useState } from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Calendar, Plus, Edit3, Trash2, X, MapPin, Clock, Eye, Upload, RefreshCw } from 'lucide-react';

export default function KelolaJadwalPage() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } = useSiteSettings();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [tanggal, setTanggal] = useState('');
  const [hari, setHari] = useState('Senin');
  const [lokasi, setLokasi] = useState('');
  const [jam, setJam] = useState('08:00 - 12:00 WIB');
  const [keterangan, setKeterangan] = useState('Melayani Perpanjangan SIM A & C');
  const [poster, setPoster] = useState('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80');
  const [status, setStatus] = useState('Mendatang');
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTanggal(new Date().toISOString().split('T')[0]);
    setHari('Selasa');
    setLokasi('Ayani Mega Mall Pontianak');
    setJam('08.00–12.00 WIB');
    setKeterangan('Melayani Perpanjangan SIM A & SIM C');
    setPoster('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80');
    setStatus('Mendatang');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setTanggal(item.tanggal);
    setHari(item.hari);
    setLokasi(item.lokasi);
    setJam(item.jam);
    setKeterangan(item.keterangan || '');
    setPoster(item.poster || '');
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setPoster(data.url);
      } else {
        alert(data.error || 'Gagal mengunggah file poster.');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Terjadi kesalahan saat mengunggah file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!lokasi.trim()) return;

    if (editingItem) {
      updateSchedule(editingItem.id, {
        tanggal,
        hari,
        lokasi,
        jam,
        keterangan,
        poster,
        status
      });
    } else {
      addSchedule({
        tanggal,
        hari,
        lokasi,
        jam,
        keterangan,
        poster,
        status
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Satlantas Polresta</span>
          <h1 className="text-2xl font-extrabold text-white">Kelola Jadwal SIM Keliling</h1>
          <p className="text-xs text-slate-400 mt-0.5">Tambah lokasi, tentukan jam operasional, upload poster, dan ubah status jadwal.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Jadwal Baru</span>
        </button>
      </div>

      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polri-dark text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Tanggal & Hari</th>
                <th className="px-4 py-3">Lokasi Pelayanan</th>
                <th className="px-4 py-3">Jam Operasional</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {schedules.map((item) => (
                <tr key={item.id} className="hover:bg-polri-dark/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">
                    {item.hari}, {item.tanggal}
                  </td>
                  <td className="px-4 py-3 font-bold text-polri-gold max-w-xs">{item.lokasi}</td>
                  <td className="px-4 py-3">{item.jam}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-400">{item.keterangan}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Mendatang' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-polri-gold hover:bg-polri-gold hover:text-polri-dark transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus jadwal di ${item.lokasi}?`)) deleteSchedule(item.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
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
              {editingItem ? 'Edit Jadwal SIM Keliling' : 'Tambah Jadwal SIM Keliling'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Hari</label>
                  <input
                    type="text"
                    required
                    value={hari}
                    onChange={(e) => setHari(e.target.value)}
                    placeholder="Senin / Selasa / dll"
                    className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Lokasi Pelayanan</label>
                <input
                  type="text"
                  required
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Contoh: Ayani Mega Mall Pontianak"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Jam Operasional</label>
                <input
                  type="text"
                  required
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  placeholder="08.00–12.00 WIB"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Status Operasional</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                >
                  <option value="Mendatang">Mendatang</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              {/* Upload Poster File */}
              <div className="space-y-2 p-3 rounded-xl bg-polri-dark/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300">Poster Informasi SIM Keliling</label>
                  {isUploading && (
                    <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Mengunggah...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-polri-gold/20 hover:bg-polri-gold hover:text-polri-dark text-polri-gold font-bold text-xs border border-polri-gold/40 cursor-pointer transition-colors shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload Poster</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Atau URL gambar poster..."
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-polri-dark border border-slate-700 text-white text-[11px] focus:outline-none focus:border-polri-gold"
                  />
                </div>
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
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
