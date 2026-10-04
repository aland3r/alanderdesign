import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Avatar/Avatar',
  component: Avatar,
  decorators: [(Story) => <Canvas><Story /></Canvas>],
  args: { name: 'Ada Lovelace', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const SingleName: Story = { args: { name: 'Ada' } }
