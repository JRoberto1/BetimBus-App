import { getLinhas } from '@/lib/api';
import LinhasClient from './LinhasClient';

export default async function LinhasPage() {
  const linhas = await getLinhas();

  return (
    <div className="flex flex-col min-h-screen p-6 gap-6">
      <LinhasClient linhasInicial={linhas} />
    </div>
  );
}

