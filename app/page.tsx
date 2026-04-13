import { Search, MapPin, Bus, Clock, Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AdSpace } from '@/components/ui/AdSpace';
import { Header } from '@/components/layout/Header';
import FavoritosHomeWrapper from '@/components/favoritos/FavoritosHomeWrapper';
import PontosHomeWrapper from '@/components/pontos/PontosHomeWrapper';

export default function Home() {
  const frequentes = [
    { id: '4evb', num: '50', nome: 'HOSP. REGIONAL' },
    { id: '4evf', num: '60', nome: 'NOSSA SRA. FÁTIMA' },
    { id: '4eva', num: '40', nome: 'C. INCONFIDENTES' },
    { id: '4evh', num: '70', nome: 'BANDEIRINHAS' },
    { id: '4dqr', num: '131', nome: 'CENTRO / D. BOSCO' },
    { id: '4dqs', num: '160A', nome: 'PETROVALE' },
    { id: '4euq', num: '410', nome: 'S. CAETANO / CENTRO' },
    { id: '4eun', num: '314A', nome: 'DUQUE DE CAXIAS' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <Header />

      <div className="px-5 pt-6 space-y-8 md:space-y-0 md:grid lg:grid-cols-12 md:gap-8 w-full max-w-[1600px] mx-auto">
        
        {/* Search & Planner - Takes larger area on desktop */}
        <section className="lg:col-span-7 flex flex-col justify-start pt-2">
          <Link href="/planejar" prefetch={false} className="block relative group">
            <div className="w-full bg-brand-surface border border-[rgba(255,255,255,0.05)] rounded-xl py-6 flex items-center justify-center gap-3 shadow-md hover:bg-[#20283A] transition-all hover:scale-[1.02] hover:border-[#007BFF]/50 duration-300 group-hover:shadow-[0_0_20px_rgba(0,123,255,0.2)]">
              <Search className="text-[#00F2FF] group-hover:scale-110 transition-transform" size={24} />
              <span className="text-white font-medium text-lg">Para onde você vai?</span>
            </div>
          </Link>

          {/* Favoritos Principal */}
          <div className="mt-8 space-y-4">
            <h2 className="hidden md:block text-xs font-bold tracking-[0.1em] text-brand-muted uppercase px-1 border-b border-[rgba(255,255,255,0.05)] pb-2">SUAS LINHAS PRINCIPAIS</h2>
            <FavoritosHomeWrapper />
          </div>
        </section>

        {/* Módulo Embutido de Pontos Próximos and Linhas Frequentes */}
        <section className="space-y-8 lg:col-span-5">
          <div className="space-y-4">
            <PontosHomeWrapper />
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold tracking-[0.1em] text-brand-muted uppercase px-1 border-b border-[rgba(255,255,255,0.05)] pb-2">FREQUENTES EM BETIM</h2>
            <div className="grid grid-cols-2 gap-4">
              {frequentes.slice(0, 8).map((linha, index) => (
                <Link 
                  key={linha.id} 
                  href={`/linha/${linha.id}`} 
                  prefetch={false} 
                  className={`bg-brand-surface border border-[rgba(255,255,255,0.05)] rounded-xl flex-col items-center justify-center py-6 gap-2 hover:border-[#007BFF] transition-all hover:scale-[1.03] active:scale-95 duration-200 ${
                    index >= 4 ? 'hidden lg:flex' : 'flex'
                  }`}
                >
                  <span className="text-3xl font-black text-white">{linha.num}</span>
                  <span className="text-[11px] text-brand-muted text-center leading-tight font-bold tracking-wider px-1">{linha.nome}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-8 lg:col-span-12">
          <AdSpace slot="Home_Footer" format="horizontal" />
        </section>

        {/* Footer Institucional AdSense */}
        <section className="pb-8 pt-4 border-t border-[rgba(255,255,255,0.05)] text-center space-y-4 lg:col-span-12">
           <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
             <Link href="/sobre" prefetch={false} className="hover:text-[#007BFF] transition-colors">Sobre</Link>
             <span>&bull;</span>
             <Link href="/privacidade" prefetch={false} className="hover:text-[#007BFF] transition-colors">Privacidade</Link>
             <span>&bull;</span>
             <Link href="/contato" prefetch={false} className="hover:text-[#007BFF] transition-colors">Contato</Link>
             <span>&bull;</span>
             <Link href="/noticias" prefetch={false} className="hover:text-[#007BFF] transition-colors">Notícias</Link>
           </div>
           <p className="text-[11px] text-zinc-600">&copy; 2026 FlowIQ. Betim Bus é uma plataforma independente.</p>
        </section>

      </div>
    </div>
  );
}
