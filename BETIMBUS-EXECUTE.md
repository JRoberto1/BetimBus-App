# BETIMBUS-EXECUTE.md
# Documento de execução OBRIGATÓRIA para o Antigravity
# FlowIQ © Abril 2026
# Repositório: betim-bus-app
# Deploy: https://betim-bus-app.vercel.app

---

## ⚠️ INSTRUÇÕES OBRIGATÓRIAS — LEIA ANTES DE QUALQUER COISA

Este documento contém 7 blocos de tarefas.
Você DEVE executar TODOS os blocos, na ordem apresentada.
Não pule nenhum bloco. Não resuma. Não simule execução.

Após cada bloco:
1. Mostre os arquivos criados ou modificados
2. Rode `npm run build` e confirme zero erros
3. Escreva explicitamente: ✅ BLOCO [N] CONCLUÍDO
4. Só então avance para o próximo bloco

Se encontrar erro: pare, mostre o erro completo, corrija,
rode o build novamente. Nunca avance com erro.

Ao final de TODOS os blocos:
- Rode `npm run build` completo
- Rode `npm run lint`
- Faça git add . && git commit && git push
- Confirme a URL do deploy na Vercel

---

## BLOCO 1 — MANIFEST.JSON: CORRIGIR MODO DE EXIBIÇÃO

**Problema atual:** o site abre em modo `standalone` no desktop,
sem barra de URL. Isso prejudica o AdSense e a experiência web.

**Arquivo a modificar:** `public/manifest.json`

Altere APENAS o campo `display`:
```json
"display": "minimal-ui"
```

O arquivo completo deve ficar assim:
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

Após alterar: confirme que o arquivo foi salvo corretamente.
✅ BLOCO 1 CONCLUÍDO → avance para o Bloco 2.

---

## BLOCO 2 — NAVEGAÇÃO: HEADER COM MENU INSTITUCIONAL

**Problema atual:** não existe forma de acessar as páginas
institucionais (Sobre, Privacidade, Contato, Notícias).
O bottom nav está correto e NÃO deve ser alterado.

**Solução:** adicionar ao Header existente dois elementos:

### 2.1 — Link "Notícias" no header (desktop e mobile)

No componente Header, adicionar link visível:
```tsx
<Link href="/noticias" className="text-sm text-muted hover:text-white transition-colors">
  Notícias
</Link>
```

### 2.2 — Menu "Mais" com dropdown (desktop) e drawer (mobile)

**No desktop** — dropdown ao passar o mouse em "Mais ▾":
```
Mais ▾
 ├── Sobre
 ├── Privacidade
 └── Contato
```

**No mobile** — ícone ☰ no header abre drawer lateral:
```
─────────────────────
  📰 Notícias
  ℹ️  Sobre
  🔒 Privacidade
  ✉️  Contato
─────────────────────
```

Usar apenas Lucide React para ícones. Nunca emojis no código.
Seguir o design system: fundo #121826, texto branco, hover #007BFF.

✅ BLOCO 2 CONCLUÍDO → avance para o Bloco 3.

---

## BLOCO 3 — PÁGINAS INSTITUCIONAIS

Criar os seguintes arquivos com o conteúdo EXATO abaixo.
Seguir o design system do projeto em todas as páginas.
Cada página deve ter metadata SEO correta.

---

### 3.1 — Criar `app/sobre/page.tsx`

**Metadata:**
```tsx
export const metadata = {
  title: 'Sobre o Betim Bus | FlowIQ',
  description: 'Conheça o Betim Bus, o app gratuito de rastreamento de ônibus em tempo real para Betim/MG, desenvolvido pela FlowIQ.',
}
```

**Conteúdo da página — use este texto EXATO:**

