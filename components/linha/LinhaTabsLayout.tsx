'use client';
import { useState } from 'react';
import { Bus, Map, Clock, Navigation } from 'lucide-react';
import LinhaItinerario from './LinhaItinerario';
import LinhaHorarios from './LinhaHorarios';
import LinhaAoVivo from './LinhaAoVivo';
import dynamic from 'next/dynamic';

// Ocultando a engine Leaflet do servidor para não trincar o build Next.js
const LinhaMapa = dynamic(() => import('./LinhaMapa'), { ssr: false });

export default function LinhaTabsLayout({ linhaId, info, horarios }: any) {
  const [activeTab, setActiveTab] = useState<'horarios' | 'itinerario' | 'aovivo' | 'mapa'>('horarios');

  const tabs = [
    { id: 'horarios', label: 'Horários', icon: Clock },
    { id: 'itinerario', label: 'Itinerário', icon: Map },
    { id: 'aovivo', label: 'Ao Vivo', icon: Bus },
    { id: 'mapa', label: 'Mapa', icon: Navigation }
  ] as const;

  return (
    <div className="flex flex-col flex-1 h-full">
      
      {/* Cabeçalho da Linha Fixo no topo */}
      <div className="bg-brand-surface pt-6 pb-2 px-6 border-b border-brand-border sticky top-0 z-20">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          {info?.[0]?.tripName || 'Carregando destino...'}
        </h1>
        
        <div className="flex w-full mt-4 justify-between">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isAtivo = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-col items-center gap-1 pb-3 px-2 border-b-2 transition-all ${isAtivo ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-muted'}`}
              >
                <Icon size={20} />
                <span className="text-[11px] font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Área de rolagem para o conteúdo da aba filtrada */}
      <div className="flex-1 overflow-y-auto w-full relative">
        {activeTab === 'horarios' && <LinhaHorarios horarios={horarios} />}
        {activeTab === 'itinerario' && <LinhaItinerario stops={info?.[0]?.stops} />}
        {activeTab === 'aovivo' && <LinhaAoVivo linhaId={linhaId} info={info} />}
        
        {/* Mapa preenchendo o container em tamanho máximo sem padding */}
        {activeTab === 'mapa' && (
           <div className="absolute inset-0 z-10 h-full w-full bg-brand-bg">
             <LinhaMapa stops={info?.[0]?.stops} shape={info?.[0]?.shape} />
           </div>
        )}
      </div>

    </div>
  );
}
