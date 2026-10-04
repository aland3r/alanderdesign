import { cx } from '../../../utils/cx'
import styles from './Separator.module.css'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/** A thin line between groups of content. */
export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  if (orientation === 'horizontal') {
    return <hr className={cx(styles.separator, styles.horizontal, className)} />
  }
  return <div role="separator" aria-orientation="vertical" className={cx(styles.separator, styles.vertical, className)} />
}
