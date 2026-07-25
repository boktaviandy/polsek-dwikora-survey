'use client';

import React, { useEffect, useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Smile, 
  FileSpreadsheet, 
  HelpCircle, 
  Calendar, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboardPage() {
  const { surveys, calculateStats } = useSurvey();
  const { user } = useAuth();
  const stats = calculateStats();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Chart 1: Doughnut Chart Data (Kepuasan)
  const pieData = {
    labels: ['Sangat Baik', 'Baik', 'Cukup', 'Kurang'],
    datasets: [
      {
        data: [
          stats.distribution['Sangat Baik'] || 0,
          stats.distribution['Baik'] || 0,
          stats.distribution['Cukup'] || 0,
          stats.distribution['Kurang'] || 0,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
        borderColor: '#101F33',
        borderWidth: 2,
      },
    ],
  };

  // Chart 2: Bar Chart Data (By Service Type)
  const serviceCounts = {};
  surveys.forEach(s => {
    const type = s.jenisPelayanan || 'Lainnya';
    serviceCounts[type] = (serviceCounts[type] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(serviceCounts).length ? Object.keys(serviceCounts) : ['SKCK', 'SPKT', 'SIM', 'Pengaduan'],
    datasets: [
      {
        label: 'Jumlah Responden',
        data: Object.keys(serviceCounts).length ? Object.values(serviceCounts) : [12, 8, 15, 5],
        backgroundColor: 'rgba(212, 175, 55, 0.8)',
        borderColor: '#D4AF37',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94A3B8', font: { size: 11 } }
      }
    },
    scales: {
      x: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-polri-card via-polri-navy to-polri-card border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Selamat Datang,</span>
          <h1 className="text-2xl font-extrabold text-white">{user?.nama || 'Administrator'}</h1>
          <p className="text-xs text-slate-400 mt-0.5">Role Access: <strong className="text-polri-gold">{user?.role}</strong> • Portal Survei Polsek Dwikora</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/hasil"
            className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Lihat All Hasil & Export</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="bg-polri-card/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Survey</span>
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.totalSurveys}</div>
            <p className="text-xs text-slate-400 mt-1">Keseluruhan responden</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-polri-card/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Survey Hari Ini</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">{stats.todaySurveys}</div>
            <p className="text-xs text-slate-400 mt-1">Pengisian 24 jam terakhir</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-polri-card/90 border border-polri-gold/40 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nilai Indeks (IKM)</span>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-polri-gold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-polri-gold">{stats.ikmScore}</div>
            <p className="text-xs text-emerald-400 mt-1">Kategori: A (Sangat Baik)</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-polri-card/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kepuasan Responden</span>
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.satisfactionRate}%</div>
            <p className="text-xs text-slate-400 mt-1">Rata-rata tanggapan positif</p>
          </div>
        </div>

      </div>

      {/* 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Doughnut Chart: Distributi Kepuasan */}
        <div className="lg:col-span-5 bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Persentase Kepuasan Responden
          </h2>
          <div className="h-64 relative flex items-center justify-center">
            <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94A3B8' } } } }} />
          </div>
        </div>

        {/* Bar Chart: Responden Per Jenis Pelayanan */}
        <div className="lg:col-span-7 bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Statistik Survei Berdasarkan Jenis Pelayanan
          </h2>
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

      </div>

      {/* Recent Surveys Table */}
      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">Survei Terbaru Masuk</h2>
          <Link href="/admin/hasil" className="text-xs font-bold text-polri-gold hover:underline flex items-center gap-1">
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polri-dark text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Jenis Pelayanan</th>
                <th className="px-4 py-3">Kritik & Saran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {surveys.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-polri-dark/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-polri-gold">{s.id}</td>
                  <td className="px-4 py-3 text-slate-400">{new Date(s.createdAt).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3 font-semibold text-white">{s.nama}</td>
                  <td className="px-4 py-3 text-slate-400">{s.noHp}</td>
                  <td className="px-4 py-3">{s.jenisKelamin}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">
                      {s.jenisPelayanan}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-400">{s.kritiksaran || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
