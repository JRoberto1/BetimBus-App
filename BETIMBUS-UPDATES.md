# BETIMBUS-UPDATES.md
# Documento de execução para o Antigravity
# FlowIQ © Abril 2026
# Projeto: Betim Bus — https://betim-bus-app.vercel.app

---

## CONTEXTO

O Betim Bus é uma PWA de rastreamento de ônibus em tempo real
para Betim/MG. O projeto está funcional. Este documento descreve
todas as mudanças necessárias para viabilizar a monetização via
Google AdSense e melhorar a aquisição de usuários.

Leia este documento COMPLETO antes de executar qualquer tarefa.
Execute na ordem dos blocos. Apresente APROVADO ou AJUSTES
ao final de cada bloco antes de avançar.

---

## BLOCO 1 — PÁGINAS OBRIGATÓRIAS PARA ADSENSE

### 1.1 Página /sobre

Criar `app/sobre/page.tsx` com conteúdo real e original.
Seguir o design system do projeto (dark theme, cores do Betim Transit Neo).

**Conteúdo da página:**

```
Título: Sobre o Betim Bus

O Betim Bus nasceu de uma necessidade real: moradores de Betim/MG
que dependem do transporte público todos os dias, mas não tinham
uma forma prática de consultar horários e acompanhar os ônibus
em tempo real.

Desenvolvido pela FlowIQ, o Betim Bus é um aplicativo web (PWA)
gratuito que funciona diretamente no navegador do celular — sem
precisar baixar da loja de aplicativos.

O QUE O BETIM BUS OFERECE:
- Rastreamento de ônibus em tempo real
- Horários de todas as 45 linhas municipais de Betim
- Itinerário completo de cada linha
- Funciona offline (após primeiro acesso)
- Pode ser instalado na tela inicial do celular

SOBRE A FLOWIQ:
A FlowIQ é uma empresa de soluções digitais com inteligência
artificial, com sede em Betim/MG. O Betim Bus é o primeiro
produto da FlowIQ voltado para a mobilidade urbana local.

OPERADORA:
O transporte público de Betim é operado pela Transbetim/ECOS,
vinculada à Prefeitura de Betim. O Betim Bus é um serviço
independente e não possui vínculo oficial com a Transbetim.
```

---

### 1.2 Página /privacidade

Criar `app/privacidade/page.tsx` com política completa.

**Conteúdo:**

```
Título: Política de Privacidade

Última atualização: Abril de 2026

O Betim Bus ("nós", "nosso") respeita sua privacidade.
Esta política explica quais dados são coletados e como
são utilizados.

1. DADOS QUE NÃO COLETAMOS
Não coletamos nome, e-mail, CPF, telefone ou qualquer
dado pessoal identificável. Não exigimos cadastro.

2. GEOLOCALIZAÇÃO
O app pode solicitar acesso à sua localização GPS para
mostrar pontos de ônibus próximos. Esse acesso é opcional.
Os dados de localização nunca são enviados para nossos
servidores nem armazenados.

3. COOKIES E ARMAZENAMENTO LOCAL
Utilizamos localStorage do navegador para salvar suas
linhas favoritas e preferências. Esses dados ficam apenas
no seu dispositivo.

4. GOOGLE ANALYTICS
Utilizamos o Google Analytics para análise de tráfego
anônimo (páginas visitadas, tempo de uso). Nenhum dado
pessoal é coletado. Você pode desativar em:
tools.google.com/dlpage/gaoptout

5. GOOGLE ADSENSE
Exibimos anúncios do Google AdSense. O Google pode usar
cookies para exibir anúncios relevantes com base em suas
visitas anteriores a outros sites. Você pode gerenciar
preferências em: adssettings.google.com

6. DADOS DA API DE TRANSPORTE
Os dados de horários e posição dos ônibus são obtidos
em tempo real da operadora Transbetim. Não armazenamos
esses dados em nossos servidores.

7. CONTATO
Dúvidas sobre privacidade: [EMAIL_DO_USUARIO]

8. ALTERAÇÕES
Esta política pode ser atualizada. A data no topo indica
a versão mais recente.
```

---

### 1.3 Página /contato

Criar `app/contato/page.tsx` simples e direta.

**Conteúdo:**

