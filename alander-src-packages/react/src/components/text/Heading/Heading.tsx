import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Heading.module.css'

export interface HeadingProps {
  level?: 1 | 2 | 3
  /** `headline` is the landing-page highlight; it grows at the tablet and desktop breakpoints. */
  size?: 'title' | 'display' | 'headline'
  align?: 'start' | 'center'
  className?: string
  children: ReactNode
}

export function Heading({ level = 1, size = 'title', align = 'start', className, children }: HeadingProps) {
  const Tag = `h${level}` as const
  return <Tag className={cx(styles.heading, styles[size], styles[align], className)}>{children}</Tag>
}
