export interface Noticia {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const db: Noticia[] = [
  {
    slug: 'nova-tarifa-onibus-betim-2026',
    title: 'Nova tarifa do ônibus em Betim em 2026: o que mudou?',
    date: 'Janeiro de 2026',
    excerpt: 'A partir de 1º de janeiro de 2026, a tarifa do transporte público de Betim passou de R$ 5,95 para R$ 6,25.',
    content: `A partir de 1º de janeiro de 2026, a tarifa do transporte público coletivo de Betim passou de R$ 5,95 para R$ 6,25, um reajuste de 5,04% regulamentado por decreto da Prefeitura de Betim.

O reajuste foi calculado com base na recomposição dos custos do sistema, impactados pelo aumento dos preços de insumos e veículos, elevação do custo da mão de obra, e redução no número de passageiros pagantes nos últimos anos.

VALORES ATUALIZADOS:
- Linhas diametrais e radiais: R$ 6,25 (pagamento em dinheiro ou cartão BetimCard)
- Linhas circulares: consultar tabela oficial

O QUE É O BETIMCARD?
O BetimCard é o cartão de transporte de Betim, recarregável e válido por até cinco anos. Ele agiliza o embarque e evita a necessidade de troco. Pode ser adquirido e recarregado na Rodoviária de Betim (Rod. Fernão Dias, 1450 — São João).

Fonte: Prefeitura de Betim (betim.mg.gov.br)`
  },
  {
    slug: 'integracao-tarifaria-betim-tres-linhas',
    title: 'Integração tarifária em Betim: use 3 linhas pagando uma única passagem',
    date: 'Fevereiro de 2026',
    excerpt: 'Novidade permite que o passageiro utilize até três ônibus da cidade pagando apenas uma tarifa.',
    content: `Uma das principais novidades do transporte público de Betim em 2026 é a integração tarifária, parte do Projeto Piloto de Reestruturação do Sistema de Transporte anunciado pela Prefeitura.

Com a integração, o passageiro poderá utilizar até três linhas de ônibus pagando uma única passagem — sem precisar desembolsar o valor integral em cada troca de ônibus.

COMO VAI FUNCIONAR:
A primeira fase do projeto será implementada na região do Citrolândia. O objetivo é reduzir o tempo de viagem, garantir maior regularidade nos horários e ampliar as opções de destino para os moradores da região.

POR QUE ISSO IMPORTA:
Hoje, moradores de bairros mais afastados precisam pegar dois ou três ônibus para chegar ao centro ou ao Hospital Regional, pagando tarifa cheia em cada um. A integração tarifária muda esse cenário.

Acompanhe as linhas do Citrolândia no Betim Bus:
Linha 90A — Citrolândia / Nossa Senhora de Fátima
Linha 90B — Citrolândia / Hospital Regional
Linha 910A — Citrolândia / Hospital Regional Via UPA Norte
Linha 910B — Citrolândia / Centro

Fonte: Prefeitura de Betim (betim.mg.gov.br)`
  },
  {
    slug: 'itinerario-alterado-linhas-261b-410',
    title: 'Itinerário alterado: linhas 261B e 410 têm novo trajeto em Betim',
    date: 'Março de 2026',
    excerpt: 'A Transbetim atualizou importantes rotas no Centro e Vila Verde.',
    content: `A Transbetim alterou os itinerários de duas linhas municipais de Betim. As mudanças afetam as linhas 261B (Centro / Vila Verde) e 410 (São Caetano / Centro).

LINHA 261B — O QUE MUDOU:
A linha deixou de passar pelas ruas Demeni, Raimundo Brito, Tefé e Aurora da Conceição. O novo trajeto passa pela Avenida Rio Madeira, Rua Iça, Rua Joaquim Lino e Viaduto do PTB.

LINHA 410 — O QUE MUDOU:
A linha deixou de circular próximo à empresa Ritz, fazendo retorno na Via Expressa. O novo trajeto inclui Avenida Marco Túlio Isaac, Avenida Tapajós e Rua Colômbia.

Se você usa uma dessas linhas, consulte o itinerário atualizado diretamente no Betim Bus antes de sair de casa.

Fonte: Transbetim / Betim Online`
  },
  {
    slug: 'como-chegar-hospital-regional-betim-onibus',
    title: 'Como chegar ao Hospital Regional de Betim de ônibus',
    date: 'Abril de 2026',
    excerpt: 'Guia completo com todas as conexões viárias que param na porta da ala vermelha.',
    content: `O Hospital Regional de Betim é um dos destinos mais buscados pelos passageiros do transporte público municipal. Localizado na região central da cidade, ele é atendido por diversas linhas.

LINHAS QUE PASSAM NO HOSPITAL REGIONAL:
50  — Granja Verde / Hospital Regional
53  — Capelinha / Hospital Regional
54  — Alvorada / Hospital Regional
60  — PTB / Hospital Regional
90B — Citrolândia / Hospital Regional
160A — Hospital Regional / Petrovale
160B — Hospital Regional / Petrovale
313 — Parque das Acácias / Hospital Regional
910A — Citrolândia / Hospital Regional Via UPA Norte
920 — Jardim Paulista / Hospital Regional

DICA:
Use o Betim Bus para ver o horário em tempo real de cada uma dessas linhas antes de sair. O app mostra os próximos horários e, quando disponível, a posição do ônibus no mapa.`
  },
  {
    slug: 'linhas-onibus-fiat-distrito-industrial-betim',
    title: 'Linhas de ônibus para a Fiat e o Distrito Industrial de Betim',
    date: 'Abril de 2026',
    excerpt: 'As artérias de transporte essenciais para trabalhadores do polo fabril de Betim.',
    content: `A Fiat e o Distrito Industrial de Betim são um dos maiores polos de emprego da região metropolitana de Belo Horizonte. Milhares de trabalhadores dependem do transporte público para chegar até lá todos os dias.

LINHAS QUE ATENDEM A REGIÃO:
260A — Taquaril / Fiat
260B — Fazenda Santa Cruz / Fiat
261  — Taquaril / Vila Verde
270  — Taquaril / Bandeirinhas

HORÁRIOS:
As linhas que atendem a Fiat costumam ter reforço nos horários de entrada e saída dos turnos. Consulte os horários atualizados de cada linha diretamente no Betim Bus.

DICA PARA TRABALHADORES:
Adicione sua linha favorita no Betim Bus para ver o próximo horário direto na tela inicial do app, sem precisar abrir a lista de linhas toda vez.`
  },
  {
    slug: 'como-usar-betim-bus-guia-completo',
    title: 'Como usar o Betim Bus: guia completo para encontrar seu ônibus',
    date: 'Abril de 2026',
    excerpt: 'Dicas indispensáveis para quem quer instalar a PWA sem ocupar memória do telefone.',
    content: `O Betim Bus é gratuito, funciona no navegador do celular e não precisa ser baixado da loja de aplicativos. Veja como aproveitar todos os recursos:

PASSO 1 — ENCONTRAR SUA LINHA
Acesse a aba "Linhas" e use a busca para encontrar sua linha pelo número (ex: 131) ou pelo nome do bairro.

PASSO 2 — CONSULTAR HORÁRIOS
Toque na linha e veja os horários de hoje, sábado e domingo separados por manhã, tarde e noite. Os próximos horários aparecem destacados.

PASSO 3 — FAVORITAR
Toque no coração para favoritar sua linha principal. Ela vai aparecer direto na tela inicial com o próximo horário.

PASSO 4 — INSTALAR NA TELA INICIAL
No Chrome (Android): toque nos três pontos → "Adicionar à tela inicial". No Safari (iPhone): toque em compartilhar → "Adicionar à tela inicial".

Após instalar, o Betim Bus abre como um aplicativo normal, sem a barra do navegador, e funciona mesmo com internet ruim graças ao modo offline.`
  },
  {
    slug: 'betimcard-como-usar-onde-recarregar',
    title: 'BetimCard: como funciona o cartão de transporte de Betim e onde recarregar',
    date: 'Abril de 2026',
    excerpt: 'Integrações, passagens e postos de conveniência oficiais.',
    content: `O BetimCard é o cartão oficial de transporte público de Betim. Com ele, o embarque é mais rápido e você não precisa de troco.

COMO FUNCIONA:
O cartão é recarregável e pode durar até cinco anos. Basta encostar na catraca do ônibus para debitar a passagem automaticamente.

ONDE ADQUIRIR E RECARREGAR:
- Rodoviária de Betim (Rod. Fernão Dias, 1450 — São João, Betim/MG)
- Postos autorizados pela Transbetim (consulte o site oficial da Prefeitura de Betim)

TARIFA 2026:
Com o BetimCard, a tarifa das linhas convencionais é de R$ 6,25 por viagem.

Fonte: Transbetim / Prefeitura de Betim`
  }
]

export const getNoticias = () => db;
export const getNoticiaBySlug = (slug: string) => db.find(n => n.slug === slug);
