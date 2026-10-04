import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Link/Link',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const InText: Story = {
  render: () => (
    <Text size="small" tone="muted">
      By continuing, you accept the <Link href="#">Terms of Use</Link>.
    </Text>
  ),
}