```
Betim Bus — Sobre o projeto

Um app criado por quem conhece Betim

O Betim Bus nasceu de uma necessidade real. Quem mora em Betim
e depende do transporte público sabe como é difícil: você chega
no ponto, não sabe se o ônibus já passou, se está atrasado, ou
qual linha pega primeiro. Informação que deveria ser simples,
nunca estava disponível de forma prática.

Foi pensando nisso que a FlowIQ desenvolveu o Betim Bus — um
aplicativo gratuito, direto no navegador do celular, sem
burocracia de loja de aplicativos.

O que o Betim Bus oferece

Todas as 45 linhas municipais de Betim em um só lugar.
Horários reais de segunda a domingo, itinerário completo de
cada linha, e rastreamento em tempo real quando o ônibus está
com sinal GPS ativo.

Funciona offline. Depois do primeiro acesso, os horários ficam
salvos no celular — úteis mesmo sem internet.

Pode ser instalado na tela inicial como um aplicativo normal,
sem precisar da Play Store ou App Store.

Sobre a FlowIQ

A FlowIQ é uma empresa de soluções digitais com inteligência
artificial, com sede em Betim/MG. O Betim Bus é o primeiro
produto da FlowIQ voltado para a mobilidade urbana local.

Aviso importante

O Betim Bus é um serviço independente. Os dados de horários
e posição dos ônibus são fornecidos pela operadora oficial
Transbetim/ECOS, vinculada à Prefeitura de Betim.
Problemas na operação das linhas devem ser reportados pelo
call center oficial: 0800-283-5993.
```

---

### 3.2 — Criar `app/privacidade/page.tsx`

**Metadata:**
```tsx
export const metadata = {
  title: 'Política de Privacidade | Betim Bus',
  description: 'Saiba como o Betim Bus trata seus dados, uso de geolocalização, cookies e anúncios.',
}
```

**Conteúdo EXATO:**

```
Política de Privacidade
Última atualização: Abril de 2026

O Betim Bus respeita sua privacidade. Esta política explica
quais dados são coletados e como são utilizados.

1. Dados que não coletamos
Não coletamos nome, e-mail, CPF, telefone ou qualquer dado
pessoal identificável. Não exigimos cadastro.

2. Geolocalização
O app pode solicitar acesso à sua localização GPS para
mostrar pontos de ônibus próximos. Esse acesso é opcional.
Os dados de localização nunca são enviados para nossos
servidores nem armazenados.

3. Cookies e armazenamento local
Utilizamos localStorage do navegador para salvar suas linhas
favoritas e preferências. Esses dados ficam apenas no seu
dispositivo.

4. Google Analytics
Utilizamos o Google Analytics para análise de tráfego
anônimo (páginas visitadas, tempo de uso). Nenhum dado
pessoal é coletado. Você pode desativar em:
tools.google.com/dlpage/gaoptout

5. Google AdSense
Exibimos anúncios do Google AdSense. O Google pode usar
cookies para exibir anúncios relevantes com base em suas
visitas anteriores a outros sites. Você pode gerenciar
preferências em: adssettings.google.com

6. Dados da API de transporte
Os dados de horários e posição dos ônibus são obtidos em
tempo real da operadora Transbetim. Não armazenamos esses
dados em nossos servidores.

7. Contato
Dúvidas sobre privacidade: contato@betimbus.com.br

8. Alterações
Esta política pode ser atualizada. A data no topo indica
a versão mais recente.
```

---

### 3.3 — Criar `app/contato/page.tsx`

**Metadata:**
```tsx
export const metadata = {
  title: 'Contato | Betim Bus',
  description: 'Entre em contato com a equipe do Betim Bus para sugestões, problemas ou parcerias.',
}
```

**Conteúdo EXATO:**

```
Contato

Tem sugestões, encontrou algum problema ou quer falar
sobre o Betim Bus?

Entre em contato pelo e-mail:
contato@betimbus.com.br

Respondemos em até 48 horas úteis.

Reportar problema com linha ou horário
Se um horário estiver errado ou uma linha não estiver
aparecendo, nos informe pelo e-mail acima com:
- Número da linha
- O problema encontrado

Os dados de horários vêm diretamente da Transbetim.
Problemas na operação devem ser reportados pelo
call center oficial: 0800-283-5993
```

✅ BLOCO 3 CONCLUÍDO → avance para o Bloco 4.

---

## BLOCO 4 — SEÇÃO DE NOTÍCIAS

### 4.1 — Criar `app/noticias/page.tsx`

**Metadata:**
```tsx
export const metadata = {
  title: 'Notícias sobre Transporte em Betim | Betim Bus',
  description: 'Fique por dentro das novidades do transporte público de Betim: novas linhas, alterações de itinerário, tarifas e mais.',
}
```

Criar lista de cards linkando para cada artigo.
Cada card deve ter: título, data, resumo de 2 linhas e link.

