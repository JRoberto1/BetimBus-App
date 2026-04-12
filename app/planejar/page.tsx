'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import JourneyPlannerEngine from '@/components/busca/JourneyPlannerEngine';

export default function PlanejadorJornadaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      {/* Header Estrito */}
      <header className="bg-brand-bg flex items-center justify-between w-full px-6 py-4 h-16 sticky top-0 z-50 border-b border-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch={false}>
             <ChevronLeft className="text-brand-primary" size={24} />
          </Link>
          <h1 className="text-lg font-black tracking-tight text-white uppercase">Planejar Viagem</h1>
        </div>
      </header>

      {/* Hero Content */}
      <div className="px-5 pt-8 pb-4">
         <h2 className="text-2xl font-black text-white leading-tight tracking-tight mb-2">Para onde você vai hoje?</h2>
         <p className="text-brand-muted text-[13px] leading-relaxed max-w-[90%]">
            O rastreador inteligente vai cruzar as linhas da sua localização até o destino.
         </p>
      </div>

      {/* Engine Core */}
      <div className="px-5 flex-1 pb-24">
         <JourneyPlannerEngine />
      </div>
      
    </div>
  );
}
