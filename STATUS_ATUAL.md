# Status do Projeto — Betim Bus PWA 🚌

Este arquivo serve como **Ponto de Restauração (Checkpoint)**. Ele documenta exatamente onde a arquitetura do aplicativo parou na última sessão de desenvolvimento e lista os ganchos técnicos para as próximas empreitadas.

---

## 📍 Onde Paramos (Estado Atual do Repositório)

Lançamos com sucesso a "Fase 2", transformando o protótipo inicial num **Aplicativo PWA Fullstack Monolítico**. O código atual está hospedado de forma independente no repositório `JRoberto1/BetimBus-App` no GitHub.

### Conquistas Técnicas Consolidadas:
1. **Unificação Frontend + Backend:** Movemos toda a mágica do Proxy API (que falsifica headers para acessar os dados da prefeitura/Mobilibus) para dentro do Next.js via `/app/api`. Somente temos UM projeto para gerir agora.
2. **Design System & UX:** O aplicativo possui uma "Casca" mobile-first fluida (limitada a 480px em Web Desktop), rodando uma paleta imersiva Neo-Dark. A Bottom Navigation guia o usuário por todo o sistema.
3. **Plataforma de Horários e Linhas:** Listagem nativa de dezenas de linhas de Betim, separadas por Abas (Dias Úteis, Sab, Dom) puxando dados dinâmicos com cache rigoroso.
4. **Localização em Tempo Real:** Motor consumindo a posição dos ônibus nas ruas de 30 em 30 segundos, exibindo os ícones piscantes de GPS com tratamento para "Sem Sinal".
5. **Roteador Inteligente (Viagem Direta):** Aba [Planejar Viagem] capaz de usar a Localização Atual do usuário (Hook nativo HTML5) para encontrar todas as paradas num raio de 500m e cruzar vetorialmente com um bairro de destino digitado no *Autocomplete*.
6. **Favoritismo LocalStorage:** Uma aba [Favoritos] que guarda permanentemente as linhas preferidas do celular do usuário, custando zero de infraestrutura e banco de dados.
7. **Radar Global CartoDB:** A aba [Mapa] aciona folhagens do Leaflet renderizando um panorama tático total dos pontos da cidade em fundo escuro, com foco por GPS do usuário.
8. **PWA Offline-Ready:** O usuário será advertido pelo Android/iOS a "Instalar Diretamente" por causa da conjunção gerada no nosso `manifest.json`, nossos icones gerados via `app/icon-512.png` via JSX Edge, e gerido robustamente num `public/sw.js` em estratégia *"Stale-While-Revalidate"*. 
9. **Dynamic SEO OpenGraph:** Compartilhar URL no WhatsApp plota cards luxuosos detalhando informações de "Linha XXX - Origem/Dest" sem que seja preciso digitar nada.

---

## 🗺️ Para Onde Vamos (Próximas Frentes de Desenvolvimento)

Quando decidirmos retomar os trabalhos e expandir para a "Fase 3 / Fase 4", estes devem ser os seus objetivos técnicos recomendados:

### Nível Prata (Otimizações Estratégicas - Sem custos agregados)
- [ ] **Integração Web Analytics (Ex: Vercel Analytics ou PostHog):** Para enxergarmos estatísticas reais (quais os ônibus mais acessados, quais bairros usam mais o app).
- [ ] **Planejador de Jornada com Transbordo (Avançado):** Aprimorar a matemática atual do Planejador para aceitar viagens *"Pega linha X e faz interligação com a Y no Centro"*. (Exige algoritmos mais densos como A* baseados nos limites estritos).
- [ ] **Cache Dinâmico Persistente em Memória de Celular (IDB):** Salvar de modo ultraagressivo toda a arvore da Mobilibus para leitura imediata em modo Metrô/Túnel via IndexedDB.

### Nível Ouro (Migração de Escopo - Pode envolver investimentos)
- [ ] **Criação de Contas Virtuais (Autenticação):** Para um dia centralizarmos "comunidades" por ônibus onde a pessoa possa fazer login para dizer que a linha atrasou (Waze-like). Isso exigirá acoplar com Supabase + Prisma ORM.
- [ ] **Notificações Push Reais:** Avisar "Seu 314 está a 2 pontos de você, saia de casa", demandando integrações com VAPID e Firebase Cloud Messaging no backend do Next.
- [ ] **Empacotamento TWA (Trusted Web Activity) para Google Play Store:** Processar e encasar nosso PWA maravilhoso Next.js em um Wrapper assinado pelo Google Play Console, subindo-o para a loja oficial do Android para mais acessibilidade urbana.

---
**Documento arquivado com segurança na raiz do seu projeto.** Seus agentes e engenheiros podem retomar a lógica puxando a leitura atômica de `STATUS_ATUAL.md` a qualquer momento para se re-aclimatarem na mesma hora.
