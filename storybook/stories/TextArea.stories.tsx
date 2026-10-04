import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Field/TextArea',
  component: TextArea,
  decorators: [(Story) => <Canvas><div style={{ width: 360 }}><Story /></div></Canvas>],
  args: { label: 'Notes', placeholder: 'What changed in this analysis?' },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Visible to everyone with access to the process.' } }
export const WithError: Story = { args: { error: 'Add a note before saving.' } }
export const Disabled: Story = { args: { disabled: true } }
