import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await db.getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching site config:', error);
    return NextResponse.json({ error: 'Gagal mengambil konfigurasi situs' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const newConfigData = await request.json();
    const updated = await db.updateConfig(newConfigData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json({ error: 'Gagal memperbarui konfigurasi situs' }, { status: 500 });
  }
}
