import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Field/TextField',
  component: TextField,
  decorators: [(Story) => <Canvas><div style={{ width: 360 }}><Story /></div></Canvas>],
  args: { label: 'E-mail', placeholder: 'voce@empresa.com', type: 'email' },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Use the account your admin authorized.' } }
export const WithError: Story = { args: { defaultValue: 'you@', error: 'Enter a valid email address.' } }
export const Disabled: Story = { args: { disabled: true } }
