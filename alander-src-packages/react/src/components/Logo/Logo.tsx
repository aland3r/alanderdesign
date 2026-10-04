import { useBrand, useBrandConfig } from '../../brand/BrandProvider'
import flashbrixIsotype from '../../assets/brand/flashbrix-isotype.svg'
import { cx } from '../../utils/cx'
import styles from './Logo.module.css'

export interface LogoProps {
  size?: 'md' | 'lg'
  className?: string
}

/* Deviante mark as drawn in deviante-web BrandMark.jsx. */
function DevianteMark() {
  return (
    <span className={styles.devianteMark} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="3" cy="7" r="2" fill="white" />
        <circle cx="11" cy="3" r="2" fill="white" opacity="0.7" />
        <circle cx="11" cy="11" r="2" fill="white" opacity="0.7" />
        <line x1="5" y1="6.2" x2="9" y2="3.8" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="5" y1="7.8" x2="9" y2="10.2" stroke="white" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </span>
  )
}

/**
 * The active brand's mark and wordmark. Swaps automatically with the BrandProvider.
 * Portfolio is a wordmark only, as on the site header.
 */
export function Logo({ size = 'md', className }: LogoProps) {
  const brand = useBrand()
  const { name } = useBrandConfig()

  return (
    <span className={cx(styles.logo, styles[size], className)}>
      {brand === 'flashbrix' ? <img src={flashbrixIsotype} alt="" className={styles.isotype} /> : null}
      {brand === 'deviante' ? <DevianteMark /> : null}
      {brand === 'base' ? <span className={styles.baseMark} aria-hidden="true" /> : null}
      <span className={styles.wordmark}>{name}</span>
    </span>
  )
}
