import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato | Betim Bus',
  description: 'Entre em contato com a equipe do Betim Bus para sugestões, problemas ou parcerias.',
}

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 my-8 px-5 pb-16 text-white prose prose-invert">
      <h1 className="text-2xl font-black text-[#007BFF]">Contato</h1>
      
      <p>
        Tem sugestões, encontrou algum problema ou quer falar
        sobre o Betim Bus?
      </p>
      
      <p>
        Entre em contato pelo e-mail:<br />
        <strong className="text-lg">contato@betimbus.com.br</strong>
      </p>
      
      <p className="text-sm text-[#8A94A6]">Respondemos em até 48 horas úteis.</p>

      <h2 className="text-xl font-bold mt-8 text-yellow-500">Reportar problema com linha ou horário</h2>
      <p>
        Se um horário estiver errado ou uma linha não estiver
        aparecendo, nos informe pelo e-mail acima com:
      </p>
      <ul className="list-disc pl-5">
        <li>Número da linha</li>
        <li>O problema encontrado</li>
      </ul>
      
      <p className="mt-6 bg-[#1C2333] p-4 rounded-xl border border-white/10">
        Os dados de horários vêm diretamente da Transbetim.<br />
        Problemas na operação devem ser reportados pelo call center oficial: <strong>0800-283-5993</strong>
      </p>
    </div>
  )
}
