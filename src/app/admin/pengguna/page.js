'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, Plus, Edit3, Trash2, X, Shield, Lock, Check } from 'lucide-react';

export default function KelolaPenggunaPage() {
  const { users, addUser, updateUser, deleteUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Operator');

  const handleOpenAdd = () => {
    setEditingUser(null);
    setNama('');
    setEmail('');
    setRole('Operator');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (usr) => {
    setEditingUser(usr);
    setNama(usr.nama);
    setEmail(usr.email);
    setRole(usr.role);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim()) return;

    if (editingUser) {
      updateUser(editingUser.id, { nama, email, role });
    } else {
      addUser({ nama, email, role });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Role-Based Access Control</span>
          <h1 className="text-2xl font-extrabold text-white">Kelola Pengguna & Hak Akses</h1>
          <p className="text-xs text-slate-400 mt-0.5">Kelola akun personel Polsek (Administrator, Operator, dan Petugas).</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polri-dark text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">Email Login</th>
                <th className="px-4 py-3">Peran (Role)</th>
                <th className="px-4 py-3">Hak Akses Sistem</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((usr) => (
                <tr key={usr.id} className="hover:bg-polri-dark/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-white flex items-center gap-3">
                    <img src={usr.avatar} alt={usr.nama} className="w-8 h-8 rounded-full border border-polri-gold object-cover" />
                    <span>{usr.nama}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{usr.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold ${
                      usr.role === 'Administrator' ? 'bg-polri-gold text-polri-dark' :
                      usr.role === 'Operator' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {usr.role === 'Administrator' && 'Akses Penuh Seluruh Sistem'}
                    {usr.role === 'Operator' && 'Kelola Survei, Jadwal & Pelayanan'}
                    {usr.role === 'Petugas' && 'Melihat Hasil & Laporan (Read-Only)'}
                  </td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">{usr.status}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(usr)}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-polri-gold hover:bg-polri-gold hover:text-polri-dark transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus pengguna ${usr.nama}?`)) deleteUser(usr.id);
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

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-polri-card border border-polri-gold rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-fade-in relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">
              {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nama Lengkap & Pangkat</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Bripka Syarifuddin"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Email Login</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@polsekdwikora.id"
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Role / Hak Akses</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white focus:outline-none focus:border-polri-gold"
                >
                  <option value="Administrator">Administrator (Akses Penuh)</option>
                  <option value="Operator">Operator (Kelola Data)</option>
                  <option value="Petugas">Petugas (Lihat Hasil / Read-Only)</option>
                </select>
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
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
