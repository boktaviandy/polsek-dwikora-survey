import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const schedules = await db.getSchedules();
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Gagal mengambil jadwal SIM' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newSch = await db.addSchedule(body);
    return NextResponse.json(newSch);
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Gagal menambah jadwal' }, { status: 500 });
  }
}
