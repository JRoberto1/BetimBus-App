// lib/rate-limit.ts
// Implementação super leve de In-Memory Rate Limit para Next.js Edge/Serverless.

type RateLimitRecord = {
  timestamp: number;
  count: number;
};

const limitCache = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string, limit: number = 30, windowMs: number = 60000): { success: boolean; currentCount: number } {
  const now = Date.now();
  const record = limitCache.get(ip);

  if (!record) {
    limitCache.set(ip, { timestamp: now, count: 1 });
    return { success: true, currentCount: 1 };
  }

  // Se já passou o tempo da janela limpa e recomeça
  if (now - record.timestamp > windowMs) {
    limitCache.set(ip, { timestamp: now, count: 1 });
    return { success: true, currentCount: 1 };
  }

  record.count += 1;
  limitCache.set(ip, record);

  // Limpa IPs velhos aleatoriamente pra não estourar memória na Vercel
  if (limitCache.size > 500) {
    const firstKey = limitCache.keys().next().value;
    if(firstKey) limitCache.delete(firstKey);
  }

  return {
    success: record.count <= limit,
    currentCount: record.count
  };
}
