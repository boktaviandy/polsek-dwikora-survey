import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = await db.updateService(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Gagal mengedit layanan' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.deleteService(id);
    return NextResponse.json({ success: true, message: 'Layanan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Gagal menghapus layanan' }, { status: 500 });
  }
}
