// lib/mobilibus.ts
const BASE_URL = 'https://editor.mobilibus.com';
const PROJECT_ID = '58mjg';

// Variáveis em memória (persistem brevemente no ciclo de vida da Serverless/Edge function)
let cachedSessionId: string | null = null;
let sessionExpiresAt: number = 0;

/**
 * Faz um bypass para resgatar o cookie JSESSIONID de forma automática
 * visitando a página inicial do projeto, como se fôssemos o front-end web original.
 */
export async function getSessionId(): Promise<string> {
  // Se ainda temos o ID na memória e não se passaram os 30 mins, reusa:
  if (cachedSessionId && Date.now() < sessionExpiresAt) {
    return cachedSessionId;
  }

  try {
    const res = await fetch(`${BASE_URL}/web/bus2you/${PROJECT_ID}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Falha ao bater no site da Mobilibus. Status: ${res.status}`);
    }

    const setCookie = res.headers.get('set-cookie');
    if (!setCookie) {
      // Tentar ler dos headers raw se houver problemas de parser
      throw new Error('Nenhum cabeçalho Set-Cookie encontrado na resposta.');
    }

    // Extrair o id (ex: JSESSIONID=blablabla.0470bed)
    const match = setCookie.match(/JSESSIONID=([^;]+)/);
    if (match && match[1]) {
      cachedSessionId = match[1];
      // Renova o cache valendo por 30 minutos (após isso forçará resgatar o cookie novamente)
      sessionExpiresAt = Date.now() + 30 * 60 * 1000;
      return cachedSessionId;
    }

    throw new Error('JSESSIONID não encontrado no Set-Cookie da Mobilibus.');
  } catch (err) {
    console.error('[Mobilibus Auth Error]', err);
    throw err;
  }
}

async function getHeaders() {
  const sessionId = await getSessionId();
  return {
    'Content-Type': 'application/json',
    'Cookie': `JSESSIONID=${sessionId}`,
    'Origin': BASE_URL,
    'Referer': `${BASE_URL}/web/bus2you/${PROJECT_ID}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'application/json, text/plain, */*'
  };
}

export async function getRouteInfo(routeId: string) {
  const res = await fetch(`${BASE_URL}/web/get-route-info`, {
    method: 'POST',
    headers: await getHeaders(),
    body: routeId, // string pura, requisição baseada em text
  });
  if (!res.ok) throw new Error(`Erro na API [get-route-info]: ${res.status}`);
  return res.json();
}

export async function getTimetable(routeId: string, day: string) {
  const res = await fetch(`${BASE_URL}/web/get-timetable-by-day`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({ route: routeId, day, project: PROJECT_ID }),
  });
  if (!res.ok) throw new Error(`Erro na API [get-timetable-by-day]: ${res.status}`);
  return res.json();
}

export async function getRealtimeInfo(routeId: string, stopId: number | string = 0, routeName: string = '') {
  const res = await fetch(`${BASE_URL}/web/get-route-realtime-info`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({
      project: PROJECT_ID,
      route: routeId,
      stopId: stopId.toString(),
      routeName,
    }),
  });
  if (!res.ok) throw new Error(`Erro na API [get-route-realtime-info]: ${res.status}`);
  return res.json();
}
