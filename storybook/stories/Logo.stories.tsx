import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Logo/Logo',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  render: () => (
    <>
      <Logo />
      <Logo size="lg" />
    </>
  ),
}
