'use client';
import { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavoritos } from '@/lib/useFavoritos';

import { BackButton } from '@/components/ui/BackButton';
import { AdSpace } from '@/components/ui/AdSpace';

export default function LinhasClient({ linhasInicial }: { linhasInicial: any[] }) {
  const [busca, setBusca] = useState('');
  const { isFavorito, toggleFavorito } = useFavoritos();

  const linhasFiltradas = linhasInicial.filter(linha => 
    linha.value.toLowerCase().includes(busca.toLowerCase()) || 
    linha.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <header className="flex flex-col gap-4 pt-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold tracking-tight text-white">Todas as Linhas</h1>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por número ou nome..." 
            className="w-full bg-brand-surface border border-brand-border rounded-xl pl-11 pr-4 py-3 text-[15px] text-white placeholder-brand-muted outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
          />
          <Search size={20} className="absolute left-4 top-3.5 text-brand-muted" />
        </div>
      </header>

      <section className="flex flex-col gap-3">
        {linhasFiltradas.length === 0 ? (
          <div className="text-brand-muted text-center py-6">Nenhuma linha encontrada.</div>
        ) : (
          linhasFiltradas.map((linha) => {
            const linhaId = linha.value;
            const isFav = isFavorito(linhaId);
            
            return (
              <div key={linhaId} className="surface-card flex items-center justify-between p-4 relative">
                <Link href={`/linha/${linhaId}`} className="flex-1 pr-4 active:scale-95 transition-transform">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-brand-primary font-bold text-xl">{linha.name.split(' - ')[0]}</span>
                      <div className="bg-[rgba(0,255,100,0.1)] text-green-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                        Operando
                      </div>
                    </div>
                    <span className="text-[13px] text-brand-muted font-medium">{linha.name.split(' - ')[1] || linha.name}</span>
                  </div>
                </Link>
                
                <button 
                  onClick={(e) => { e.preventDefault(); toggleFavorito(linhaId); }} 
                  className={`p-2 transition-colors z-10 ${isFav ? 'text-brand-secondary' : 'text-brand-muted hover:text-brand-tertiary'}`}
                  aria-label="Favoritar"
                >
                  <Heart size={24} fill={isFav ? 'currentColor' : 'none'} />
                </button>
              </div>
            );
          })
        )}
        
        {/* AdSense Slot */}
        <div className="mt-4">
           <AdSpace slot="Linhas_List" format="rectangle" />
        </div>
      </section>
    </>
  );
}
