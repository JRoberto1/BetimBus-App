'use client';
import dynamic from 'next/dynamic';

// Leaflet precisa apenas de DOM do cliente (window), senão quebra no Server-Side
const RadarGlobalNoSSR = dynamic(() => import('@/components/mapa/RadarGlobal'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f141e]"> {/* CartoDB Dark Base Color */}
      <span className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin"></span>
      <p className="mt-4 font-bold text-sm tracking-widest uppercase text-brand-primary animate-pulse">
         Inicializando Matriz
      </p>
    </div>
  )
});

export default function MapaPage() {
  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Title overlay invisível que sangra a gradiente em cima */}
      <div className="absolute top-6 w-full text-center z-10 pointer-events-none">
        <h1 className="text-xl font-black text-white uppercase tracking-tight drop-shadow-md">
          Radar <span className="text-brand-secondary">Global</span>
        </h1>
      </div>

      <div className="flex-1 w-full relative">
        <RadarGlobalNoSSR />
      </div>
    </div>
  );
}
