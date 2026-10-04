import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Button/Button',
  component: Button,
  decorators: [(Story) => <Canvas><Story /></Canvas>],
  args: { children: 'Sign in', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } }
export const Small: Story = { args: { size: 'sm', variant: 'secondary', children: 'Process' } }
export const Loading: Story = { args: { loading: true, children: 'Redirecting...' } }
export const Disabled: Story = { args: { disabled: true } }
export const FullWidth: Story = { args: { fullWidth: true } }
