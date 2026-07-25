'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { useAuth } from '@/context/AuthContext';
import { Shield, Menu, X, UserCheck, LayoutDashboard, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { config } = useSiteSettings();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in admin route (except admin login), Navbar will be rendered by AdminSidebar instead or suppressed
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Beranda & Survey' },
    { href: '/informasi', label: 'Informasi Pelayanan' },
    { href: '/jadwal-sim', label: 'Jadwal SIM Keliling' },
    { href: '/kontak', label: 'Kontak Polsek' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-polri-navy/90 backdrop-blur-md border-b border-polri-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-polri-gold to-yellow-300 p-0.5 shadow-glow-gold flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-polri-dark rounded-[10px] flex items-center justify-center overflow-hidden">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt="Logo Polri" className="w-8 h-8 object-contain" />
                ) : (
                  <Shield className="w-6 h-6 text-polri-gold" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-wider text-polri-gold uppercase">Polresta Pontianak</span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-polri-gold/20 text-polri-gold border border-polri-gold/30 rounded">Presisi</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight group-hover:text-polri-gold transition-colors">
                {config.policeName}
              </h1>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-polri-gold text-polri-dark font-bold shadow-glow-gold'
                      : 'text-slate-200 hover:text-polri-gold hover:bg-polri-card/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Admin Login / Dashboard Shortcut */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-polri-blue hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-md border border-blue-400/30"
              >
                <LayoutDashboard className="w-4 h-4 text-polri-gold" />
                <span>Dashboard Admin</span>
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all border border-slate-700 hover:border-polri-gold/40"
              >
                <UserCheck className="w-4 h-4 text-polri-gold" />
                <span>Portal Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-polri-card focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-polri-dark/95 backdrop-blur-xl border-b border-polri-gold/20 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-polri-gold text-polri-dark font-bold'
                    : 'text-slate-200 hover:bg-polri-card'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            );
          })}
          <div className="pt-2">
            {user ? (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-polri-blue text-white font-semibold"
              >
                <LayoutDashboard className="w-5 h-5 text-polri-gold" />
                <span>Dashboard Admin ({user.role})</span>
              </Link>
            ) : (
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700"
              >
                <UserCheck className="w-5 h-5 text-polri-gold" />
                <span>Portal Admin</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
