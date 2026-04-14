'use client';
import { useEffect, useState } from 'react';
import { Bus, Wifi, WifiOff, RefreshCw, MapPin, AlertTriangle } from 'lucide-react';
import { getTempoReal } from '@/lib/api';

function VeiculoAoVivoCard({ ev }: { ev: any }) {
  const [endereco, setEndereco] = useState<string | null>(null);

  // Calcular frescor do sinal
  const diffMs = Date.now() - ev.pt;
  const diffMin = Math.floor(diffMs / 60000);
  
  const isSinalInstavel = diffMin >= 2;

  useEffect(() => {
    if (!ev.lat || !ev.lon) return;
    let mounted = true;
    
    fetch(`/api/geocode?lat=${ev.lat}&lon=${ev.lon}`)
      .then(res => res.json())
      .then(data => {
        if (mounted && data.address) {
          setEndereco(data.address);
        }
      })
      .catch(() => {});
      
    return () => { mounted = false; };
  }, [ev.lat, ev.lon]);

  return (
    <div className={`surface-card p-4 pl-14 relative overflow-hidden flex items-center justify-between active:scale-95 transition-transform border ${isSinalInstavel ? 'border-yellow-900/50 opacity-80' : 'border-[rgba(255,255,255,0.03)]'}`}>
       {/* Timeline Visual (Radar Progress) */}
       <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center justify-center">
         <div className={`w-[2px] h-full absolute ${isSinalInstavel ? 'bg-[linear-gradient(to_bottom,transparent,rgba(234,179,8,0.4),rgba(234,179,8,1),rgba(234,179,8,0.4),transparent)]' : 'bg-[linear-gradient(to_bottom,transparent,rgba(26,173,92,0.4),rgba(26,173,92,1),rgba(26,173,92,0.4),transparent)]'}`}></div>
         <div className={`w-3 h-3 rounded-full z-10 relative ${isSinalInstavel ? 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.8)]' : 'bg-brand-primary shadow-[0_0_12px_rgba(26,173,92,0.8)]'}`}>
           {!isSinalInstavel && <div className="absolute inset-0 rounded-full border border-brand-primary animate-ping opacity-75"></div>}
         </div>
       </div>
       
       <div className="flex flex-col gap-1 max-w-[65%]">
         <div className="flex items-center gap-1.5">
           <MapPin size={13} className={isSinalInstavel ? 'text-yellow-500 shrink-0' : 'text-brand-primary shrink-0'} />
           <span className="text-sm font-black text-white leading-tight line-clamp-2">{endereco || 'Buscando localização...'}</span>
         </div>
         <span className="text-[10px] text-brand-muted uppercase tracking-wider font-bold truncate mt-1">Sentido: {ev.lb || 'Destino Padrão'}</span>
       </div>
       
       <div className="flex flex-col items-end gap-1.5 shrink-0 text-right">
         <div className="text-[10px] uppercase font-bold bg-[#121826] text-brand-muted px-2 py-1 rounded border border-[rgba(255,255,255,0.05)] flex items-center gap-1.5 shadow-sm">
           <Bus size={10} className={isSinalInstavel ? 'text-yellow-500' : 'text-brand-primary'} />
           Carro #{ev.id || 'N/A'}
         </div>
         
         {isSinalInstavel && (
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle size={10} className="text-yellow-500" />
              <span className="text-[9px] text-yellow-500 uppercase tracking-wider font-bold">Sinal caindo ({diffMin}m)</span>
            </div>
         )}
       </div>
    </div>
  );
}

export default function LinhaAoVivo({ linhaId, info }: { linhaId: string, info: any }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10); // Polling de 10s

  const routeName = info?.[0]?.tripName || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const live = await getTempoReal(linhaId, 0, routeName);
      setData(live);
    } catch {
      setData({ semSinal: true });
    }
    setLoading(false);
    setCountdown(10);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchData();
          return 10;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return <div className="p-8 text-center text-brand-muted flex flex-col items-center gap-2"><RefreshCw className="animate-spin" /> Buscando radar...</div>;
  }

  // Filtrar veículos cujo sinal parou de atualizar há mais de 10 minutos
  const activeVehicles = data?.vehicles?.filter((ev: any) => {
    const diffMs = Date.now() - ev.pt;
    const diffMin = Math.floor(diffMs / 60000);
    return diffMin <= 10;
  }) || [];

  if (data?.semSinal || activeVehicles.length === 0) {
    return (
      <div className="p-12 text-center text-brand-muted flex flex-col items-center gap-4">
        <WifiOff size={48} className="opacity-20" />
        <p>Nenhum veículo desta linha operando agora, ou os radares estão offline há muito tempo.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 pb-12">
      <div className="flex justify-between items-center bg-brand-surface p-3 rounded-lg border border-brand-border">
         <div className="flex items-center gap-2 text-brand-secondary">
           <Wifi size={18} className="animate-pulse" />
           <span className="text-[12px] font-bold uppercase tracking-widest">Radar Online</span>
         </div>
         <span className="text-[10px] text-brand-muted">Atualiza em {countdown}s</span>
      </div>

      <div className="flex flex-col gap-3">
        {activeVehicles.map((ev: any, idx: number) => (
          <VeiculoAoVivoCard key={ev.id || idx} ev={ev} />
        ))}
      </div>
    </div>
  );
}