### 4.2 — Criar `app/noticias/[slug]/page.tsx`

Rota dinâmica para os artigos individuais.
Gerar metadata dinâmica com título e descrição do artigo.

### 4.3 — Criar `lib/noticias.ts`

Array com todos os artigos. Estrutura:
```typescript
interface Artigo {
  slug: string
  titulo: string
  data: string
  resumo: string
  conteudo: string // HTML ou markdown
  fonte?: string
}
```

### 4.4 — Artigos a criar (7 artigos obrigatórios)

**Artigo 1 — slug: nova-tarifa-onibus-betim-2026**
```
Título: Nova tarifa do ônibus em Betim em 2026: o que mudou?
Data: Janeiro de 2026
Resumo: A tarifa do transporte público de Betim passou de
R$ 5,95 para R$ 6,25 a partir de janeiro de 2026.

Conteúdo:
A partir de 1º de janeiro de 2026, a tarifa do transporte
público coletivo de Betim passou de R$ 5,95 para R$ 6,25,
um reajuste de 5,04% regulamentado por decreto da Prefeitura
de Betim.

O reajuste foi calculado com base na recomposição dos custos
do sistema, impactados pelo aumento dos preços de insumos e
veículos, elevação do custo da mão de obra, e redução no
número de passageiros pagantes nos últimos anos.

Valores atualizados:
- Linhas diametrais e radiais: R$ 6,25
  (pagamento em dinheiro ou cartão BetimCard)

O que é o BetimCard?
O BetimCard é o cartão de transporte de Betim, recarregável
e válido por até cinco anos. Ele agiliza o embarque e evita
a necessidade de troco. Pode ser adquirido e recarregado na
Rodoviária de Betim (Rod. Fernão Dias, 1450 — São João).

Fonte: Prefeitura de Betim (betim.mg.gov.br)
```

**Artigo 2 — slug: integracao-tarifaria-betim-tres-linhas**
```
Título: Integração tarifária em Betim: use 3 linhas pagando uma única passagem
Data: Fevereiro de 2026
Resumo: Nova modalidade permite usar até 3 linhas de ônibus
pagando apenas uma passagem em Betim.

Conteúdo:
Uma das principais novidades do transporte público de Betim
em 2026 é a integração tarifária, parte do Projeto Piloto de
Reestruturação do Sistema de Transporte anunciado pela
Prefeitura de Betim.

Com a integração, o passageiro poderá utilizar até três linhas
de ônibus pagando uma única passagem — sem precisar desembolsar
o valor integral em cada troca de ônibus.

Como vai funcionar:
A primeira fase do projeto será implementada na região do
Citrolândia. O objetivo é reduzir o tempo de viagem, garantir
maior regularidade nos horários e ampliar as opções de destino.

Por que isso importa:
Hoje, moradores de bairros mais afastados precisam pegar dois
ou três ônibus para chegar ao centro ou ao Hospital Regional,
pagando tarifa cheia em cada um. A integração tarifária muda
esse cenário.

Linhas do Citrolândia no Betim Bus:
- Linha 90A — Citrolândia / Nossa Senhora de Fátima
- Linha 90B — Citrolândia / Hospital Regional
- Linha 910A — Citrolândia / Hospital Regional Via UPA Norte
- Linha 910B — Citrolândia / Centro

Fonte: Prefeitura de Betim (betim.mg.gov.br)
```

**Artigo 3 — slug: itinerario-alterado-linhas-261b-410**
```
Título: Itinerário alterado: linhas 261B e 410 têm novo trajeto em Betim
Data: Março de 2026
Resumo: Transbetim alterou os trajetos das linhas 261B e 410.
Veja o que mudou.

Conteúdo:
A Transbetim alterou os itinerários de duas linhas municipais
de Betim. As mudanças afetam as linhas 261B (Centro / Vila Verde)
e 410 (São Caetano / Centro).

Linha 261B — o que mudou:
A linha deixou de passar pelas ruas Demeni, Raimundo Brito,
Tefé e Aurora da Conceição. O novo trajeto passa pela
Avenida Rio Madeira, Rua Iça, Rua Joaquim Lino e Viaduto do PTB.

Linha 410 — o que mudou:
A linha deixou de circular próximo à empresa Ritz, fazendo
retorno na Via Expressa. O novo trajeto inclui Avenida
Marco Túlio Isaac, Avenida Tapajós e Rua Colômbia.

Se você usa uma dessas linhas, consulte o itinerário
atualizado diretamente no Betim Bus antes de sair de casa.

Fonte: Transbetim / Betim Online
```

