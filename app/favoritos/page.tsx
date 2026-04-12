import { HeartOff, Search } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosPage() {
  const favoritos = []; // TODO: Implementar store local no futuro via Zustand ou localStorage

  return (
    <div className="flex flex-col min-h-screen p-6 gap-6">
      <header className="flex flex-col gap-2 pt-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">Favoritos</h1>
        <p className="text-brand-muted text-sm">Acompanhe suas linhas mais utilizadas.</p>
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
        <div className="flex flex-col gap-3">
          {/* Renderização condicional no futuro iterando lista e usando FavoritoCard */}
        </div>
      )}
    </div>
  );
}
