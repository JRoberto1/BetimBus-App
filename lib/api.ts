// lib/api.ts
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // URLs relativas no Client Side (Nativo)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR Vercel Preview
  return 'http://localhost:3000'; // Fallback Dev. Altere a porta para 3000 já que este agora centralizará o APP.
}
const API_URL = getBaseUrl();

export interface LinhaBasica {
  name: string;
  value: string; // value = ID da linha (routeId)
}

export async function getLinhas(): Promise<LinhaBasica[]> {
  try {
    const res = await fetch(`${API_URL}/api/linhas`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error('Falha ao carregar linhas');
    return res.json();
  } catch(e) {
    return [];
  }
}

export async function getLinhaInfo(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/linha/${id}/info`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error('Linha não encontrada');
    return res.json();
  } catch(e) {
    return null;
  }
}

export async function getHorarios(id: string, dia: string) {
  try {
    const res = await fetch(`${API_URL}/api/linha/${id}/horarios?dia=${dia}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Horários indisponíveis');
    return res.json();
  } catch(e) {
    return { error: true };
  }
}

export async function getTempoReal(id: string, stopId: number | string = 0, routeName: string = '') {
  // Essa request nunca pode ter cache pois lida com a localização atual dos ônibus em movimento
  try {
    const res = await fetch(
      `${API_URL}/api/linha/${id}/tempo-real?stopId=${stopId}&routeName=${routeName}`, 
      { cache: 'no-store' }
    );
    
    if (!res.ok) return { semSinal: true };
    return res.json();
  } catch(e) {
    return { semSinal: true };
  }
}
