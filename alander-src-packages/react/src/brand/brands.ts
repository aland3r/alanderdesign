import type { Brand } from '@alander/tokens/web/tokens'

export type { Brand }

/** Non-visual facts about each brand. Visual decisions live in the tokens. */
export interface BrandConfig {
  name: string
  /** Login layout used by the product today. */
  authLayout: 'split' | 'centered'
}

export const brandConfig: Record<Brand, BrandConfig> = {
  deviante: { name: 'Deviante', authLayout: 'split' },
  flashbrix: { name: 'Flashbrix', authLayout: 'centered' },
}
