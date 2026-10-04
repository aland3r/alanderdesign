import { useId, type TextareaHTMLAttributes } from 'react'
import { cx } from '../../../utils/cx'
import field from '../TextField/TextField.module.css'
import styles from './TextArea.module.css'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

/** A labelled field for text that runs over several lines. */
export function TextArea({ label, hint, error, id, className, rows = 4, ...rest }: TextAreaProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={cx(field.field, className)}>
      <label htmlFor={inputId} className={field.label}>
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={cx(field.input, styles.textarea, error && field.invalid)}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
      />
      {message ? (
        <p id={messageId} className={cx(field.message, error && field.errorMessage)}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
