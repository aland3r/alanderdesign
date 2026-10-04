import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Alert/Alert',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ErrorMessage: Story = {
  render: () => <Alert>Não foi possível iniciar o login com Google.</Alert>,
}
