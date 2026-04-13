import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdSpace } from '@/components/ui/AdSpace'
import { getNoticiaBySlug } from '../data'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const noticia = getNoticiaBySlug(params.slug)
  if (!noticia) return {}
  
  return {
    title: `${noticia.title} | Betim Bus`,
    description: noticia.excerpt,
  }
}

export default function NoticiaArticlePage({ params }: Props) {
  const noticia = getNoticiaBySlug(params.slug)
  if (!noticia) return notFound()

  // Separar o corpo em paragrafos e injetar o anuncio apos o terceiro
  const lines = noticia.content.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto space-y-6 my-6 px-4 pb-12">
      <AdSpace slot="Article_Top" format="horizontal" />
      
      <div className="space-y-4 border-b border-[rgba(255,255,255,0.1)] pb-6">
        <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">{noticia.date}</span>
        <h1 className="text-3xl font-black text-white leading-tight">{noticia.title}</h1>
      </div>

      <article className="prose prose-invert prose-brand max-w-none text-zinc-300 leading-relaxed text-[15px]">
         {lines.map((p, idx) => (
           <div key={idx}>
             {idx === 2 && <AdSpace slot="Article_InLine" format="auto" className="my-6 bg-black/10 rounded-xl" />}
             {p.startsWith('Fonte:') ? (
                <p className="text-xs text-brand-muted mt-8 italic text-right">{p}</p>
             ) : p.includes(':') && p.length < 50 ? (
                <h3 className="text-lg font-bold text-white mt-8 mb-2">{p}</h3>
             ) : (
                <p className="whitespace-pre-wrap">{p}</p>
             )}
           </div>
         ))}
      </article>
      
    </div>
  )
}
