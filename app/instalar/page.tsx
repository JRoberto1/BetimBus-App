import { Metadata } from 'next'
import { Download, MonitorSmartphone, Apple, AlignJustify } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Instalar o Betim Bus no seu celular',
  description: 'Veja como instalar o Betim Bus na tela inicial do seu celular em 3 passos simples. Gratuito, sem precisar da loja de apps.'
}

export default function InstalarPwaPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8 my-8 px-4 text-white pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MonitorSmartphone className="text-brand-primary" size={32} />
        </div>
        <h1 className="text-3xl font-black text-white">Instale o Betim Bus</h1>
        <p className="text-zinc-400">
          Ocupa <strong>0 MB</strong> de memória e te avisa os horários sem depender da internet. Não precisa ir na Play Store!
        </p>
      </div>

      <div className="space-y-6">
        <div className="surface-card p-6 rounded-2xl border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <MonitorSmartphone size={24} />
            <h2 className="text-xl font-bold">Instalar no Android (Chrome)</h2>
          </div>
          <ol className="list-decimal pl-5 space-y-3 text-zinc-300">
            <li>Toque nos <strong>três pontinhos</strong> no canto superior direito do navegador.</li>
            <li>Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar Aplicativo"</strong>.</li>
            <li>Confirme! O ícone aparecerá na sua tela inicial em segundos.</li>
          </ol>
        </div>

        <div className="surface-card p-6 rounded-2xl border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3 mb-4 text-zinc-100">
            <Apple size={24} />
            <h2 className="text-xl font-bold">Instalar no iPhone (Safari)</h2>
          </div>
          <ol className="list-decimal pl-5 space-y-3 text-zinc-300">
            <li>Toque no botão de <strong>Compartilhar</strong> (quadrado com seta para cima) na barra inferior.</li>
            <li>Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</li>
            <li>Confirme clicando em Adicionar no topo direito.</li>
          </ol>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <a href="/" className="inline-block bg-brand-primary text-white font-bold px-8 py-3 rounded-full hover:bg-brand-primary/80 transition-colors shadow-lg">
          Ir para o Aplicativo Agora
        </a>
      </div>
    </div>
  )
}
