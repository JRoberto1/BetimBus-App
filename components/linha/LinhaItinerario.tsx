'use client';
import { MapPin } from 'lucide-react';

export default function LinhaItinerario({ stops }: { stops: any[] }) {
  if (!stops || stops.length === 0) {
    return <div className="p-8 text-center text-brand-muted">Trajeto não disponibilizado.</div>;
  }

  return (
    <div className="p-6 flex flex-col pt-8 pb-12 w-full">
      <div className="relative border-l-2 border-brand-border ml-5 w-full flex flex-col gap-6">
        
        {stops.map((stop: any, idx: number) => {
          const isReference = stop.reference === 1 || idx === 0 || idx === stops.length - 1;
          
          return (
            <div key={`${stop.stopId}-${idx}`} className="relative pl-6 flex items-start">
              {/* Círculo da parada no eixo vertical */}
              <div className={`absolute -left-[9px] top-1 rounded-full border-2 border-brand-bg
                ${isReference ? 'bg-brand-primary h-4 w-4 shadow-[0_0_8px_rgba(0,123,255,0.8)]' : 'bg-brand-muted h-3 w-3'}
              `} />
              
              <div className="flex flex-col -mt-1 active:scale-95 transition-transform cursor-pointer">
                <span className={`text-[15px] ${isReference ? 'text-white font-bold' : 'text-brand-muted font-medium'}`}>
                  {stop.stopName}
                </span>
                <span className="text-[11px] text-brand-muted mt-1 opacity-70">
                  <MapPin size={10} className="inline mr-1" />
                  Marco Km {(stop.dist).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
