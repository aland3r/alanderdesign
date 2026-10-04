import type { Meta, StoryObj } from '@storybook/react-vite'
import { SocialButton } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Button/SocialButton',
  component: SocialButton,
  decorators: [(Story) => <Canvas><div style={{ width: 360 }}><Story /></div></Canvas>],
  args: { fullWidth: true },
} satisfies Meta<typeof SocialButton>

export default meta
type Story = StoryObj<typeof meta>

export const Google: Story = {}
export const Loading: Story = { args: { loading: true, children: 'Redirecionando...' } }
