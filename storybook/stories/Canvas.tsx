import type { ReactNode } from 'react'

/** Gives component stories the brand's surface so colors read as they do in the product. */
export function Canvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--space-inset-lg)',
        background: 'var(--color-background-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-stack-md)',
        alignItems: 'flex-start',
      }}
    >
      {children}
    </div>
  )
}
