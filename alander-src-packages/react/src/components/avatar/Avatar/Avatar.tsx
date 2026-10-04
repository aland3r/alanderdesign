import { cx } from '../../../utils/cx'
import styles from './Avatar.module.css'

export interface AvatarProps {
  /** The person's name. Read by screen readers, and the source of the initials. */
  name: string
  src?: string
  size?: 'sm' | 'md'
  className?: string
}

function initials(name: string) {
  const words = name.trim().split(/\s+/)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1][0] ?? '') : ''
  return (first + last).toUpperCase()
}

/** A person's picture, or their initials when there is no picture. */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  if (src) {
    return <img src={src} alt={name} className={cx(styles.avatar, styles[size], className)} />
  }
  return (
    <span role="img" aria-label={name} className={cx(styles.avatar, styles[size], className)}>
      {initials(name)}
    </span>
  )
}
