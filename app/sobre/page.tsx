import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre o Betim Bus | FlowIQ',
  description: 'Conheça o Betim Bus, o app gratuito de rastreamento de ônibus em tempo real para Betim/MG, desenvolvido pela FlowIQ.',
}

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 my-8 px-5 pb-16 text-white prose prose-invert">
      <h1 className="text-2xl font-black text-[#007BFF]">Betim Bus — Sobre o projeto</h1>
      <h2 className="text-xl font-bold">Um app criado por quem conhece Betim</h2>
      <p>
        O Betim Bus nasceu de uma necessidade real. Quem mora em Betim
        e depende do transporte público sabe como é difícil: você chega
        no ponto, não sabe se o ônibus já passou, se está atrasado, ou
        qual linha pega primeiro. Informação que deveria ser simples,
        nunca estava disponível de forma prática.
      </p>
      <p>
        Foi pensando nisso que a FlowIQ desenvolveu o Betim Bus — um
        aplicativo gratuito, direto no navegador do celular, sem
        burocracia de loja de aplicativos.
      </p>

      <h2 className="text-xl font-bold mt-8">O que o Betim Bus oferece</h2>
      <p>
        Todas as 45 linhas municipais de Betim em um só lugar.
        Horários reais de segunda a domingo, itinerário completo de
        cada linha, e rastreamento em tempo real quando o ônibus está
        com sinal GPS ativo.
      </p>
      <p>
        Funciona offline. Depois do primeiro acesso, os horários ficam
        salvos no celular — úteis mesmo sem internet.
      </p>
      <p>
        Pode ser instalado na tela inicial como um aplicativo normal,
        sem precisar da Play Store ou App Store.
      </p>

      <h2 className="text-xl font-bold mt-8">Sobre a FlowIQ</h2>
      <p>
        A FlowIQ é uma empresa de soluções digitais com inteligência
        artificial, com sede em Betim/MG. O Betim Bus é o primeiro
        produto da FlowIQ voltado para a mobilidade urbana local.
      </p>

      <h2 className="text-xl font-bold mt-8">Aviso importante</h2>
      <p>
        O Betim Bus é um serviço independente. Os dados de horários
        e posição dos ônibus são fornecidos pela operadora oficial
        Transbetim/ECOS, vinculada à Prefeitura de Betim.
        Problemas na operação das linhas devem ser reportados pelo
        call center oficial: <strong>0800-283-5993</strong>.
      </p>
    </div>
  )
}