**Artigo 4 — slug: como-chegar-hospital-regional-betim-onibus**
```
Título: Como chegar ao Hospital Regional de Betim de ônibus
Data: Abril de 2026
Resumo: Veja quais linhas de ônibus passam no Hospital Regional
de Betim e como usar o Betim Bus para chegar lá.

Conteúdo:
O Hospital Regional de Betim é um dos destinos mais buscados
pelos passageiros do transporte público municipal. Ele é atendido
por diversas linhas que partem de diferentes regiões da cidade.

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
Use o Betim Bus para ver o horário em tempo real de cada
uma dessas linhas antes de sair. O app mostra os próximos
horários e, quando disponível, a posição do ônibus no mapa.
```

**Artigo 5 — slug: linhas-onibus-fiat-distrito-industrial-betim**
```
Título: Linhas de ônibus para a Fiat e o Distrito Industrial de Betim
Data: Abril de 2026
Resumo: Guia completo das linhas de ônibus que atendem a Fiat
e o Distrito Industrial de Betim.

Conteúdo:
A Fiat e o Distrito Industrial de Betim são um dos maiores
polos de emprego da região metropolitana de Belo Horizonte.
Milhares de trabalhadores dependem do transporte público
para chegar até lá todos os dias.

Linhas que atendem a região:
- Linha 260A — Taquaril / Fiat
- Linha 260B — Fazenda Santa Cruz / Fiat
- Linha 261  — Taquaril / Vila Verde
- Linha 270  — Taquaril / Bandeirinhas

As linhas que atendem a Fiat costumam ter reforço nos
horários de entrada e saída dos turnos. Consulte os
horários atualizados de cada linha no Betim Bus.

Dica para trabalhadores:
Adicione sua linha favorita no Betim Bus para ver o
próximo horário direto na tela inicial do app, sem
precisar abrir a lista de linhas toda vez.
```

**Artigo 6 — slug: como-usar-betim-bus-guia-completo**
```
Título: Como usar o Betim Bus: guia completo para encontrar seu ônibus
Data: Abril de 2026
Resumo: Aprenda a usar o Betim Bus para consultar horários,
favoritar linhas e instalar o app no celular.

Conteúdo:
O Betim Bus é gratuito, funciona no navegador do celular
e não precisa ser baixado da loja de aplicativos.

Passo 1 — Encontrar sua linha
Acesse a aba "Linhas" e use a busca para encontrar sua
linha pelo número (ex: 131) ou pelo nome do bairro.

Passo 2 — Consultar horários
Toque na linha e veja os horários de hoje, sábado e
domingo separados por manhã, tarde e noite. Os próximos
horários aparecem destacados.

Passo 3 — Favoritar
Toque no coração para favoritar sua linha principal.
Ela vai aparecer direto na tela inicial com o próximo
horário.

Passo 4 — Instalar na tela inicial
No Android (Chrome): toque nos três pontos → "Adicionar
à tela inicial".
No iPhone (Safari): toque em compartilhar → "Adicionar
à tela inicial".

Após instalar, o Betim Bus abre como um aplicativo normal
e funciona mesmo com internet ruim graças ao modo offline.
```

**Artigo 7 — slug: betimcard-como-usar-onde-recarregar**
```
Título: BetimCard: como funciona o cartão de transporte de Betim e onde recarregar
Data: Abril de 2026
Resumo: Tudo sobre o BetimCard, o cartão de transporte
oficial de Betim: como usar, onde recarregar e vantagens.

Conteúdo:
O BetimCard é o cartão oficial de transporte público de
Betim. Com ele, o embarque é mais rápido e você não precisa
de troco.

Como funciona:
O cartão é recarregável e pode durar até cinco anos.
Basta encostar na catraca do ônibus para debitar a
passagem automaticamente.

Onde adquirir e recarregar:
- Rodoviária de Betim
  Rod. Fernão Dias, 1450 — São João, Betim/MG
- Postos autorizados pela Transbetim
  (consulte o site oficial da Prefeitura de Betim)

Tarifa 2026:
Com o BetimCard, a tarifa das linhas convencionais é
de R$ 6,25 por viagem.

Fonte: Transbetim / Prefeitura de Betim
```

