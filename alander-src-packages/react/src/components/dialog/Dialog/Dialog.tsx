import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Dialog.module.css'

export interface DialogProps {
  open: boolean
  /** Called when the user dismisses the dialog: Escape, the close button or a click outside. */
  onClose: () => void
  title: string
  description?: string
  /** Actions, shown at the bottom. */
  footer?: ReactNode
  closeLabel?: string
  className?: string
  children?: ReactNode
}

/**
 * A modal window. Built on the native `<dialog>`, which traps focus, closes on
 * Escape and makes the rest of the page inert.
 */
export function Dialog({ open, onClose, title, description, footer, closeLabel = 'Close', className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // A click that lands on the dialog element itself is a click on the backdrop.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      className={cx(styles.dialog, className)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={closeOnBackdrop}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className={styles.body}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </header>
        {description ? <p id={descriptionId} className={styles.description}>{description}</p> : null}
        {children ? <div className={styles.content}>{children}</div> : null}
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </div>
    </dialog>
  )
}
