import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre o Betim Bus | FlowIQ',
  description: 'Conheça o Betim Bus, o app gratuito de rastreamento de ônibus em tempo real para Betim/MG, desenvolvido pela FlowIQ.'
}

export default function SobrePage() {
  return (
    <div className="surface-card p-6 rounded-2xl max-w-3xl mx-auto space-y-6 text-white my-8">
      <h1 className="text-2xl font-black text-brand-primary">Sobre o Betim Bus</h1>
      <p className="text-zinc-300">
        O Betim Bus nasceu de uma necessidade real: moradores de Betim/MG que dependem do transporte público todos os dias, mas não tinham uma forma prática de consultar horários e acompanhar os ônibus em tempo real.
      </p>
      <p className="text-zinc-300">
        Desenvolvido pela FlowIQ, o Betim Bus é um aplicativo web (PWA) gratuito que funciona diretamente no navegador do celular — sem precisar baixar da loja de aplicativos.
      </p>

      <h2 className="text-xl font-bold mt-6">O QUE O BETIM BUS OFERECE:</h2>
      <ul className="list-disc pl-5 space-y-2 text-zinc-300">
        <li>Rastreamento de ônibus em tempo real</li>
        <li>Horários de todas as 45 linhas municipais de Betim</li>
        <li>Itinerário completo de cada linha</li>
        <li>Funciona offline (após primeiro acesso)</li>
        <li>Pode ser instalado na tela inicial do celular</li>
      </ul>

      <h2 className="text-xl font-bold mt-6">SOBRE A FLOWIQ:</h2>
      <p className="text-zinc-300">
        A FlowIQ é uma empresa de soluções digitais com inteligência artificial, com sede em Betim/MG. O Betim Bus é o primeiro produto da FlowIQ voltado para a mobilidade urbana local.
      </p>

      <h2 className="text-xl font-bold mt-6">OPERADORA:</h2>
      <p className="text-zinc-300">
        O transporte público de Betim é operado pela Transbetim/ECOS, vinculada à Prefeitura de Betim. O Betim Bus é um serviço independente e não possui vínculo oficial com a Transbetim.
      </p>
    </div>
  )
}
