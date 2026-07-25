'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_CONFIG } from '@/data/siteConfig';
import { MOCK_SIM_SCHEDULE } from '@/data/mockSchedule';
import { SERVICES_DATA } from '@/data/services';

const SiteSettingsContext = createContext();

export function SiteSettingsProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT_SITE_CONFIG);
  const [schedules, setSchedules] = useState(MOCK_SIM_SCHEDULE);
  const [services, setServices] = useState(SERVICES_DATA);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Survei baru dari Budi Santoso (SKCK)", time: "10 menit lalu", read: false, type: "survey" },
    { id: 2, text: "Jadwal SIM Keliling di Ayani Mega Mall perlu diperbarui", time: "1 jam lalu", read: false, type: "warning" },
    { id: 3, text: "Survei kepuasan bulan ini mencapai 92%", time: "2 jam lalu", read: true, type: "info" }
  ]);

  const loadAll = async () => {
    try {
      const [resConfig, resSchedules, resServices] = await Promise.all([
        fetch('/api/config', { cache: 'no-store' }),
        fetch('/api/schedules', { cache: 'no-store' }),
        fetch('/api/services', { cache: 'no-store' })
      ]);

      if (resConfig.ok) {
        const configData = await resConfig.json();
        setConfig(configData);
      }
      if (resSchedules.ok) {
        const schedulesData = await resSchedules.json();
        setSchedules(schedulesData);
      }
      if (resServices.ok) {
        const servicesData = await resServices.json();
        setServices(servicesData);
      }
    } catch (err) {
      console.warn('API Error in SiteSettingsContext, fallback to local storage:', err);
      const savedConfig = localStorage.getItem('polsek_dwikora_site_config');
      const savedSchedules = localStorage.getItem('polsek_dwikora_schedules');
      const savedServices = localStorage.getItem('polsek_dwikora_services');

      if (savedConfig) try { setConfig(JSON.parse(savedConfig)); } catch (e) {}
      if (savedSchedules) try { setSchedules(JSON.parse(savedSchedules)); } catch (e) {}
      if (savedServices) try { setServices(JSON.parse(savedServices)); } catch (e) {}
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const updateConfig = async (newFields) => {
    const updated = { ...config, ...newFields };
    setConfig(updated);
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error('API Error updateConfig:', err);
      localStorage.setItem('polsek_dwikora_site_config', JSON.stringify(updated));
    }
  };

  // Schedule CRUD
  const addSchedule = async (item) => {
    const createdObj = {
      id: `sim-${Date.now()}`,
      status: "Mendatang",
      poster: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      ...item
    };
    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdObj)
      });
      if (res.ok) {
        const newSch = await res.json();
        setSchedules(prev => [newSch, ...prev]);
        return;
      }
    } catch (err) {
      console.error('API Error addSchedule:', err);
    }
    const updated = [createdObj, ...schedules];
    setSchedules(updated);
    localStorage.setItem('polsek_dwikora_schedules', JSON.stringify(updated));
  };

  const updateSchedule = async (id, fields) => {
    try {
      const res = await fetch(`/api/schedules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });
      if (res.ok) {
        const updatedSch = await res.json();
        setSchedules(prev => prev.map(s => s.id === id ? updatedSch : s));
        return;
      }
    } catch (err) {
      console.error('API Error updateSchedule:', err);
    }
    const updated = schedules.map(s => s.id === id ? { ...s, ...fields } : s);
    setSchedules(updated);
    localStorage.setItem('polsek_dwikora_schedules', JSON.stringify(updated));
  };

  const deleteSchedule = async (id) => {
    try {
      await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('API Error deleteSchedule:', err);
    }
    const updated = schedules.filter(s => s.id !== id);
    setSchedules(updated);
    localStorage.setItem('polsek_dwikora_schedules', JSON.stringify(updated));
  };

  // Services CRUD
  const addService = async (item) => {
    const createdObj = {
      id: `srv-item-${Date.now()}`,
      status: "Aktif",
      icon: "FileText",
      requirements: item.requirements || ["KTP Asli & Fotokopi", "Dokumen pendukung"],
      flow: item.flow || ["Datang ke loket", "Pemeriksaan berkas", "Penerbitan dokumen"],
      ...item
    };
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdObj)
      });
      if (res.ok) {
        const newSrv = await res.json();
        setServices(prev => [...prev, newSrv]);
        return;
      }
    } catch (err) {
      console.error('API Error addService:', err);
    }
    const updated = [...services, createdObj];
    setServices(updated);
    localStorage.setItem('polsek_dwikora_services', JSON.stringify(updated));
  };

  const updateService = async (id, fields) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });
      if (res.ok) {
        const updatedSrv = await res.json();
        setServices(prev => prev.map(s => s.id === id ? updatedSrv : s));
        return;
      }
    } catch (err) {
      console.error('API Error updateService:', err);
    }
    const updated = services.map(s => s.id === id ? { ...s, ...fields } : s);
    setServices(updated);
    localStorage.setItem('polsek_dwikora_services', JSON.stringify(updated));
  };

  const deleteService = async (id) => {
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('API Error deleteService:', err);
    }
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('polsek_dwikora_services', JSON.stringify(updated));
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <SiteSettingsContext.Provider value={{
      config,
      updateConfig,
      schedules,
      addSchedule,
      updateSchedule,
      deleteSchedule,
      services,
      addService,
      updateService,
      deleteService,
      notifications,
      markNotificationRead
    }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
