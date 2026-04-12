'use client';
import { useEffect, useState } from 'react';
import { Bus, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { getTempoReal } from '@/lib/api';

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

  if (data?.semSinal || !data?.vehicles || data.vehicles.length === 0) {
    return (
      <div className="p-12 text-center text-brand-muted flex flex-col items-center gap-4">
        <WifiOff size={48} className="opacity-20" />
        <p>Nenhum veículo desta linha transmitindo GPS no momento. Fora de operação ou em zona sem sinal.</p>
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
        {data.vehicles.map((ev: any, idx: number) => (
          <div key={idx} className="surface-card p-4 pl-14 relative overflow-hidden flex items-center justify-between active:scale-95 transition-transform border border-[rgba(255,255,255,0.03)]">
             {/* Timeline Visual (Radar Progress) */}
             <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center justify-center">
               <div className="w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(26,173,92,0.4),rgba(26,173,92,1),rgba(26,173,92,0.4),transparent)] h-full absolute"></div>
               <div className="w-3 h-3 rounded-full bg-brand-primary z-10 shadow-[0_0_12px_rgba(26,173,92,0.8)] relative">
                 <div className="absolute inset-0 rounded-full border border-brand-primary animate-ping opacity-75"></div>
               </div>
             </div>
             
             <div className="flex flex-col gap-1 max-w-[60%]">
               <span className="text-[10px] text-brand-muted uppercase tracking-wider font-bold">Em Trânsito Sentido</span>
               <span className="text-sm font-black text-white leading-tight">{ev.lb || 'Destino Padrão'}</span>
             </div>
             
             <div className="flex flex-col items-end gap-1.5 shrink-0 text-right">
               <div className="text-[10px] uppercase font-bold bg-[#121826] text-brand-muted px-2 py-1 rounded border border-[rgba(255,255,255,0.05)] flex items-center gap-1.5 shadow-sm">
                 <Bus size={10} className="text-brand-primary" />
                 Carro #{ev.id || 'N/A'}
               </div>
               
               {ev.pt && (
                 <div className="flex flex-col items-end">
                   <span className="text-[9px] text-brand-muted uppercase tracking-wider">Último sinal GPS</span>
                   <span className="text-[11px] text-brand-tertiary font-bold tracking-widest">
                     {new Date(ev.pt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                 </div>
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