```
Título: Contato

Tem sugestões, encontrou algum problema ou quer falar
sobre o Betim Bus?

Entre em contato pelo e-mail:
[EMAIL_DO_USUARIO]

Respondemos em até 48 horas úteis.

REPORTAR PROBLEMA
Se um horário estiver errado ou uma linha não estiver
aparecendo, nos informe pelo e-mail acima com:
- Número da linha
- O problema encontrado

Os dados de horários vêm diretamente da Transbetim.
Problemas na operação devem ser reportados pelo
call center oficial: 0800-283-5993
```

---

### 1.4 Seção /noticias

Criar `app/noticias/page.tsx` listando os artigos.
Criar `app/noticias/[slug]/page.tsx` para cada artigo.
Cada artigo deve ter: título, data, tempo de leitura,
conteúdo em parágrafos reais, e links para fontes.

**ARTIGO 1 — slug: nova-tarifa-onibus-betim-2026**
```
Título: Nova tarifa do ônibus em Betim em 2026: o que mudou?
Data: Janeiro de 2026

A partir de 1º de janeiro de 2026, a tarifa do transporte
público coletivo de Betim passou de R$ 5,95 para R$ 6,25,
um reajuste de 5,04% regulamentado por decreto da Prefeitura
de Betim.

O reajuste foi calculado com base na recomposição dos custos
do sistema, impactados pelo aumento dos preços de insumos e
veículos, elevação do custo da mão de obra, e redução no
número de passageiros pagantes nos últimos anos.

VALORES ATUALIZADOS:
- Linhas diametrais e radiais: R$ 6,25
  (pagamento em dinheiro ou cartão BetimCard)
- Linhas circulares: consultar tabela oficial

O QUE É O BETIMCARD?
O BetimCard é o cartão de transporte de Betim, recarregável
e válido por até cinco anos. Ele agiliza o embarque e evita
a necessidade de troco. Pode ser adquirido e recarregado na
Rodoviária de Betim (Rod. Fernão Dias, 1450 — São João).

Fonte: Prefeitura de Betim (betim.mg.gov.br)
```

**ARTIGO 2 — slug: integracao-tarifaria-betim-tres-linhas**
```
Título: Integração tarifária em Betim: use 3 linhas pagando uma única passagem
Data: Fevereiro de 2026

Uma das principais novidades do transporte público de Betim
em 2026 é a integração tarifária, parte do Projeto Piloto de
Reestruturação do Sistema de Transporte anunciado pela Prefeitura.

Com a integração, o passageiro poderá utilizar até três linhas
de ônibus pagando uma única passagem — sem precisar desembolsar
o valor integral em cada troca de ônibus.

COMO VAI FUNCIONAR:
A primeira fase do projeto será implementada na região do
Citrolândia. O objetivo é reduzir o tempo de viagem, garantir
maior regularidade nos horários e ampliar as opções de destino
para os moradores da região.

POR QUE ISSO IMPORTA:
Hoje, moradores de bairros mais afastados precisam pegar dois
ou três ônibus para chegar ao centro ou ao Hospital Regional,
pagando tarifa cheia em cada um. A integração tarifária muda
esse cenário.

Acompanhe as linhas do Citrolândia no Betim Bus:
Linha 90A — Citrolândia / Nossa Senhora de Fátima
Linha 90B — Citrolândia / Hospital Regional
Linha 910A — Citrolândia / Hospital Regional Via UPA Norte
Linha 910B — Citrolândia / Centro

Fonte: Prefeitura de Betim (betim.mg.gov.br)
```

**ARTIGO 3 — slug: itinerario-alterado-linhas-261b-410**
```
Título: Itinerário alterado: linhas 261B e 410 têm novo trajeto em Betim
Data: Março de 2026

A Transbetim alterou os itinerários de duas linhas municipais
de Betim. As mudanças afetam as linhas 261B (Centro / Vila Verde)
e 410 (São Caetano / Centro).

LINHA 261B — O QUE MUDOU:
A linha deixou de passar pelas ruas Demeni, Raimundo Brito,
Tefé e Aurora da Conceição. O novo trajeto passa pela
Avenida Rio Madeira, Rua Iça, Rua Joaquim Lino e
Viaduto do PTB.

LINHA 410 — O QUE MUDOU:
A linha deixou de circular próximo à empresa Ritz, fazendo
retorno na Via Expressa. O novo trajeto inclui Avenida
Marco Túlio Isaac, Avenida Tapajós e Rua Colômbia.

Se você usa uma dessas linhas, consulte o itinerário
atualizado diretamente no Betim Bus antes de sair de casa.

Fonte: Transbetim / Betim Online
```

