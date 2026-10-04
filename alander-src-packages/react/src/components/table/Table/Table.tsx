import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Table.module.css'

export interface TableProps {
  /** Describes the table. Read by screen readers, hidden on screen. */
  caption: string
  className?: string
  /** Native `<thead>`, `<tbody>`, `<tr>`, `<th>` and `<td>` elements. */
  children: ReactNode
}

/** Styles a native table and lets it scroll sideways on narrow screens. */
export function Table({ caption, className, children }: TableProps) {
  return (
    <div className={cx(styles.scroll, className)}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        {children}
      </table>
    </div>
  )
}
