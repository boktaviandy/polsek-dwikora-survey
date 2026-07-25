import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.deleteSurvey(id);
    return NextResponse.json({ success: true, message: 'Survei berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting survey:', error);
    return NextResponse.json({ error: 'Gagal menghapus survei' }, { status: 500 });
  }
}
