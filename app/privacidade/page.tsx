import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Betim Bus',
  description: 'Saiba como o Betim Bus trata seus dados, uso de geolocalização, cookies e anúncios.'
}

export default function PrivacidadePage() {
  return (
    <div className="surface-card p-6 rounded-2xl max-w-3xl mx-auto space-y-6 text-white my-8">
      <h1 className="text-2xl font-black text-brand-primary">Política de Privacidade</h1>
      <p className="text-sm text-brand-muted">Última atualização: Abril de 2026</p>
      
      <p className="text-zinc-300">O Betim Bus ("nós", "nosso") respeita sua privacidade. Esta política explica quais dados são coletados e como são utilizados.</p>

      <h2 className="text-lg font-bold">1. DADOS QUE NÃO COLETAMOS</h2>
      <p className="text-zinc-300 text-sm">Não coletamos nome, e-mail, CPF, telefone ou qualquer dado pessoal identificável. Não exigimos cadastro.</p>

      <h2 className="text-lg font-bold">2. GEOLOCALIZAÇÃO</h2>
      <p className="text-zinc-300 text-sm">O app pode solicitar acesso à sua localização GPS para mostrar pontos de ônibus próximos. Esse acesso é opcional. Os dados de localização nunca são enviados para nossos servidores nem armazenados.</p>

      <h2 className="text-lg font-bold">3. COOKIES E ARMAZENAMENTO LOCAL</h2>
      <p className="text-zinc-300 text-sm">Utilizamos localStorage do navegador para salvar suas linhas favoritas e preferências. Esses dados ficam apenas no seu dispositivo.</p>

      <h2 className="text-lg font-bold">4. GOOGLE ANALYTICS</h2>
      <p className="text-zinc-300 text-sm">Utilizamos o Google Analytics para análise de tráfego anônimo (páginas visitadas, tempo de uso). Nenhum dado pessoal é coletado. Você pode desativar em: tools.google.com/dlpage/gaoptout</p>

      <h2 className="text-lg font-bold">5. GOOGLE ADSENSE</h2>
      <p className="text-zinc-300 text-sm">Exibimos anúncios do Google AdSense. O Google pode usar cookies para exibir anúncios relevantes com base em suas visitas anteriores a outros sites. Você pode gerenciar preferências em: adssettings.google.com</p>

      <h2 className="text-lg font-bold">6. DADOS DA API DE TRANSPORTE</h2>
      <p className="text-zinc-300 text-sm">Os dados de horários e posição dos ônibus são obtidos em tempo real da operadora Transbetim. Não armazenamos esses dados em nossos servidores.</p>

      <h2 className="text-lg font-bold">7. CONTATO</h2>
      <p className="text-zinc-300 text-sm">Dúvidas sobre privacidade: investleeg@gmail.com</p>

      <h2 className="text-lg font-bold">8. ALTERAÇÕES</h2>
      <p className="text-zinc-300 text-sm">Esta política pode ser atualizada. A data no topo indica a versão mais recente.</p>
    </div>
  )
}