✅ BLOCO 4 CONCLUÍDO → avance para o Bloco 5.

---

## BLOCO 5 — BOTÃO "ABRIR NO CELULAR" + MODAL QR CODE

Este bloco é OBRIGATÓRIO. Não pule.

### 5.1 — Instalar dependência

```bash
npm install qrcode.react
```

Confirme que instalou antes de continuar.

### 5.2 — Criar `lib/device.ts`

```typescript
export function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isInstalled(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches
}
```

### 5.3 — Criar `components/ui/QRCodeModal.tsx`

```tsx
'use client'
import { X, Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface Props {
  open: boolean
  onClose: () => void
}

export function QRCodeModal({ open, onClose }: Props) {
  if (!open) return null
  const url = 'https://betimbus.com.br'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1C2333] rounded-2xl p-8 max-w-sm w-full mx-4 border border-white/10 flex flex-col items-center gap-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Smartphone size={20} className="text-[#007BFF]" />
            <h2 className="text-white font-semibold text-lg">
              Abra no seu celular
            </h2>
          </div>
          <button onClick={onClose} className="text-[#8A94A6] hover:text-white transition-colors">
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

        <div className="text-center space-y-2 w-full">
          <p className="text-white text-sm font-medium">Como instalar:</p>
          <p className="text-[#8A94A6] text-sm">1. Aponte a câmera do celular para o QR Code</p>
          <p className="text-[#8A94A6] text-sm">2. Toque no link que aparecer</p>
          <p className="text-[#8A94A6] text-sm">3. Clique em "Adicionar à tela inicial"</p>
        </div>

        <p className="text-[#8A94A6] text-xs text-center">
          ou acesse{' '}
          <span className="text-[#00F2FF]">betimbus.com.br</span>
          {' '}no navegador do celular
        </p>
      </div>
    </div>
  )
}
```

### 5.4 — Criar `components/ui/OpenOnMobileButton.tsx`

```tsx
'use client'
import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import { QRCodeModal } from './QRCodeModal'
import { isMobile } from '@/lib/device'

export function OpenOnMobileButton() {
  const [open, setOpen] = useState(false)

  // Não renderiza no mobile — só no desktop
  if (typeof navigator !== 'undefined' && isMobile()) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-[#007BFF] text-white text-sm font-medium
                   hover:bg-[#007BFF]/90 transition-colors"
      >
        <Smartphone size={16} />
        Abrir no celular
      </button>
      <QRCodeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

### 5.5 — Adicionar o botão no Header

No componente Header existente, adicionar
`<OpenOnMobileButton />` no lado direito, ao lado do logo.
Visível apenas em telas `md:` (desktop).

### 5.6 — Banner de instalação no mobile

Criar `components/ui/InstallBanner.tsx`:
```tsx
'use client'
import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { isMobile, isInstalled } from '@/lib/device'

export function InstallBanner() {
  const [show, setShow] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    if (!isMobile() || isInstalled()) return

    const dismissed = localStorage.getItem('install-banner-dismissed')
    if (dismissed) {
      const dismissedAt = parseInt(dismissed)
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      if (Date.now() - dismissedAt < sevenDays) return
    }

    const timer = setTimeout(() => setShow(true), 30000) // 30 segundos

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })

    return () => clearTimeout(timer)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') setShow(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('install-banner-dismissed', Date.now().toString())
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 bg-[#1C2333] border border-[#007BFF]/30 rounded-xl p-4 flex items-center gap-3 shadow-xl md:hidden">
      <div className="flex-1">
        <p className="text-white text-sm font-medium">
          Adicione o Betim Bus à sua tela inicial
        </p>
        <p className="text-[#8A94A6] text-xs mt-0.5">
          Acesse sem internet e mais rápido
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#007BFF] text-white text-xs font-medium rounded-lg shrink-0"
      >
        <Download size={14} />
        Instalar
      </button>
      <button onClick={handleDismiss} className="text-[#8A94A6] hover:text-white shrink-0">
        <X size={18} />
      </button>
    </div>
  )
}
```

Adicionar `<InstallBanner />` no `app/layout.tsx`.

✅ BLOCO 5 CONCLUÍDO → avance para o Bloco 6.

---

## BLOCO 6 — SEO: CORRIGIR TITLES E ADICIONAR FOOTER

### 6.1 — Title dinâmico nas páginas de linha

Arquivo: `app/linha/[id]/page.tsx`

```tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
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

