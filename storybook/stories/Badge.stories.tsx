import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Badge/Badge',
  component: Badge,
  decorators: [(Story) => <Canvas><Story /></Canvas>],
  args: { children: 'Draft', tone: 'neutral' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'accent', 'danger'] } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Accent: Story = { args: { tone: 'accent', children: 'New' } }
export const Danger: Story = { args: { tone: 'danger', children: '9 drifts' } }
