'use client';
import { useState, useEffect, useRef } from 'react';
import { Bus, Clock } from 'lucide-react';
import { getRouteValueByShortName, ROUTES } from '@/lib/linhasDict';
import Link from 'next/link';

interface TempoRealEstimativaCardProps {
  linhaNomeCurto: string;
  stopId: string;
  pontoLat?: number;
  pontoLon?: number;
}

// Haversine distance em KM
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Raio da terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function TempoRealEstimativaCard({ linhaNomeCurto, stopId, pontoLat, pontoLon }: TempoRealEstimativaCardProps) {
  const [inView, setInView] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const routeValue = getRouteValueByShortName(linhaNomeCurto);
  // Pega o nome completo pra exibir "131 - Centro / Dom Bosco" se a gente quiser.
  const routeFullName = ROUTES.find(r => r.value === routeValue)?.name || linhaNomeCurto;

  // Intersection Observer to lazy load the fetch
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '50px' });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !routeValue) return;

    let mounted = true;
    setLoading(true);

    fetch(`/api/linha/${routeValue}/tempo-real?stopId=${stopId}`)
      .then(res => res.json())
      .then(json => {
        if (mounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { mounted = false; };
  }, [inView, routeValue, stopId]);

  if (!routeValue) return null;

  let vehiclesFiltrados: any[] = [];
  
  if (data && data.vehicles && data.vehicles.length > 0 && pontoLat && pontoLon) {
    // Calcular a distância de cada veículo pro ponto
    vehiclesFiltrados = data.vehicles.map((veh: any) => {
      const distanceKm = getDistanceFromLatLonInKm(pontoLat, pontoLon, veh.lat, veh.lon);
      // Assumindo fator urbano de trajeto reto x2, e velocidade média de 15km/h
      // Tempo (h) = Distancia(km) / 15 ... x 60 min
      const minDistance = Math.ceil((distanceKm * 1.5 / 15) * 60); 
      return { ...veh, distanceKm, estimation: minDistance };
    }).sort((a: any, b: any) => a.distanceKm - b.distanceKm); // Pega o mais rápido/próximo
  }

  const hasVehicle = vehiclesFiltrados.length > 0;
  const semSinal = data?.semSinal;
  const closestVehicle = hasVehicle ? vehiclesFiltrados[0] : null;

  return (
    <div ref={cardRef} className="surface-card p-4 group relative overflow-hidden flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
           <div className="bg-[#121826] border border-[rgba(255,255,255,0.05)] w-12 h-12 flex items-center justify-center rounded-xl shrink-0">
              <Bus className="text-white" size={20} />
           </div>
           <div>
             <span className="text-lg font-black text-white leading-none">{linhaNomeCurto}</span>
             <p className="text-[10px] text-brand-muted font-bold tracking-widest mt-1 line-clamp-1">{routeFullName.replace(linhaNomeCurto + ' - ', '')}</p>
           </div>
        </div>

        {/* Status Indicator / ETA */}
        <div className="text-right flex flex-col items-end justify-center">
           {!inView || loading ? (
             <span className="text-xs text-brand-muted font-bold animate-pulse">Carregando...</span>
           ) : error ? (
             <span className="text-xs text-red-400 font-bold">Erro</span>
           ) : semSinal || !hasVehicle ? (
             <span className="text-xs text-brand-muted font-bold px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded-md">Sem Sinal</span>
           ) : (
             <div className="flex items-center gap-1.5 bg-[rgba(0,242,255,0.1)] border border-[rgba(0,242,255,0.2)] px-2.5 py-1 rounded-md">
                <Clock className="text-brand-secondary" size={12} />
                <span className="text-[13px] font-black text-brand-secondary">
                  {closestVehicle.distanceKm < 0.3 ? 'Chegando' : `${closestVehicle.estimation} min`}
                </span>
             </div>
           )}
        </div>
      </div>
      
      {hasVehicle && !semSinal && vehiclesFiltrados.length > 1 && (
        <div className="border-t border-[rgba(255,255,255,0.05)] mt-2 pt-2 flex items-center gap-2">
           <span className="text-[10px] text-brand-muted font-bold uppercase">
             Próximo depois deste: {vehiclesFiltrados[1].estimation} min ({vehiclesFiltrados[1].distanceKm.toFixed(1)} km)
           </span>
        </div>
      )}
      
      {/* Clique no Card redireciona para a aba completa dessa Linha específica */}
      <Link href={`/linha/${routeValue}`} prefetch={false} className="absolute inset-0 z-10" />
    </div>
  );
}
