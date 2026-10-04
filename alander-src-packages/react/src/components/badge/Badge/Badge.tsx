import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Badge.module.css'

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'danger'
  className?: string
  children: ReactNode
}

/** A short status or category label. Not interactive. */
export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone], className)}>{children}</span>
}
