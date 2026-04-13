import { Metadata } from 'next'
import Link from 'next/link'
import { AdSpace } from '@/components/ui/AdSpace'
import { getNoticias } from './data'

export const metadata: Metadata = {
  title: 'Notícias sobre Transporte em Betim | Betim Bus',
  description: 'Fique por dentro das novidades do transporte público de Betim: novas linhas, alterações de itinerário, tarifas e mais.'
}

export default function NoticiasHomePage() {
  const noticias = getNoticias();

  return (
    <div className="max-w-3xl mx-auto space-y-6 my-6 px-4">
      <h1 className="text-2xl font-black text-brand-primary">Notícias & Atualizações</h1>
      <p className="text-zinc-400 text-sm">Fique bem informado sobre a malha de ônibus urbana de Betim.</p>
      
      <AdSpace slot="Home_Top" format="horizontal" />

      <div className="grid grid-cols-1 gap-4 mt-6">
        {noticias.map((n) => (
          <Link href={`/noticias/${n.slug}`} key={n.slug} className="surface-card p-5 rounded-xl border border-[rgba(255,255,255,0.02)] hover:border-brand-primary/50 transition-colors">
             <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">{n.date}</span>
             <h2 className="text-white text-lg font-bold mt-2 leading-snug">{n.title}</h2>
             <p className="text-zinc-400 text-sm mt-3 line-clamp-2">{n.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
