'use client';
import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Bus, ChevronRight, Menu, Map } from 'lucide-react';
import Link from 'next/link';
import { calculateDistance, formatDistance } from '@/lib/geo';
import { useLocation } from '@/lib/useLocation';
import { BackButton } from '@/components/ui/BackButton';

// Type definitions
interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  lines: string[];
}

export default function PontosPage() {
  const [pontos, setPontos] = useState<Stop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Fetch local json file
    fetch('/data/pontos.json')
      .then(res => res.json())
      .then(data => setPontos(data))
      .catch(err => console.error('Failed to load pontos.json', err));
  }, []);

  // Filter and sort points
  const displayedPontos = useMemo(() => {
    let filtered = pontos;

    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.lines.some(l => l.includes(lowerQuery)));
    }

    if (location.lat && location.lon) {
      // Calculate distances mapping
      const withDistance = filtered.map(p => ({
        ...p,
        distanceMeters: calculateDistance(location.lat!, location.lon!, p.lat, p.lon)
      }));
      // Sort by distance
      withDistance.sort((a, b) => a.distanceMeters - b.distanceMeters);
      return withDistance;
    }

    // Default sorting (alphabetical) if no GPS
    return filtered.slice(0, 50); // Just limit to 50 when not searching/gps
  }, [pontos, searchQuery, location]);

  const hasGps = location.lat && location.lon;

  // Decide what to show (first 10 max to not freeze UI)
  const resultsToRender = displayedPontos.slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-brand-bg">
      
      {/* Header */}
      <header className="bg-brand-bg flex justify-between items-center w-full px-6 py-4 h-16 sticky top-0 z-50 border-b border-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-black tracking-tighter text-white uppercase">Paradas</h1>
        </div>
      </header>

      <div className="px-5 pt-8 space-y-10">
        
        {/* Section: Search Input */}
        <section>
          <div className="block relative group cursor-text">
            <div className="absolute inset-y-0 left-0 w-1 bg-brand-secondary rounded-l-xl opacity-100 transition-opacity duration-300"></div>
            <div className="w-full bg-brand-surface border border-[rgba(0,242,255,0.3)] rounded-xl py-4 pl-12 pr-4 shadow-[0_0_15px_rgba(0,242,255,0.1)] flex items-center transition-all bg-[#1b253b]">
              <MapPin className="absolute left-4 text-brand-secondary" size={20} />
              <input 
                 type="text"
                 placeholder="Digite o nome, ponto ou linha..."
                 className="bg-transparent border-none text-white text-[16px] w-full focus:outline-none focus:ring-0 placeholder:text-brand-muted"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 autoFocus
              />
            </div>
          </div>
        </section>

        {/* Section: Resultados */}
        <section className="space-y-6 min-h-[300px]">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="text-xs font-bold tracking-[0.1em] text-brand-muted uppercase">
              {searchQuery ? 'RESULTADOS DA BUSCA' : hasGps ? 'PONTOS PRÓXIMOS (SINAL GPS)' : 'TODOS OS PONTOS'}
            </h2>
            {hasGps && !searchQuery && (
              <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse shadow-[0_0_12px_rgba(0,242,255,0.8)]"></span>
                Detectado
              </span>
            )}
            {location.loading && !hasGps && (
              <span className="text-[10px] text-brand-muted font-bold uppercase tracking-widest flex items-center gap-1.5">
                Buscando sinal...
              </span>
            )}
          </div>

          <div className="space-y-4">
            {pontos.length === 0 ? (
               <div className="text-center text-brand-muted text-sm py-10 animate-pulse">Carregando base de pontos...</div>
            ) : resultsToRender.length === 0 ? (
               <div className="text-center text-brand-muted text-sm py-10">Nenhum ponto encontrado.</div>
            ) : (
              resultsToRender.map((ponto: any, index) => (
                <Link href={`/pontos/${ponto.id}`} prefetch={false} key={`${ponto.id}-${index}`} className="block">
                  <div className="surface-card p-5 group relative overflow-hidden flex flex-col gap-3 transition-all duration-200 hover:scale-[0.98] active:scale-[0.97]">
                    {ponto.distanceMeters !== undefined && (
                      <div className="absolute top-0 right-0 p-4">
                        <span className="text-brand-secondary text-sm font-bold tracking-tighter">
                          {formatDistance(ponto.distanceMeters)}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight leading-tight pr-12">{ponto.name}</h3>
                      <p className="text-[11px] text-brand-muted font-bold tracking-wider mt-1.5">PARADA DE ÔNIBUS</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center mt-1">
                      {ponto.lines.slice(0, 5).map((linha: string) => (
                        <span key={linha} className="bg-[rgba(0,242,255,0.1)] text-brand-secondary px-2.5 py-1 rounded-md text-[11px] font-black tracking-tight border border-[rgba(0,242,255,0.2)]">
                          {linha}
                        </span>
                      ))}
                      {ponto.lines.length > 5 && (
                        <span className="bg-[#121826] text-brand-muted px-2.5 py-1 rounded-md text-[11px] font-black border border-[rgba(255,255,255,0.05)]">
                          +{ponto.lines.length - 5}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] pt-3">
                      <div className="flex items-center gap-2.5">
                        <Map className="text-brand-muted" size={16} />
                        <span className="text-[13px] font-bold text-brand-muted group-hover:text-white transition-colors">Acessar linhas da parada</span>
                      </div>
                      <ChevronRight className="text-brand-muted group-hover:translate-x-1 group-hover:text-brand-primary transition-all" size={18} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Mapa Banner Minimalista */}
        <section className="overflow-hidden rounded-[24px] h-[220px] relative shadow-[0_20px_40px_rgba(0,123,255,0.06)] border border-[rgba(255,255,255,0.03)] bg-gradient-to-tr from-[#080e1c] to-[#00f2ff]/10">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5TKcDGz6q0PU8kvhipl8_2lc_Esg1Tv9uCQ039XLmbvqEdNksCrZjL_Sm-LMJfvttGqlZeWIPnlRqQGSMutDq0C0GQxnYTCcB2JRT4l0Oej2pzjkPlkARLkRhfPojY1odPAf1pZnDQ2tfhHfrsaXIzaIi_r8bwlFcQWoLK5eHGaHfy9o6mkML_4r3O81Icc6_8W4hu2y90d49nNbYBQltW-U7bbL7RqewELnI6b7q5pDSENMgT1zQWAfNUnOje4S8zW3C8rSYHEPK"
            alt="Mapa abstrato de Betim"
            className="w-full h-full object-cover saturate-100 mix-blend-screen opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent"></div>
          
          <div className="absolute bottom-5 left-5 right-5 flex justify-center z-10">
            <Link href="/mapa" className="bg-brand-primary text-white font-bold px-8 py-3.5 rounded-xl text-[15px] transition-all duration-200 active:scale-95 shadow-[0_8px_20px_rgba(0,123,255,0.3)] hover:bg-blue-600 w-full text-center flex items-center justify-center gap-2">
                <MapPin size={18} />
                Explorar Paradas no Mapa
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
