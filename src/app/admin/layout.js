'use client';

import React from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <AdminSidebar>
      {children}
    </AdminSidebar>
  );
}
