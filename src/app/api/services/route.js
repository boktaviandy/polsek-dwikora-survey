import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await db.getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Gagal mengambil layanan' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newSrv = await db.addService(body);
    return NextResponse.json(newSrv);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Gagal membuat layanan' }, { status: 500 });
  }
}
