import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Tabs.module.css'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  /** Accessible name of the tab list. */
  label: string
  tabs: Tab[]
  defaultTab?: string
  onChange?: (id: string) => void
  className?: string
}

/** Switches between views of the same context without leaving the page. */
export function Tabs({ label, tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)
  const listRef = useRef<HTMLDivElement>(null)
  const baseId = useId()

  const select = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((tab) => tab.id === active)
    const next =
      event.key === 'ArrowRight' ? current + 1
      : event.key === 'ArrowLeft' ? current - 1
      : event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
      : null
    if (next === null) return

    event.preventDefault()
    const tab = tabs[(next + tabs.length) % tabs.length]
    select(tab.id)
    listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${tab.id}"]`)?.focus()
  }

  return (
    <div className={cx(styles.tabs, className)}>
      <div ref={listRef} role="tablist" aria-label={label} className={styles.list} onKeyDown={onKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            data-tab={tab.id}
            aria-selected={tab.id === active}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={tab.id === active ? 0 : -1}
            className={styles.tab}
            onClick={() => select(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