**ARTIGO 4 — slug: como-chegar-hospital-regional-betim-onibus**
```
Título: Como chegar ao Hospital Regional de Betim de ônibus
Data: Abril de 2026

O Hospital Regional de Betim é um dos destinos mais buscados
pelos passageiros do transporte público municipal. Localizado
na região central da cidade, ele é atendido por diversas linhas.

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
Use o Betim Bus para ver o horário em tempo real de cada
uma dessas linhas antes de sair. O app mostra os próximos
horários e, quando disponível, a posição do ônibus no mapa.
```

**ARTIGO 5 — slug: linhas-onibus-fiat-distrito-industrial-betim**
```
Título: Linhas de ônibus para a Fiat e o Distrito Industrial de Betim
Data: Abril de 2026

A Fiat e o Distrito Industrial de Betim são um dos maiores
polos de emprego da região metropolitana de Belo Horizonte.
Milhares de trabalhadores dependem do transporte público
para chegar até lá todos os dias.

LINHAS QUE ATENDEM A REGIÃO:
260A — Taquaril / Fiat
260B — Fazenda Santa Cruz / Fiat
261  — Taquaril / Vila Verde
270  — Taquaril / Bandeirinhas

HORÁRIOS:
As linhas que atendem a Fiat costumam ter reforço nos
horários de entrada e saída dos turnos. Consulte os
horários atualizados de cada linha diretamente no
Betim Bus.

DICA PARA TRABALHADORES:
Adicione sua linha favorita no Betim Bus para ver o
próximo horário direto na tela inicial do app, sem
precisar abrir a lista de linhas toda vez.
```

**ARTIGO 6 — slug: como-usar-betim-bus-guia-completo**
```
Título: Como usar o Betim Bus: guia completo para encontrar seu ônibus
Data: Abril de 2026

O Betim Bus é gratuito, funciona no navegador do celular
e não precisa ser baixado da loja de aplicativos.
Veja como aproveitar todos os recursos:

PASSO 1 — ENCONTRAR SUA LINHA
Acesse a aba "Linhas" e use a busca para encontrar sua
linha pelo número (ex: 131) ou pelo nome do bairro.

PASSO 2 — CONSULTAR HORÁRIOS
Toque na linha e veja os horários de hoje, sábado e
domingo separados por manhã, tarde e noite. Os próximos
horários aparecem destacados.

PASSO 3 — FAVORITAR
Toque no coração para favoritar sua linha principal.
Ela vai aparecer direto na tela inicial com o próximo
horário.

PASSO 4 — INSTALAR NA TELA INICIAL
No Chrome (Android): toque nos três pontos → "Adicionar
à tela inicial". No Safari (iPhone): toque em compartilhar
→ "Adicionar à tela inicial".

Após instalar, o Betim Bus abre como um aplicativo normal,
sem a barra do navegador, e funciona mesmo com internet
ruim graças ao modo offline.
```

**ARTIGO 7 — slug: betimcard-como-usar-onde-recarregar**
```
Título: BetimCard: como funciona o cartão de transporte de Betim e onde recarregar
Data: Abril de 2026

O BetimCard é o cartão oficial de transporte público de
Betim. Com ele, o embarque é mais rápido e você não precisa
de troco.

COMO FUNCIONA:
O cartão é recarregável e pode durar até cinco anos.
Basta encostar na catraca do ônibus para debitar a
passagem automaticamente.

ONDE ADQUIRIR E RECARREGAR:
- Rodoviária de Betim
  Rod. Fernão Dias, 1450 — São João, Betim/MG
- Postos autorizados pela Transbetim
  (consulte o site oficial da Prefeitura de Betim)

TARIFA 2026:
Com o BetimCard, a tarifa das linhas convencionais é
de R$ 6,25 por viagem.

Fonte: Transbetim / Prefeitura de Betim
```

---

## BLOCO 2 — ESPAÇOS DE ANÚNCIO ADSENSE

Implementar os espaços de anúncio nos locais corretos.
Usar o componente `AdSpace` já existente no projeto ou criar.
Usar o formato `<ins class="adsbygoogle">` com data-ad-slot vazio
por enquanto — o AdSense ainda está em aprovação.

