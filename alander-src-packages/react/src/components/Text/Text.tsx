import type { ElementType, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Text.module.css'

export interface TextProps {
  as?: ElementType
  size?: 'body' | 'small' | 'caption'
  tone?: 'default' | 'strong' | 'muted'
  align?: 'start' | 'center'
  className?: string
  children: ReactNode
}

export function Text({ as: Tag = 'p', size = 'body', tone = 'default', align = 'start', className, children }: TextProps) {
  return <Tag className={cx(styles.text, styles[size], styles[tone], styles[align], className)}>{children}</Tag>
}
