import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Field/SearchField',
  component: SearchField,
  decorators: [(Story) => <Canvas><div style={{ width: 360 }}><Story /></div></Canvas>],
  args: { label: 'Search', placeholder: 'Search processes and analyses…', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const Filled: Story = { args: { defaultValue: 'DR_MS_04' } }
export const Disabled: Story = { args: { disabled: true } }