### 6.2 — Criar ou atualizar Footer

Criar `components/layout/Footer.tsx` com links para todas
as páginas institucionais:

```tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 px-4 mt-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#8A94A6] text-xs">
          © 2026 Betim Bus — FlowIQ. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/noticias" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Notícias
          </Link>
          <Link href="/sobre" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Sobre
          </Link>
          <Link href="/privacidade" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Privacidade
          </Link>
          <Link href="/contato" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  )
}
```

Adicionar `<Footer />` no `app/layout.tsx`.

✅ BLOCO 6 CONCLUÍDO → avance para o Bloco 7.

---

## BLOCO 7 — PÁGINA /INSTALAR + COMMIT FINAL

### 7.1 — Criar `app/instalar/page.tsx`

Esta página é o destino dos QR Codes nos folhetos físicos.
URL com rastreamento: `betimbus.com.br/instalar?utm_source=folheto`

**Metadata:**
```tsx
export const metadata = {
  title: 'Instalar o Betim Bus no seu celular | Betim Bus',
  description: 'Veja como instalar o Betim Bus na tela inicial do seu celular em 3 passos. Gratuito, sem precisar da loja de apps.',
}
```

**Conteúdo — detectar o sistema e mostrar instrução correta:**

```tsx
// Detectar Android ou iPhone via userAgent
// Android: mostrar instruções do Chrome
// iPhone/iPad: mostrar instruções do Safari
// Desktop: mostrar QR Code automaticamente aberto

Título: Instale o Betim Bus no seu celular

Android:
  1. Toque nos três pontos (⋮) no canto superior direito
  2. Selecione "Adicionar à tela inicial"
  3. Confirme tocando em "Adicionar"

iPhone/iPad:
  1. Toque no ícone de compartilhar (□↑) na barra inferior
  2. Role e toque em "Adicionar à tela inicial"
  3. Confirme tocando em "Adicionar"

Após instalar:
O Betim Bus aparecerá na sua tela inicial como um app normal.
Funciona sem internet após o primeiro acesso.
```

### 7.2 — Build e commit final

```bash
npm run lint
npm run build
```

Se build passar com zero erros:
```bash
git add .
git commit -m "feat: páginas institucionais, notícias, QR Code desktop, install banner mobile, SEO, footer"
git push origin main
```

Confirme o deploy na Vercel e liste as URLs que agora existem:
- https://betim-bus-app.vercel.app/sobre
- https://betim-bus-app.vercel.app/privacidade
- https://betim-bus-app.vercel.app/contato
- https://betim-bus-app.vercel.app/noticias
- https://betim-bus-app.vercel.app/instalar

✅ BLOCO 7 CONCLUÍDO

---

## ✅ CHECKLIST FINAL OBRIGATÓRIO

Confirme cada item antes de declarar concluído:

- [ ] manifest.json com "display": "minimal-ui"
- [ ] Header com link Notícias e menu Mais (Sobre/Privacidade/Contato)
- [ ] Página /sobre com texto exato conforme especificado
- [ ] Página /privacidade com conteúdo completo
- [ ] Página /contato com e-mail e call center
- [ ] Página /noticias listando os 7 artigos
- [ ] 7 artigos individuais com slug e conteúdo correto
- [ ] qrcode.react instalado
- [ ] Componente QRCodeModal funcionando
- [ ] Botão "Abrir no celular" visível somente no desktop
- [ ] Banner de instalação somente no mobile
- [ ] Title dinâmico nas páginas de linha
- [ ] Footer com links institucionais
- [ ] Página /instalar criada
- [ ] npm run build — zero erros
- [ ] npm run lint — zero warnings
- [ ] git push realizado
- [ ] Deploy Vercel confirmado

---

*BETIMBUS-EXECUTE.md | FlowIQ © Abril 2026*
*Não execute parcialmente. Todos os blocos são obrigatórios.*
