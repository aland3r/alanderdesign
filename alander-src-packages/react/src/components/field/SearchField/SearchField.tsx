import type { InputHTMLAttributes } from 'react'
import { cx } from '../../../utils/cx'
import styles from './SearchField.module.css'

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Accessible name. Not shown on screen. */
  label: string
  size?: 'sm' | 'md'
}

export function SearchField({ label, size = 'md', className, ...rest }: SearchFieldProps) {
  return (
    <div className={cx(styles.field, styles[size], className)}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input type="search" className={styles.input} aria-label={label} {...rest} />
    </div>
  )
}
