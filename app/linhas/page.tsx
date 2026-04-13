import { getLinhas } from '@/lib/api';
import LinhasClient from './LinhasClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todas as Linhas de Ônibus de Betim | Betim Bus',
  description: 'Explore a lista completa de linhas do transporte público municipal de Betim (Transbetim). Consulte itinerários, horários e locais de parada.',
};

export default async function LinhasPage() {
  const linhas = await getLinhas();

  return (
    <main className="flex flex-col min-h-screen p-6 gap-6" aria-labelledby="todas-linhas-titulo">
      <div className="sr-only">
        <h1 id="todas-linhas-titulo">Todas as Linhas Municipais de Betim</h1>
        <p>Pesquise na nossa base as linhas operacionais da Transbetim para verificar o horário de saída no ponto oficial.</p>
      </div>
      <LinhasClient linhasInicial={linhas} />
    </main>
  );
}

