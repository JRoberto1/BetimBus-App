export interface Artigo {
  slug: string
  titulo: string
  data: string
  resumo: string
  conteudo: string
  fonte?: string
}

export const artigos: Artigo[] = [
  {
    slug: 'nova-tarifa-onibus-betim-2026',
    titulo: 'Nova tarifa do ônibus em Betim em 2026: o que mudou?',
    data: 'Janeiro de 2026',
    resumo: 'A tarifa do transporte público de Betim passou de R$ 5,95 para R$ 6,25 a partir de janeiro de 2026.',
    conteudo: `A partir de 1º de janeiro de 2026, a tarifa do transporte público coletivo de Betim passou de R$ 5,95 para R$ 6,25, um reajuste de 5,04% regulamentado por decreto da Prefeitura de Betim.

O reajuste foi calculado com base na recomposição dos custos do sistema, impactados pelo aumento dos preços de insumos e veículos, elevação do custo da mão de obra, e redução no número de passageiros pagantes nos últimos anos.

Valores atualizados:
- Linhas diametrais e radiais: R$ 6,25 (pagamento em dinheiro ou cartão BetimCard)

O que é o BetimCard?
O BetimCard é o cartão de transporte de Betim, recarregável e válido por até cinco anos. Ele agiliza o embarque e evita a necessidade de troco. Pode ser adquirido e recarregado na Rodoviária de Betim (Rod. Fernão Dias, 1450 — São João).`,
    fonte: 'Prefeitura de Betim (betim.mg.gov.br)'
  },
  {
    slug: 'integracao-tarifaria-betim-tres-linhas',
    titulo: 'Integração tarifária em Betim: use 3 linhas pagando uma única passagem',
    data: 'Fevereiro de 2026',
    resumo: 'Nova modalidade permite usar até 3 linhas de ônibus pagando apenas uma passagem em Betim.',
    conteudo: `Uma das principais novidades do transporte público de Betim em 2026 é a integração tarifária, parte do Projeto Piloto de Reestruturação do Sistema de Transporte anunciado pela Prefeitura de Betim.

Com a integração, o passageiro poderá utilizar até três linhas de ônibus pagando uma única passagem — sem precisar desembolsar o valor integral em cada troca de ônibus.

Como vai funcionar:
A primeira fase do projeto será implementada na região do Citrolândia. O objetivo é reduzir o tempo de viagem, garantir maior regularidade nos horários e ampliar as opções de destino.

Por que isso importa:
Hoje, moradores de bairros mais afastados precisam pegar dois ou três ônibus para chegar ao centro ou ao Hospital Regional, pagando tarifa cheia em cada um. A integração tarifária muda esse cenário.

Linhas do Citrolândia no Betim Bus:
- Linha 90A — Citrolândia / Nossa Senhora de Fátima
- Linha 90B — Citrolândia / Hospital Regional
- Linha 910A — Citrolândia / Hospital Regional Via UPA Norte
- Linha 910B — Citrolândia / Centro`,
    fonte: 'Prefeitura de Betim (betim.mg.gov.br)'
  },
  {
    slug: 'itinerario-alterado-linhas-261b-410',
    titulo: 'Itinerário alterado: linhas 261B e 410 têm novo trajeto em Betim',
    data: 'Março de 2026',
    resumo: 'Transbetim alterou os trajetos das linhas 261B e 410. Veja o que mudou.',
    conteudo: `A Transbetim alterou os itinerários de duas linhas municipais de Betim. As mudanças afetam as linhas 261B (Centro / Vila Verde) e 410 (São Caetano / Centro).

Linha 261B — o que mudou:
A linha deixou de passar pelas ruas Demeni, Raimundo Brito, Tefé e Aurora da Conceição. O novo trajeto passa pela Avenida Rio Madeira, Rua Iça, Rua Joaquim Lino e Viaduto do PTB.

Linha 410 — o que mudou:
A linha deixou de circular próximo à empresa Ritz, fazendo retorno na Via Expressa. O novo trajeto inclui Avenida Marco Túlio Isaac, Avenida Tapajós e Rua Colômbia.

Se você usa uma dessas linhas, consulte o itinerário atualizado diretamente no Betim Bus antes de sair de casa.`,
    fonte: 'Transbetim / Betim Online'
  },
  {
    slug: 'como-chegar-hospital-regional-betim-onibus',
    titulo: 'Como chegar ao Hospital Regional de Betim de ônibus',
    data: 'Abril de 2026',
    resumo: 'Veja quais linhas de ônibus passam no Hospital Regional de Betim e como usar o Betim Bus para chegar lá.',
    conteudo: `O Hospital Regional de Betim é um dos destinos mais buscados pelos passageiros do transporte público municipal. Ele é atendido por diversas linhas que partem de diferentes regiões da cidade.

Linhas que passam no Hospital Regional:
- Linha 50  — Granja Verde / Hospital Regional
- Linha 53  — Capelinha / Hospital Regional
- Linha 54  — Alvorada / Hospital Regional
- Linha 60  — PTB / Hospital Regional
- Linha 90B — Citrolândia / Hospital Regional
- Linha 160A — Hospital Regional / Petrovale
- Linha 160B — Hospital Regional / Petrovale
- Linha 313 — Parque das Acácias / Hospital Regional
- Linha 910A — Citrolândia / Hospital Regional Via UPA Norte
- Linha 920 — Jardim Paulista / Hospital Regional

Dica:
Use o Betim Bus para ver o horário em tempo real de cada uma dessas linhas antes de sair. O app mostra os próximos horários e, quando disponível, a posição do ônibus no mapa.`
  },
  {
    slug: 'linhas-onibus-fiat-distrito-industrial-betim',
    titulo: 'Linhas de ônibus para a Fiat e o Distrito Industrial de Betim',
    data: 'Abril de 2026',
    resumo: 'Guia completo das linhas de ônibus que atendem a Fiat e o Distrito Industrial de Betim.',
    conteudo: `A Fiat e o Distrito Industrial de Betim são um dos maiores polos de emprego da região metropolitana de Belo Horizonte. Milhares de trabalhadores dependem do transporte público para chegar até lá todos os dias.

Linhas que atendem a região:
- Linha 260A — Taquaril / Fiat
- Linha 260B — Fazenda Santa Cruz / Fiat
- Linha 261  — Taquaril / Vila Verde
- Linha 270  — Taquaril / Bandeirinhas

As linhas que atendem a Fiat costumam ter reforço nos horários de entrada e saída dos turnos. Consulte os horários atualizados de cada linha no Betim Bus.

Dica para trabalhadores:
Adicione sua linha favorita no Betim Bus para ver o próximo horário direto na tela inicial do app, sem precisar abrir a lista de linhas toda vez.`
  },
  {
    slug: 'como-usar-betim-bus-guia-completo',
    titulo: 'Como usar o Betim Bus: guia completo para encontrar seu ônibus',
    data: 'Abril de 2026',
    resumo: 'Aprenda a usar o Betim Bus para consultar horários, favoritar linhas e instalar o app no celular.',
    conteudo: `O Betim Bus é gratuito, funciona no navegador do celular e não precisa ser baixado da loja de aplicativos.

Passo 1 — Encontrar sua linha
Acesse a aba "Linhas" e use a busca para encontrar sua linha pelo número (ex: 131) ou pelo nome do bairro.

Passo 2 — Consultar horários
Toque na linha e veja os horários de hoje, sábado e domingo separados por manhã, tarde e noite. Os próximos horários aparecem destacados.

Passo 3 — Favoritar
Toque no coração para favoritar sua linha principal. Ela vai aparecer direto na tela inicial com o próximo horário.

Passo 4 — Instalar na tela inicial
No Android (Chrome): toque nos três pontos → "Adicionar à tela inicial".
No iPhone (Safari): toque em compartilhar → "Adicionar à tela inicial".

Após instalar, o Betim Bus abre como um aplicativo normal e funciona mesmo com internet ruim graças ao modo offline.`
  },
  {
    slug: 'betimcard-como-usar-onde-recarregar',
    titulo: 'BetimCard: como funciona o cartão de transporte de Betim e onde recarregar',
    data: 'Abril de 2026',
    resumo: 'Tudo sobre o BetimCard, o cartão de transporte oficial de Betim: como usar, onde recarregar e vantagens.',
    conteudo: `O BetimCard é o cartão oficial de transporte público de Betim. Com ele, o embarque é mais rápido e você não precisa de troco.

Como funciona:
O cartão é recarregável e pode durar até cinco anos. Basta encostar na catraca do ônibus para debitar a passagem automaticamente.

Onde adquirir e recarregar:
- Rodoviária de Betim
  Rod. Fernão Dias, 1450 — São João, Betim/MG
- Postos autorizados pela Transbetim
  (consulte o site oficial da Prefeitura de Betim)

Tarifa 2026:
Com o BetimCard, a tarifa das linhas convencionais é de R$ 6,25 por viagem.`,
    fonte: 'Transbetim / Prefeitura de Betim'
  }
]

export const getArtigos = () => artigos;
export const getArtigoBySlug = (slug: string) => artigos.find(a => a.slug === slug);
