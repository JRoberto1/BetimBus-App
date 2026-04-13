'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="p-2 -ml-2 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
      aria-label="Voltar"
    >
      <ArrowLeft size={24} />
    </button>
  );
}
