/**
 * pontosPatch.ts
 *
 * Dicionário central de curadoria local de dados.
 * Usado para sobrescrever, normalizar ou injetar dados que estão sabidamente
 * incorretos ou faltantes na base oficial de transporte.
 */

export interface PontoPatch {
  id: number;
  // Nome corrigido do ponto (pode ser omitido se o nome nativo for aceitável)
  correctName?: string;
  // Linhas que DEVEM ser injetadas neste ponto (pois a API as omitiu)
  forceLines?: string[];
}

export const PONTOS_OVERRIDES: Record<number, PontoPatch> = {
  // Exemplo trazido pela comunidade (Avenida Campos De Ourique)
  // Como o ID 3547954 perdeu a Linha 54 por erro de digitação ("Campos" com S) nas roterizações da Prefeitura.
  // Injetamos a Linha 54, 131 e demais forçadamente, e ajustamos a nomenclatura.
  3547954: {
    correctName: 'Avenida Campo de Ourique, 320', // Padronizando sem o S
    forceLines: ['54', '131'] // Assegurando que a 54 exista neste trecho
  }
};
