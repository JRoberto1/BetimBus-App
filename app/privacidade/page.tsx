import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Betim Bus',
  description: 'Saiba como o Betim Bus trata seus dados, uso de geolocalização, cookies e anúncios.',
}

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 my-8 px-5 pb-16 text-white prose prose-invert">
      <h1 className="text-2xl font-black text-[#007BFF]">Política de Privacidade</h1>
      <p className="text-sm text-[#8A94A6]">Última atualização: Abril de 2026</p>
      
      <p>
        O Betim Bus respeita sua privacidade. Esta política explica
        quais dados são coletados e como são utilizados.
      </p>

      <h2 className="text-lg font-bold mt-6">1. Dados que não coletamos</h2>
      <p>
        Não coletamos nome, e-mail, CPF, telefone ou qualquer dado
        pessoal identificável. Não exigimos cadastro.
      </p>

      <h2 className="text-lg font-bold mt-6">2. Geolocalização</h2>
      <p>
        O app pode solicitar acesso à sua localização GPS para
        mostrar pontos de ônibus próximos. Esse acesso é opcional.
        Os dados de localização nunca são enviados para nossos
        servidores nem armazenados.
      </p>

      <h2 className="text-lg font-bold mt-6">3. Cookies e armazenamento local</h2>
      <p>
        Utilizamos localStorage do navegador para salvar suas linhas
        favoritas e preferências. Esses dados ficam apenas no seu
        dispositivo.
      </p>

      <h2 className="text-lg font-bold mt-6">4. Google Analytics</h2>
      <p>
        Utilizamos o Google Analytics para análise de tráfego
        anônimo (páginas visitadas, tempo de uso). Nenhum dado
        pessoal é coletado. Você pode desativar em:
        tools.google.com/dlpage/gaoptout
      </p>

      <h2 className="text-lg font-bold mt-6">5. Google AdSense</h2>
      <p>
        Exibimos anúncios do Google AdSense. O Google pode usar
        cookies para exibir anúncios relevantes com base em suas
        visitas anteriores a outros sites. Você pode gerenciar
        preferências em: adssettings.google.com
      </p>

      <h2 className="text-lg font-bold mt-6">6. Dados da API de transporte</h2>
      <p>
        Os dados de horários e posição dos ônibus são obtidos em
        tempo real da operadora Transbetim. Não armazenamos esses
        dados em nossos servidores.
      </p>

      <h2 className="text-lg font-bold mt-6">7. Contato</h2>
      <p>
        Dúvidas sobre privacidade: contato@betimbus.com.br
      </p>

      <h2 className="text-lg font-bold mt-6">8. Alterações</h2>
      <p>
        Esta política pode ser atualizada. A data no topo indica
        a versão mais recente.
      </p>
    </div>
  )
}
