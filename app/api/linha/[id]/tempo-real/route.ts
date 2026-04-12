import { NextResponse } from 'next/server';
import { getRealtimeInfo } from '@/lib/mobilibus';

export const dynamic = 'force-dynamic'; // Rota 100% Viva. Bypass de Cache.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const stopId = searchParams.get('stopId') || '0';
    const routeName = searchParams.get('routeName') || '';
    const { id } = await params;

    const data = await getRealtimeInfo(id, stopId, routeName);
    
    // Tratando cenários ondem não há ônibus ativos
    if (!data.vehicles || data.vehicles.length === 0) {
      return NextResponse.json({ semSinal: true, data });
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }
}
