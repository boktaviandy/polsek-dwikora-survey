import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const questions = await db.getQuestions();
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Gagal mengambil data pertanyaan' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newQ = await db.addQuestion(body);
    return NextResponse.json(newQ);
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Gagal membuat pertanyaan baru' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const questionsList = await request.json();
    if (!Array.isArray(questionsList)) {
      return NextResponse.json({ error: 'Payload harus berupa array' }, { status: 400 });
    }
    const updatedAll = await db.reorderQuestions(questionsList);
    return NextResponse.json(updatedAll);
  } catch (error) {
    console.error('Error reordering questions:', error);
    return NextResponse.json({ error: 'Gagal memperbarui urutan pertanyaan' }, { status: 500 });
  }
}
