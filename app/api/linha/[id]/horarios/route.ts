import { NextResponse } from 'next/server';
import { getTimetable } from '@/lib/mobilibus';

export const revalidate = 43200; // Cache de 12 horas

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    // Se o dia não for providenciado, pega a data de hoje formatada (YYYY-MM-DD)
    const day = searchParams.get('dia') || new Date().toISOString().slice(0, 10);
    const { id } = await params;
    
    const timetable = await getTimetable(id, day);
    return NextResponse.json(timetable);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
