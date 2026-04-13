import { Metadata } from 'next'
import Link from 'next/link'
import { AdSpace } from '@/components/ui/AdSpace'
import { getArtigos } from '@/lib/noticias'

export const metadata: Metadata = {
  title: 'Notícias sobre Transporte em Betim | Betim Bus',
  description: 'Fique por dentro das novidades do transporte público de Betim: novas linhas, alterações de itinerário, tarifas e mais.',
}

export default function NoticiasHomePage() {
  const artigos = getArtigos();

  return (
    <div className="max-w-3xl mx-auto space-y-6 my-6 px-4">
      <h1 className="text-2xl font-black text-[#007BFF]">Notícias & Atualizações</h1>
      <p className="text-[#8A94A6] text-sm">Fique bem informado sobre a malha de ônibus urbana de Betim.</p>
      
      <AdSpace slot="Home_Top" format="horizontal" />

      <div className="grid grid-cols-1 gap-4 mt-6 pb-24">
        {artigos.map((n) => (
          <Link href={`/noticias/${n.slug}`} key={n.slug} className="bg-[#1C2333] p-5 rounded-xl border border-white/10 hover:border-[#007BFF]/50 transition-colors">
             <span className="text-xs text-[#00F2FF] font-bold uppercase tracking-wider">{n.data}</span>
             <h2 className="text-white text-lg font-bold mt-2 leading-snug">{n.titulo}</h2>
             <p className="text-[#8A94A6] text-sm mt-3 line-clamp-2">{n.resumo}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
