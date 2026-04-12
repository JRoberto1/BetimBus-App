import { NextResponse } from 'next/server';
import { getSessionId } from '@/lib/mobilibus';

export async function GET() {
  try {
    const sessionId = await getSessionId();
    return NextResponse.json({
      status: 'ok',
      session: 'ativa',
      fetched_session: sessionId !== null,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'erro',
        session: 'inativa_ou_com_falha',
        mensagem: error.message
      },
      { status: 500 }
    );
  }
}
