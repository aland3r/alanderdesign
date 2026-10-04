import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Tabs/Tabs',
  component: Tabs,
  decorators: [(Story) => <Canvas><div style={{ width: 480 }}><Story /></div></Canvas>],
  args: {
    label: 'Workspace',
    tabs: [
      { id: 'projects', label: 'Projects', content: <Text>17 processes, 29 analyses.</Text> },
      { id: 'operations', label: 'Operations', content: <Text>Operations mapped from the event log.</Text> },
      { id: 'equipment', label: 'Equipment', content: <Text>12 machines under monitoring.</Text> },
    ],
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SecondSelected: Story = { args: { defaultTab: 'operations' } }
