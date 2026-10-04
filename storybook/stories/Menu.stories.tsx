import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from '@alander/react'
import { Canvas } from './Canvas'

const noop = () => {}

const meta = {
  title: 'Families/Menu/Menu',
  component: Menu,
  decorators: [(Story) => <Canvas><div style={{ minHeight: 200 }}><Story /></div></Canvas>],
  args: {
    trigger: 'Actions',
    items: [
      { label: 'Rename', onSelect: noop },
      { label: 'Duplicate', onSelect: noop },
      { label: 'Archive', onSelect: noop, disabled: true },
      { label: 'Delete', onSelect: noop, tone: 'danger' },
    ],
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const IconTrigger: Story = { args: { trigger: '⋯', label: 'Process actions' } }
