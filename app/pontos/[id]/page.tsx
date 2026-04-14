'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TempoRealEstimativaCard from '@/components/pontos/TempoRealEstimativaCard';
import { BackButton } from '@/components/ui/BackButton';

interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  lines: string[];
}

export default function PontoDetalhesPage() {
  const params = useParams();
  const idStr = params?.id as string;
  
  const [ponto, setPonto] = useState<Stop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idStr) return;
    
    fetch('/data/pontos.json')
      .then(res => res.json())
      .then((data: Stop[]) => {
         const found = data.find(p => p.id.toString() === idStr);
         setPonto(found || null);
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [idStr]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-bg items-center justify-center">
        <span className="text-brand-secondary animate-pulse">Carregando detalhes do ponto...</span>
      </div>
    );
  }

  if (!ponto) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-bg items-center justify-center gap-4">
        <span className="text-brand-muted">Ponto não encontrado.</span>
        <Link href="/pontos" className="text-brand-primary underline">Voltar para busca</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-bg flex items-center justify-between w-full px-6 py-4 h-16 sticky top-0 z-50 border-b border-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-3">
          <BackButton />
        </div>
      </header>

      {/* Hero / Info */}
      <div className="px-5 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white leading-tight tracking-tight">{ponto.name}</h1>
          <div className="flex items-center gap-1 mt-2 text-brand-muted">
            <MapPin size={14} className="text-brand-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">{ponto.lat.toFixed(5)}, {ponto.lon.toFixed(5)}</span>
          </div>
        </div>

        {/* Lista de Linhas e Estimativas */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between px-1 border-b border-[rgba(255,255,255,0.05)] pb-2">
            <h2 className="text-xs font-bold tracking-[0.1em] text-brand-muted uppercase">Previsão Chegada</h2>
            <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
              AO VIVO
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {ponto.lines.map((linha, index) => (
              <TempoRealEstimativaCard 
                 key={`${linha}-${index}`} 
                 linhaNomeCurto={linha} 
                 stopId={ponto.id.toString()} 
                 pontoLat={ponto.lat}
                 pontoLon={ponto.lon}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
