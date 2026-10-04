import type { ReactNode } from 'react'
import { useBrandConfig } from '../../brand/BrandProvider'
import { cx } from '../../utils/cx'
import styles from './AuthLayout.module.css'

export interface AuthLayoutProps {
  /** Defaults to the layout the active brand uses today. */
  variant?: 'split' | 'centered'
  /** Small line above the hero headline (split only). */
  heroEyebrow?: string
  /** Hero headline (split only). */
  heroHeadline?: string
  children: ReactNode
}

export function AuthLayout({ variant, heroEyebrow, heroHeadline, children }: AuthLayoutProps) {
  const config = useBrandConfig()
  const layout = variant ?? config.authLayout

  if (layout === 'centered') {
    return (
      <div className={cx(styles.page, styles.centered)}>
        <main className={styles.card}>{children}</main>
      </div>
    )
  }

  return (
    <div className={cx(styles.page, styles.split)}>
      <main className={styles.formSide}>
        <div className={styles.formInner}>{children}</div>
      </main>
      <aside className={styles.hero} aria-hidden="true">
        <div className={styles.heroContent}>
          {heroEyebrow ? <p className={styles.heroEyebrow}>{heroEyebrow}</p> : null}
          {heroHeadline ? <p className={styles.heroHeadline}>{heroHeadline}</p> : null}
        </div>
      </aside>
    </div>
  )
}
