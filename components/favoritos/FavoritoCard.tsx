'use client';
import { Bus } from 'lucide-react';
import Link from 'next/link';
import { ROUTES, createRouteSlug } from '@/lib/linhas';

interface FavoritoCardProps {
  linhaId: string;
  num: string;
  nome: string;
}

export default function FavoritoCard({ linhaId, num, nome }: FavoritoCardProps) {
  // Pega o hash
  const routeObj = ROUTES.find(r => r.value === linhaId) || { name: nome, value: linhaId };
  // Lógica fictícia visual
  return (
    <Link href={`/linha/${createRouteSlug(routeObj)}`} className="surface-card flex justify-between items-center bg-gradient-to-r from-brand-surface to-[#1A253A] border-l-4 border-l-brand-primary active:scale-95 transition-transform block">
      <div className="flex items-center gap-4">
        <div className="bg-[#121826] p-3 rounded-full border border-[rgba(255,255,255,0.05)] shadow-inner">
          <Bus size={22} className="text-brand-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white">{routeObj.name.split(' - ')[0]}</span>
          <span className="text-[12px] text-brand-muted">{routeObj.name.split(' - ')[1] || nome}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 bg-[rgba(0,242,255,0.1)] text-brand-secondary px-2 py-1 rounded-md mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Ao Vivo</span>
        </div>
        <div className="text-2xl font-black text-white flex items-center gap-1">
          8 <span className="text-sm font-medium text-brand-muted">min</span>
        </div>
      </div>
    </Link>
  );
}
