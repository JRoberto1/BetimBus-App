import { NextResponse } from 'next/server';
import { ROUTES } from '@/lib/linhas';

export async function GET() {
  // Retorna o array hardcoded sem nenhum tratamento especial
  // Esta rota é extremamente rápida e pode ser cacheadamente quase que para sempre.
  return NextResponse.json(ROUTES);
}
