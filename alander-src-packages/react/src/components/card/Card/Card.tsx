import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Card.module.css'

export interface CardProps {
  title?: string
  description?: string
  /** Heading level of the title, so the card fits the page outline. */
  titleLevel?: 2 | 3 | 4
  /** Actions or secondary information, shown under the content. */
  footer?: ReactNode
  className?: string
  children?: ReactNode
}

/** A bordered surface that groups related content. */
export function Card({ title, description, titleLevel = 3, footer, className, children }: CardProps) {
  const Title = `h${titleLevel}` as const

  return (
    <section className={cx(styles.card, className)}>
      {title || description ? (
        <header className={styles.header}>
          {title ? <Title className={styles.title}>{title}</Title> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
      ) : null}
      {children ? <div className={styles.content}>{children}</div> : null}
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </section>
  )
}
