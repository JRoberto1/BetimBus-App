'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Bus, ChevronRight, MapPin } from 'lucide-react';
import { calculateDistance, formatDistance } from '@/lib/geo';
import { useLocation } from '@/lib/useLocation';

interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  lines: string[];
}

export default function PontosHomeWrapper() {
  const [pontos, setPontos] = useState<Stop[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch('/data/pontos.json')
      .then(res => res.json())
      .then(data => setPontos(data))
      .catch(err => console.error('Failed to load pontos.json', err));
  }, []);

  const closestPoint = useMemo(() => {
    if (!pontos.length || !location.lat || !location.lon) return null;
    
    let minDiff = Infinity;
    let closest: (Stop & { distanceMeters: number }) | null = null;
    
    for (const p of pontos) {
      const dist = calculateDistance(location.lat, location.lon, p.lat, p.lon);
      if (dist < minDiff) {
        minDiff = dist;
        closest = { ...p, distanceMeters: dist };
      }
    }
    
    return closest;
  }, [pontos, location]);

  const hasGps = location.lat && location.lon;

  return (
    <>
      <div className="flex items-baseline justify-between px-1 border-b border-[rgba(255,255,255,0.05)] pb-2">
        <h2 className="text-xs font-bold tracking-[0.1em] text-brand-muted uppercase">PONTOS PRÓXIMOS</h2>
        {hasGps ? (
          <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse shadow-[0_0_12px_rgba(0,242,255,0.8)]"></span>
            GPS Ativo
          </span>
        ) : location.loading ? (
          <span className="text-[10px] text-brand-muted font-bold uppercase tracking-widest flex items-center gap-1.5">
            Buscando sinal...
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        {pontos.length === 0 ? (
           <div className="surface-card p-4 text-center">
             <span className="text-brand-muted text-xs animate-pulse">Carregando base de pontos...</span>
           </div>
        ) : closestPoint ? (
          <Link href={`/pontos/${closestPoint.id}`} prefetch={false} className="block">
            <div className="surface-card p-4 transition-all duration-200 hover:scale-[0.98] group relative overflow-hidden flex flex-col gap-2">
              <div className="absolute top-0 right-0 p-3 flex flex-col justify-end items-end gap-1">
                <span className="text-brand-secondary text-sm font-bold tracking-tighter">
                  {formatDistance(closestPoint.distanceMeters)}
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight pr-12 truncate">{closestPoint.name}</h3>
              </div>
              
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] pt-2 mt-1">
                <div className="flex items-center gap-2">
                  <Bus className="text-brand-secondary" size={14} />
                  <span className="text-[12px] font-bold text-white">Linhas: <span className="text-[11px] text-brand-muted bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded font-black tracking-widest">{closestPoint.lines.slice(0, 3).join(', ')}{closestPoint.lines.length > 3 ? '...' : ''}</span></span>
                </div>
                <ChevronRight className="text-brand-muted group-hover:translate-x-1 group-hover:text-brand-primary transition-all" size={18} />
              </div>
            </div>
          </Link>
        ) : (
          <Link href="/pontos" prefetch={false} className="block">
            <div className="surface-card p-5 group flex flex-col items-center justify-center gap-2 text-center hover:border-brand-primary transition-all">
               <MapPin className="text-brand-muted group-hover:text-brand-secondary transition-colors" size={24} />
               <div>
                  <span className="text-[13px] font-bold text-white block">Explorar mapa de paradas</span>
                  <span className="text-[11px] text-brand-muted font-bold">Ative a localização para ver pontos próximos</span>
               </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
