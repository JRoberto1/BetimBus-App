import { Search, MapPin, Bus, Clock, Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AdSpace } from '@/components/ui/AdSpace';
import { OpenOnMobileButton } from '@/components/ui/OpenOnMobileButton';
import FavoritosHomeWrapper from '@/components/favoritos/FavoritosHomeWrapper';
import PontosHomeWrapper from '@/components/pontos/PontosHomeWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header Original */}
      <header className="bg-brand-bg flex justify-between items-center w-full px-6 py-4 h-16 sticky top-0 z-50">
        <h1 className="text-xl font-black text-brand-primary tracking-tighter uppercase">Betim Bus</h1>
        <div className="flex items-center gap-4">
          <OpenOnMobileButton />
          <Bell className="text-brand-muted hover:text-white transition-colors" size={20} />
        </div>
      </header>

      <div className="px-5 pt-6 space-y-8">
        
        {/* Busca Original */}
        <section>
          <Link href="/planejar" prefetch={false} className="block relative group">
            <div className="w-full bg-brand-surface border border-[rgba(255,255,255,0.05)] rounded-xl py-4 flex items-center justify-center gap-3 shadow-md hover:bg-[#20283A] transition-colors">
              <Search className="text-brand-secondary" size={20} />
              <span className="text-white font-medium">Para onde você vai?</span>
            </div>
          </Link>
        </section>

        {/* Favoritos Principal */}
        <section className="space-y-4">
          <FavoritosHomeWrapper />
        </section>

        {/* Módulo Embutido de Pontos Próximos */}
        <section className="space-y-4">
          <PontosHomeWrapper />
        </section>

        {/* Linhas Frequentes */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold tracking-[0.1em] text-brand-muted uppercase px-1 border-b border-[rgba(255,255,255,0.05)] pb-2">FREQUENTES EM BETIM</h2>
          <div className="grid grid-cols-2 gap-3">
             <Link href="/linha/3212" prefetch={false} className="surface-card flex flex-col items-center justify-center py-5 gap-2 hover:border-brand-primary transition-colors hover:scale-[0.98] active:scale-95 duration-200">
               <span className="text-2xl font-black text-white">3212</span>
               <span className="text-[10px] text-brand-muted text-center leading-tight font-bold">BETIM / B.H.</span>
             </Link>
             <Link href="/linha/50" prefetch={false} className="surface-card flex flex-col items-center justify-center py-5 gap-2 hover:border-brand-primary transition-colors hover:scale-[0.98] active:scale-95 duration-200">
               <span className="text-2xl font-black text-white">50</span>
               <span className="text-[10px] text-brand-muted text-center leading-tight font-bold">HOSP. REGIONAL</span>
             </Link>
          </div>
        </section>
        
        <section className="py-2">
          <AdSpace slot="Home_Footer" format="auto" />
        </section>

        {/* Footer Institucional AdSense */}
        <section className="pb-8 pt-4 border-t border-[rgba(255,255,255,0.05)] text-center space-y-4">
           <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
             <Link href="/sobre" prefetch={false} className="hover:text-white transition-colors">Sobre</Link>
             <span>&bull;</span>
             <Link href="/privacidade" prefetch={false} className="hover:text-white transition-colors">Privacidade</Link>
             <span>&bull;</span>
             <Link href="/contato" prefetch={false} className="hover:text-white transition-colors">Contato</Link>
             <span>&bull;</span>
             <Link href="/noticias" prefetch={false} className="hover:text-white transition-colors">Notícias</Link>
           </div>
           <p className="text-[10px] text-zinc-600">&copy; 2026 FlowIQ. Betim Bus é uma plataforma independente.</p>
        </section>

      </div>
    </div>
  );
}
