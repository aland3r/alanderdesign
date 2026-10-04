import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Menu.module.css'

export interface MenuItem {
  label: string
  onSelect: () => void
  /** `danger` for actions that cannot be undone, like deleting. */
  tone?: 'default' | 'danger'
  disabled?: boolean
}

export interface MenuProps {
  /** What the trigger button shows. */
  trigger: ReactNode
  /** Accessible name of the trigger, needed when `trigger` is only an icon. */
  label?: string
  items: MenuItem[]
  /** Which edge of the trigger the menu lines up with. */
  align?: 'start' | 'end'
  className?: string
}

/** A button that opens a list of actions. */
export function Menu({ trigger, label, items, align = 'start', className }: MenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const enabledItems = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    enabledItems()[0]?.focus()

    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutside)
    return () => document.removeEventListener('pointerdown', closeOnOutside)
  }, [open])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const all = enabledItems()
    const current = all.indexOf(document.activeElement as HTMLButtonElement)
    const move = (index: number) => {
      event.preventDefault()
      all[(index + all.length) % all.length]?.focus()
    }

    if (event.key === 'ArrowDown') move(current + 1)
    else if (event.key === 'ArrowUp') move(current - 1)
    else if (event.key === 'Home') move(0)
    else if (event.key === 'End') move(all.length - 1)
    else if (event.key === 'Escape') close(true)
    else if (event.key === 'Tab') setOpen(false)
  }

  return (
    <div ref={rootRef} className={cx(styles.menu, className)}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {trigger}
      </button>
      {open ? (
        <div ref={listRef} id={menuId} role="menu" className={cx(styles.list, styles[align])} onKeyDown={onKeyDown}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={item.disabled}
              className={cx(styles.item, item.tone === 'danger' && styles.danger)}
              onClick={() => {
                close(true)
                item.onSelect()
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
