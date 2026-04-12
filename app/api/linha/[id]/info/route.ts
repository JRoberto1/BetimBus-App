import { NextResponse } from 'next/server';
import { getRouteInfo } from '@/lib/mobilibus';

export const revalidate = 86400; // Cache longo (24 horas) na Vercel CDN

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const info = await getRouteInfo(id);
    return NextResponse.json(info);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
