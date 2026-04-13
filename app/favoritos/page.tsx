'use client';

import { HeartOff, Search, Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavoritos } from '@/lib/useFavoritos';
import { ROUTES } from '@/lib/linhas';
import { BackButton } from '@/components/ui/BackButton';

export default function FavoritosPage() {
  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();

  // Mapear os hashes favoritados de volta para os objetos de Linha completos
  const linhasFavoritas = favoritos
    .map(id => ROUTES.find(r => r.value === id))
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen p-6 gap-6 relative">
      <header className="flex flex-col gap-2 pt-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold tracking-tight text-white">Favoritos</h1>
        </div>
        <p className="text-brand-muted text-sm ml-10">Acompanhe suas linhas salvas.</p>
      </header>

      {favoritos.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center mt-12 opacity-80">
          <HeartOff size={48} className="text-brand-border" />
          <p className="text-brand-muted">Você ainda não salvou nenhuma linha.</p>
          <Link href="/linhas" className="btn-primary mt-2">
            <Search size={18} /> Explorar Linhas
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pb-24">
          {linhasFavoritas.map((linha: any) => {
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
          })}
        </div>
      )}
    </div>
  );
}
