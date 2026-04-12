'use client';
import { useEffect, useState } from 'react';
import { Clock, Info } from 'lucide-react';

export default function LinhaHorarios({ horarios }: { horarios: any }) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Atualiza a hora no client-side para evitar hydration error e atualizar realtime
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour12: false })); // Ex: 14:30:00
    };
    
    updateTime();
    const interval = setInterval(updateTime, 10000); // Reavalia a cada 10s
    return () => clearInterval(interval);
  }, []);

  if (!horarios || Object.keys(horarios).length === 0 || horarios.error) {
    return <div className="p-8 text-center text-brand-muted">Nenhum horário comercializado para esta data ou rede offline.</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-8 pb-12">
      {Object.entries(horarios).map(([direcao, trips]) => {
        const trps = trips as any[];
        
        let nextIndex = -1;
        let minutesLeft: number | null = null;
        
        if (currentTime) {
          nextIndex = trps.findIndex(t => t.d >= currentTime);
        }

        const nextTrip = nextIndex !== -1 ? trps[nextIndex] : null;

        if (nextTrip && currentTime) {
          const [currH, currM] = currentTime.split(':').map(Number);
          const [tripH, tripM] = nextTrip.d.split(':').map(Number);
          const diff = (tripH * 60 + tripM) - (currH * 60 + currM);
          if (diff >= 0) minutesLeft = diff;
        }

        return (
          <div key={direcao} className="flex flex-col gap-5">
             <div className="flex flex-col bg-brand-surface rounded-xl border border-brand-border shadow-sm overflow-hidden">
               <div className="bg-[rgba(255,255,255,0.02)] px-4 py-3 flex justify-between items-center border-b border-[rgba(255,255,255,0.02)]">
                 <span className="text-brand-tertiary font-bold tracking-widest text-[11px] uppercase">Sentido {direcao}</span>
               </div>
               
               {nextTrip ? (
                 <div className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="bg-[#121826] p-2.5 rounded-full text-brand-primary">
                       <Clock size={20} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-brand-muted text-[11px] uppercase font-bold tracking-wider">Próxima Saída</span>
                       <span className="text-white text-2xl font-black">{nextTrip.d.substring(0, 5)}</span>
                     </div>
                   </div>
                   {minutesLeft !== null && (
                     <div className="flex flex-col items-end">
                       <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${minutesLeft <= 15 ? 'bg-[rgba(26,173,92,0.15)] text-brand-primary' : 'bg-brand-bg text-brand-muted'}`}>
                         {minutesLeft === 0 ? 'AGORA' : `em ${minutesLeft} min`}
                       </span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="p-4 flex items-center gap-3 text-brand-muted">
                    <Info size={18} />
                    <span className="text-sm">Não há mais saídas para hoje.</span>
                 </div>
               )}
             </div>
             
             <div className="grid grid-cols-4 gap-2">
               {trps.map((t, idx) => {
                 const isPast = currentTime ? t.d < currentTime : false;
                 const isNext = idx === nextIndex;
                 
                 return (
                   <div 
                     key={idx} 
                     className={`text-center py-2.5 rounded-lg text-sm transition-all
                       ${isNext ? 'bg-[rgba(26,173,92,0.15)] border-2 border-brand-primary text-brand-primary font-bold scale-[1.02] shadow-[0_0_12px_rgba(26,173,92,0.25)] z-10' : 
                         isPast ? 'bg-brand-surface border border-transparent text-brand-muted opacity-30 grayscale saturate-0' : 
                         'bg-brand-surface border border-[rgba(255,255,255,0.03)] text-white font-medium'
                       }
                     `}
                   >
                     {t.d.substring(0, 5)}
                   </div>
                 );
               })}
             </div>
          </div>
        );
      })}
    </div>
  );
}
