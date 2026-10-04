import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Alert.module.css'

export interface AlertProps {
  tone?: 'error'
  className?: string
  children: ReactNode
}

export function Alert({ tone = 'error', className, children }: AlertProps) {
  return (
    <div role="alert" className={cx(styles.alert, styles[tone], className)}>
      {children}
    </div>
  )
}
