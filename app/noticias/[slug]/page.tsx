import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdSpace } from '@/components/ui/AdSpace'
import { getArtigoBySlug } from '@/lib/noticias'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const artigo = getArtigoBySlug(resolvedParams.slug)
  if (!artigo) return {}
  
  return {
    title: `${artigo.titulo} | Betim Bus`,
    description: artigo.resumo,
  }
}

export default async function NoticiaArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const artigo = getArtigoBySlug(resolvedParams.slug)
  
  if (!artigo) return notFound()

  const lines = artigo.conteudo.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto space-y-6 my-6 px-4 pb-24">
      <AdSpace slot="Article_Top" format="horizontal" />
      
      <div className="space-y-4 border-b border-white/10 pb-6">
        <span className="text-xs text-[#00F2FF] font-bold uppercase tracking-wider">{artigo.data}</span>
        <h1 className="text-3xl font-black text-white leading-tight">{artigo.titulo}</h1>
      </div>

      <article className="prose prose-invert prose-brand max-w-none text-zinc-300 leading-relaxed text-[15px]">
         {lines.map((p, idx) => (
           <div key={idx}>
             {idx === 2 && <AdSpace slot="Article_InLine" format="auto" className="my-6 bg-black/10 rounded-xl" />}
             {p.includes(':') && p.length < 50 ? (
                <h3 className="text-lg font-bold text-white mt-8 mb-2">{p}</h3>
             ) : (
                <p className="whitespace-pre-wrap">{p}</p>
             )}
           </div>
         ))}
      </article>

      {artigo.fonte && (
        <p className="text-xs text-[#8A94A6] mt-12 italic text-left border-t border-white/10 pt-4">
          Fonte: {artigo.fonte}
        </p>
      )}
      
    </div>
  )
}
