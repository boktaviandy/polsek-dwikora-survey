'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  HelpCircle, 
  Palette, 
  Briefcase, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  Menu, 
  X, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export default function AdminSidebar({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { config, notifications, markNotificationRead } = useSiteSettings();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard, roles: ['Administrator', 'Operator', 'Petugas'] },
    { href: '/admin/hasil', label: 'Hasil Survey & Export', icon: FileSpreadsheet, roles: ['Administrator', 'Operator', 'Petugas'] },
    { href: '/admin/survey', label: 'Kelola Pertanyaan', icon: HelpCircle, roles: ['Administrator', 'Operator'] },
    { href: '/admin/tampilan', label: 'Kelola Tampilan Web', icon: Palette, roles: ['Administrator'] },
    { href: '/admin/pelayanan', label: 'Kelola Pelayanan', icon: Briefcase, roles: ['Administrator', 'Operator'] },
    { href: '/admin/jadwal', label: 'Kelola SIM Keliling', icon: Calendar, roles: ['Administrator', 'Operator'] },
    { href: '/admin/pengguna', label: 'Kelola Hak Akses', icon: Users, roles: ['Administrator'] },
    { href: '/admin/pengaturan', label: 'Pengaturan Website', icon: Settings, roles: ['Administrator'] },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-polri-dark flex flex-col lg:flex-row antialiased">
      
      {/* Mobile Topbar */}
      <div className="lg:hidden bg-polri-navy border-b border-polri-gold/20 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-polri-gold" />
          <span className="font-bold text-white text-sm">Admin Panel Polsek Dwikora</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:bg-polri-card"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-polri-navy border-r border-polri-gold/20 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="space-y-6 p-4">
          
          {/* Header Identity */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 pt-2">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-polri-gold p-0.5 shadow-glow-gold flex items-center justify-center">
                <div className="w-full h-full bg-polri-dark rounded-[8px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-polri-gold" />
                </div>
              </div>
              <div>
                <h2 className="font-extrabold text-white text-sm tracking-tight">Admin Polsek</h2>
                <span className="text-[11px] text-polri-gold font-semibold">Dwikora Pontianak</span>
              </div>
            </Link>
          </div>

          {/* Active User Badge */}
          {user && (
            <div className="p-3 rounded-xl bg-polri-card/90 border border-slate-800 flex items-center gap-3">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                alt={user.nama}
                className="w-9 h-9 rounded-full object-cover border border-polri-gold"
              />
              <div className="overflow-hidden">
                <h3 className="text-xs font-bold text-white truncate">{user.nama}</h3>
                <span className={`inline-block px-1.5 py-0.2 text-[10px] font-extrabold rounded ${
                  user.role === 'Administrator' ? 'bg-polri-gold text-polri-dark' : 'bg-blue-600 text-white'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasAccess = user && item.roles.includes(user.role);

              if (!hasAccess) return null;

              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-polri-gold text-polri-dark font-bold shadow-glow-gold'
                      : 'text-slate-300 hover:text-white hover:bg-polri-card/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-polri-card transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Public Site
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-polri-gold">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>

      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Bar with Notifications */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-polri-navy/60 border-b border-polri-gold/20 backdrop-blur-md sticky top-0 z-30">
          <div>
            <span className="text-xs text-slate-400">Panel Manajemen Portal</span>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider">Polsek Dwikora Pontianak</h1>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdown(!notifDropdown)}
                className="p-2 rounded-xl bg-polri-card border border-slate-700 text-slate-300 hover:text-white relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-polri-card border border-polri-gold/40 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-white">Notifikasi Admin</span>
                    <span className="text-[10px] text-polri-gold font-bold">{unreadCount} Baru</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs space-y-1 cursor-pointer transition-colors ${
                          n.read ? 'bg-polri-dark/40 text-slate-400' : 'bg-polri-blue/20 text-slate-200 border border-blue-500/30'
                        }`}
                      >
                        <p className="font-semibold">{n.text}</p>
                        <span className="text-[10px] text-slate-400 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}
