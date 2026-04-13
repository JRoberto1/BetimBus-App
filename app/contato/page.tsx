import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato | Betim Bus',
  description: 'Entre em contato com a equipe do Betim Bus para sugestões, problemas ou parcerias.'
}

export default function ContatoPage() {
  return (
    <div className="surface-card p-6 rounded-2xl max-w-3xl mx-auto space-y-6 text-white my-8">
      <h1 className="text-2xl font-black text-brand-primary">Contato</h1>
      
      <p className="text-zinc-300 text-lg">
        Tem sugestões, encontrou algum problema ou quer falar sobre o Betim Bus?
      </p>
      
      <div className="bg-[#1C2333] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
        <p className="text-zinc-400 uppercase text-xs font-bold tracking-widest mb-1">E-mail oficial</p>
        <p className="text-white font-mono text-lg">investleeg@gmail.com</p>
      </div>
      
      <p className="text-brand-muted text-sm">Respondemos em até 48 horas úteis.</p>

      <hr className="border-[rgba(255,255,255,0.05)] my-4" />

      <h2 className="text-xl font-bold bg-yellow-500/10 text-yellow-500 p-2 rounded inline-block">REPORTAR PROBLEMA</h2>
      <p className="text-zinc-300 text-sm leading-relaxed">
        Se um horário estiver errado ou uma linha não estiver aparecendo, nos informe pelo e-mail acima com:
      </p>
      <ul className="list-disc pl-5 text-zinc-400 text-sm space-y-1">
        <li>Número da linha</li>
        <li>O problema encontrado</li>
      </ul>
      
      <p className="text-zinc-500 text-xs bg-black/20 p-4 rounded-lg border border-[rgba(255,255,255,0.02)] mt-4">
        Os dados de horários vêm diretamente da Transbetim. Problemas na operação (atrasos, motoristas, manutenção) devem ser reportados pelo call center oficial da prefeitura: <strong>0800-283-5993</strong>
      </p>
    </div>
  )
}
