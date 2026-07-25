'use client';

import React, { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { exportToCSV, exportToExcel, exportToPDF } from '@/lib/exportHelpers';
import { SERVICE_TYPES } from '@/data/surveyQuestions';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  X, 
  Calendar, 
  Phone, 
  User, 
  ShieldCheck 
} from 'lucide-react';

export default function HasilSurveyPage() {
  const { surveys, questions, deleteSurvey } = useSurvey();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('Semua');
  const [selectedGender, setSelectedGender] = useState('Semua');
  const [dateFilter, setDateFilter] = useState('');
  
  const [detailItem, setDetailItem] = useState(null);

  // Filter Logic
  const filteredSurveys = surveys.filter((s) => {
    const matchSearch = 
      (s.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.noHp || '').includes(searchTerm) ||
      (s.id || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchService = selectedService === 'Semua' || s.jenisPelayanan === selectedService;
    const matchGender = selectedGender === 'Semua' || s.jenisKelamin === selectedGender;
    
    let matchDate = true;
    if (dateFilter) {
      const sDate = new Date(s.createdAt).toISOString().split('T')[0];
      matchDate = sDate === dateFilter;
    }

    return matchSearch && matchService && matchGender && matchDate;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Title & Export Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Hasil & Laporan Real-Time</span>
          <h1 className="text-2xl font-extrabold text-white">Data Survei Responden</h1>
          <p className="text-xs text-slate-400 mt-0.5">Total Responden Terbaca: <strong className="text-polri-gold">{filteredSurveys.length}</strong> data</p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportToExcel(filteredSurveys)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={() => exportToPDF(filteredSurveys)}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => exportToCSV(filteredSurveys)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Filter className="w-4 h-4 text-polri-gold" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Filter Data Responden</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Cari Nama / No HP / ID</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Kata kunci..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Service Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Jenis Pelayanan</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
            >
              <option value="Semua">Semua Pelayanan</option>
              {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Gender Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Jenis Kelamin</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
            >
              <option value="Semua">Semua Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Tanggal Pengisian</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
            />
          </div>

        </div>
      </div>

      {/* Main Table */}
      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polri-dark text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Pelayanan</th>
                <th className="px-4 py-3">Kritik & Saran</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredSurveys.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500 italic">
                    Tidak ada data survei yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredSurveys.map((item) => (
                  <tr key={item.id} className="hover:bg-polri-dark/50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-polri-gold">{item.id}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">{item.nama}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{item.noHp}</td>
                    <td className="px-4 py-3">{item.jenisKelamin}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">
                        {item.jenisPelayanan}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate text-slate-400">
                      {item.kritiksaran || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setDetailItem(item)}
                          className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Detail Responden"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus data survei ID ${item.id}?`)) {
                              deleteSurvey(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-600/30 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Responden */}
      {detailItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-polri-card border border-polri-gold rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setDetailItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-polri-gold font-bold">{detailItem.id}</span>
              <h2 className="text-xl font-bold text-white">Detail Responden Survei</h2>
            </div>

            {/* Responden Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-polri-dark/90 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Nama Lengkap</span>
                <strong className="text-white text-sm">{detailItem.nama}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Nomor HP</span>
                <strong className="text-emerald-400 text-sm">{detailItem.noHp}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Jenis Kelamin</span>
                <strong className="text-white text-sm">{detailItem.jenisKelamin}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Pelayanan</span>
                <strong className="text-polri-gold text-sm">{detailItem.jenisPelayanan}</strong>
              </div>
            </div>

            {/* Questions & Answers List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-polri-gold uppercase tracking-wider">
                Jawaban Pertanyaan Survei:
              </h3>
              <div className="space-y-2">
                {questions.map((q, idx) => {
                  const ans = detailItem.answers?.[q.id] || '-';
                  return (
                    <div key={q.id} className="p-3 rounded-xl bg-polri-dark/60 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium pr-4">{idx + 1}. {q.question}</span>
                      <span className={`px-2.5 py-1 rounded-lg font-bold shrink-0 ${
                        ans === 'Sangat Baik' ? 'bg-emerald-500/20 text-emerald-400' :
                        ans === 'Baik' ? 'bg-blue-500/20 text-blue-400' :
                        ans === 'Cukup' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {ans}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kritik & Saran */}
            <div className="p-4 rounded-2xl bg-polri-dark/90 border border-slate-800 space-y-1 text-xs">
              <span className="text-slate-400 font-bold block uppercase tracking-wider">Kritik & Saran:</span>
              <p className="text-slate-200 italic leading-relaxed">
                "{detailItem.kritiksaran || 'Tidak memberikan kritik atau saran.'}"
              </p>
            </div>

            <div className="text-[11px] text-slate-500 text-right">
              Waktu Pengisian: {new Date(detailItem.createdAt).toLocaleString('id-ID')}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
