import { getLinhaInfo, getHorarios } from '@/lib/api';
import LinhaTabsLayout from '@/components/linha/LinhaTabsLayout';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const info = await getLinhaInfo(id);
    const title = `Linha ${info.numeroLinha || ''} - ${info.nomeLinha || 'Rota de Ônibus'}`;
    const description = `Confira os horários, rotas e mapa em tempo real da Linha ${info.numeroLinha || ''} em Betim.`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    };
  } catch (e) {
    return { title: 'Linha de Ônibus - Betim Bus' };
  }
}

export default async function LinhaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const linhaId = resolvedParams.id;
  
  // Pegando dados do proxy Vercel (Etapa 1)
  const info = await getLinhaInfo(linhaId);
  const horarios = await getHorarios(linhaId, new Date().toISOString().slice(0, 10));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Container de Controle Client Component que fará gestão das 4 abas */}
      <LinhaTabsLayout 
        linhaId={linhaId} 
        info={info} 
        horarios={horarios} 
      />
    </div>
  );
}