**Posição A — Home page**
Entre a seção "Linhas Frequentes" e o rodapé da home.
Formato: 320×100 (banner largo mobile) / 728×90 (leaderboard desktop)

**Posição B — Topo das páginas /noticias e artigos**
Logo abaixo do título da seção de notícias.
Formato: 320×50 (mobile) / 728×90 (desktop)

**Posição C — Dentro dos artigos (in-article)**
Entre o 3º e 4º parágrafo de cada artigo.
Formato: automático AdSense (data-ad-format="auto")

**REGRA:** Nunca colocar anúncio nas telas funcionais do app
(Mapa, Detalhes da Linha, Favoritos). Apenas na Home e nas
páginas de conteúdo editorial (/noticias, /sobre, /contato).

**Código base do componente AdSpace:**
```tsx
// components/ui/AdSpace.tsx
'use client'

interface AdSpaceProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export function AdSpace({ slot, format = 'auto', className }: AdSpaceProps) {
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
```

---

## BLOCO 3 — MANIFEST E PWA

### 3.1 Alterar manifest.json

```json
{
  "name": "Betim Bus",
  "short_name": "BetimBus",
  "description": "Rastreamento de ônibus em tempo real — Betim/MG",
  "start_url": "/",
  "display": "minimal-ui",
  "background_color": "#121826",
  "theme_color": "#007BFF",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 3.2 Install prompt — somente mobile

O banner de instalação deve aparecer APENAS em dispositivos
móveis (Android e iPhone/iPad). No desktop, nunca mostrar.

```typescript
// lib/device.ts
export function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}
```

Lógica do banner mobile:
- Aparece após 30 segundos na primeira visita
- Não aparece se o app já foi instalado (verificar display-mode)
- Tem botão "Agora não" que fecha e não aparece por 7 dias
  (salvar timestamp no localStorage)

```typescript
// Verificar se já está instalado como PWA
const isInstalled = window.matchMedia('(display-mode: standalone)').matches
```

---

## BLOCO 4 — BOTÃO "ABRIR NO CELULAR" (DESKTOP)

### 4.1 Componente do botão

Criar botão visível apenas no desktop no header ou na home.
No mobile, o botão NÃO aparece.

```tsx
// components/ui/OpenOnMobileButton.tsx
'use client'
import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import { QRCodeModal } from './QRCodeModal'
import { isMobile } from '@/lib/device'

