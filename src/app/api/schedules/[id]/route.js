import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = await db.updateSchedule(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Gagal mengedit jadwal' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.deleteSchedule(id);
    return NextResponse.json({ success: true, message: 'Jadwal berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json({ error: 'Gagal menghapus jadwal' }, { status: 500 });
  }
}
