import { useId, type SelectHTMLAttributes } from 'react'
import { cx } from '../../../utils/cx'
import field from '../TextField/TextField.module.css'
import styles from './Select.module.css'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string
  hint?: string
  error?: string
}

/**
 * A labelled choice from a list. Uses the native `<select>`, so the options
 * are `<option>` children and the list is the platform's own.
 */
export function Select({ label, hint, error, id, className, children, ...rest }: SelectProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={cx(field.field, className)}>
      <label htmlFor={inputId} className={field.label}>
        {label}
      </label>
      <div className={styles.wrap}>
        <select
          id={inputId}
          className={cx(field.input, styles.select, error && field.invalid)}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        >
          {children}
        </select>
      </div>
      {message ? (
        <p id={messageId} className={cx(field.message, error && field.errorMessage)}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