export function OpenOnMobileButton() {
  const [open, setOpen] = useState(false)
  if (isMobile()) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-primary text-white text-sm font-medium
                   hover:bg-primary/90 transition-colors"
      >
        <Smartphone size={16} />
        Abrir no celular
      </button>
      <QRCodeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

### 4.2 Modal com QR Code

```tsx
// components/ui/QRCodeModal.tsx
'use client'
import { X } from 'lucide-react'

// Usar a lib: npm install qrcode.react
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeModalProps {
  open: boolean
  onClose: () => void
}

export function QRCodeModal({ open, onClose }: QRCodeModalProps) {
  if (!open) return null
  const url = 'https://betimbus.com.br'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl p-8 max-w-sm w-full mx-4
                   border border-white/10 flex flex-col items-center gap-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full">
          <h2 className="text-white font-semibold text-lg">
            Abra no seu celular
          </h2>
          <button onClick={onClose} className="text-muted hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value={url}
            size={200}
            bgColor="#ffffff"
            fgColor="#121826"
            level="M"
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-white text-sm font-medium">
            1. Aponte a câmera do celular para o QR Code
          </p>
          <p className="text-white text-sm">
            2. Toque no link que aparecer
          </p>
          <p className="text-white text-sm">
            3. Clique em "Adicionar à tela inicial"
          </p>
        </div>

        <p className="text-muted text-xs text-center">
          ou acesse <span className="text-secondary">betimbus.com.br</span>
        </p>
      </div>
    </div>
  )
}
```

### 4.3 Instalar dependência

```bash
npm install qrcode.react
```

### 4.4 Adicionar o botão no Header

No componente `Header.tsx` ou no layout da home,
adicionar `<OpenOnMobileButton />` no canto superior direito,
ao lado do logo, visível apenas em telas md+ (desktop).

---

## BLOCO 5 — SEO

### 5.1 Corrigir title dinâmico nas páginas de linha

O title atual está genérico ("Linha - Rota de Ônibus").
Corrigir para incluir número e destino da linha.

```tsx
// app/linha/[id]/page.tsx
export async function generateMetadata({ params }) {
  const linha = await getLinhaInfo(params.id)
  return {
    title: `Linha ${linha.numero} Betim — Horários e Itinerário | Betim Bus`,
    description: `Horários, itinerário e rastreamento em tempo real da Linha ${linha.numero} — ${linha.nome} em Betim/MG.`,
    openGraph: {
      title: `Linha ${linha.numero} — ${linha.nome} | Betim Bus`,
      description: `Acompanhe a Linha ${linha.numero} de Betim em tempo real.`,
    }
  }
}
```

### 5.2 Metadata das páginas novas

```tsx
// /sobre
title: 'Sobre o Betim Bus | FlowIQ'
description: 'Conheça o Betim Bus, o app gratuito de rastreamento de ônibus em tempo real para Betim/MG, desenvolvido pela FlowIQ.'

// /privacidade
title: 'Política de Privacidade | Betim Bus'
description: 'Saiba como o Betim Bus trata seus dados, uso de geolocalização, cookies e anúncios.'

// /contato
title: 'Contato | Betim Bus'
description: 'Entre em contato com a equipe do Betim Bus para sugestões, problemas ou parcerias.'

// /noticias
title: 'Notícias sobre Transporte em Betim | Betim Bus'
description: 'Fique por dentro das novidades do transporte público de Betim: novas linhas, alterações de itinerário, tarifas e mais.'
```

### 5.3 Adicionar links no footer

O footer deve incluir links para todas as páginas novas:
Sobre · Privacidade · Contato · Notícias

---

## BLOCO 6 — RASTREAMENTO UTM (QR CODE DOS FOLHETOS)

A URL do QR Code nos folhetos físicos deve ser:
```
https://betimbus.com.br?utm_source=folheto&utm_medium=qrcode&utm_campaign=panfletagem
```

Criar uma página de destino em `/instalar` para os folhetos:

```tsx
// app/instalar/page.tsx
// Página otimizada para quem veio do QR Code do folheto
// Detecta o sistema operacional e mostra instruções específicas:
// Android: Chrome → três pontos → "Adicionar à tela inicial"
// iPhone: Safari → compartilhar → "Adicionar à tela inicial"
// Desktop: mostra o modal QR Code automaticamente
```

**Metadata da página /instalar:**
```
title: 'Instalar o Betim Bus no seu celular'
description: 'Veja como instalar o Betim Bus na tela inicial do seu celular em 3 passos simples. Gratuito, sem precisar da loja de apps.'
```

---

## CHECKLIST FINAL

Antes de fazer push, verificar:

- [ ] Páginas /sobre, /privacidade, /contato criadas com conteúdo real
- [ ] 7 artigos em /noticias criados com slugs corretos
- [ ] Componente AdSpace implementado nas 3 posições
- [ ] manifest.json com "display": "minimal-ui"
- [ ] Banner de instalação só aparece no mobile
- [ ] Botão "Abrir no celular" só aparece no desktop
- [ ] Modal com QR Code funcionando
- [ ] qrcode.react instalado
- [ ] Title dinâmico nas páginas de linha
- [ ] Metadata correta em todas as páginas novas
- [ ] Links das novas páginas no footer
- [ ] Página /instalar criada
- [ ] npm run build sem erros
- [ ] npm run lint sem warnings

---

## VARIÁVEIS A SUBSTITUIR

Antes de commitar, substituir no código:
- `[EMAIL_DO_USUARIO]` → e-mail real do Roberto
- `ca-pub-XXXXXXXXXX` → ID do AdSense quando aprovado
- `betimbus.com.br` → manter como está (domínio em processo)

---

## COMMITS SUGERIDOS

```bash
git add .
git commit -m "feat: páginas /sobre /privacidade /contato /noticias para AdSense"
git commit -m "feat: espaços de anúncio AdSense nas posições A, B e C"
git commit -m "feat: manifest minimal-ui + install prompt somente mobile"
git commit -m "feat: botão Abrir no Celular + modal QR Code no desktop"
git commit -m "fix: SEO title dinâmico nas páginas de linha"
git commit -m "feat: página /instalar para QR Code dos folhetos"
git push origin main
```

---

*BETIMBUS-UPDATES.md | FlowIQ © Abril 2026*
