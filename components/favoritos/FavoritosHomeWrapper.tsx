'use client';
import { useFavoritos } from '@/lib/useFavoritos';
import FavoritoCard from './FavoritoCard';
import { BusFront, Search } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosHomeWrapper() {
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div className="surface-card flex flex-col items-center justify-center p-8 gap-4 text-center border-dashed border-2">
        <div className="p-4 bg-brand-bg rounded-full text-brand-muted">
          <BusFront size={32} />
        </div>
        <p className="text-sm text-brand-muted leading-relaxed">
          Adicione sua linha favorita para ver o próximo ônibus e os horários aqui.
        </p>
        <Link href="/linhas" className="btn-primary w-full mt-2">
          <Search size={18} /> Buscar linha
        </Link>
      </div>
    );
  }

  // Renderiza as linhas favoritas (exemplo usando o ID direto, no mundo real bateríamos em um endpoint batched)
  return (
    <div className="flex flex-col gap-3">
      {favoritos.map((id) => (
        <FavoritoCard key={id} linhaId={id} num="★" nome="Exibir Horários ao Vivo" />
      ))}
    </div>
  );
}
