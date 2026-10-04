import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@alander/react'
import { Canvas } from './Canvas'

const options = (
  <>
    <option value="filling">Filling line A</option>
    <option value="packing">Packing line B</option>
    <option value="dr">DR_MS_04</option>
  </>
)

const meta = {
  title: 'Families/Field/Select',
  component: Select,
  decorators: [(Story) => <Canvas><div style={{ width: 360 }}><Story /></div></Canvas>],
  args: { label: 'Process', children: options },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'The analysis runs on this process.' } }
export const WithError: Story = { args: { error: 'Choose a process.' } }
export const Disabled: Story = { args: { disabled: true } }
