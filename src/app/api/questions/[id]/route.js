import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = await db.updateQuestion(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({ error: 'Gagal mengedit pertanyaan' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.deleteQuestion(id);
    return NextResponse.json({ success: true, message: 'Pertanyaan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ error: 'Gagal menghapus pertanyaan' }, { status: 500 });
  }
}
