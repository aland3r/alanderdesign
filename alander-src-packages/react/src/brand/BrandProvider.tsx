import { createContext, useContext, type ReactNode } from 'react'
import { brandConfig, type Brand, type BrandConfig } from './brands'
import '../styles/base.css'

const BrandContext = createContext<Brand>('deviante')

export interface BrandProviderProps {
  brand: Brand
  children: ReactNode
  className?: string
}

/**
 * Applies a brand to everything inside it. Tokens are CSS variables scoped to
 * `[data-brand]`, so switching brands is just changing this attribute.
 */
export function BrandProvider({ brand, children, className }: BrandProviderProps) {
  return (
    <BrandContext.Provider value={brand}>
      <div data-brand={brand} className={className}>
        {children}
      </div>
    </BrandContext.Provider>
  )
}

export function useBrand(): Brand {
  return useContext(BrandContext)
}

export function useBrandConfig(): BrandConfig {
  return brandConfig[useBrand()]
}
