'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('admin@polsekdwikora.id');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleDoLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (res.success) {
      router.push('/admin');
    } else {
      setError('Login gagal. Silakan periksa kembali email dan kata sandi Anda.');
    }
  };

  const handleQuickDemoRole = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    const res = login(demoEmail, 'password123');
    if (res.success) {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-polri-dark via-polri-navy to-polri-dark flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-polri-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-polri-card/90 border border-polri-gold/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-polri-gold to-yellow-300 p-0.5 shadow-glow-gold flex items-center justify-center">
            <div className="w-full h-full bg-polri-dark rounded-[14px] flex items-center justify-center">
              <Shield className="w-8 h-8 text-polri-gold" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Login Portal Admin</h1>
            <p className="text-xs text-polri-gold font-semibold uppercase tracking-wider mt-0.5">Polsek Dwikora Pontianak</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleDoLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">Email Administrator</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@polsekdwikora.id"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">Kata Sandi (Password)</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm focus:outline-none focus:border-polri-gold"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-extrabold text-sm shadow-glow-gold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <span>Masuk Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Quick Demo Credentials */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider text-center">
            Uji Coba Hak Akses (Demo Mode):
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemoRole('admin@polsekdwikora.id')}
              className="p-2 rounded-xl bg-polri-dark hover:bg-slate-800 border border-polri-gold/40 text-[10px] font-bold text-polri-gold"
            >
              Administrator
            </button>
            <button
              onClick={() => handleQuickDemoRole('operator@polsekdwikora.id')}
              className="p-2 rounded-xl bg-polri-dark hover:bg-slate-800 border border-blue-500/40 text-[10px] font-bold text-blue-400"
            >
              Operator
            </button>
            <button
              onClick={() => handleQuickDemoRole('petugas@polsekdwikora.id')}
              className="p-2 rounded-xl bg-polri-dark hover:bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300"
            >
              Petugas
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
