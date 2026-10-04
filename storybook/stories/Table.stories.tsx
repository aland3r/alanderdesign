import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Table } from '@alander/react'
import { Canvas } from './Canvas'

const rows = (
  <>
    <thead>
      <tr>
        <th>Analysis</th>
        <th>Process</th>
        <th>Drifts</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DR_MS_04</td>
        <td>DR_MS_04</td>
        <td>
          <Badge tone="danger">9</Badge>
        </td>
      </tr>
      <tr>
        <td>Filling line A</td>
        <td>Filling line A</td>
        <td>
          <Badge>1</Badge>
        </td>
      </tr>
    </tbody>
  </>
)

const meta = {
  title: 'Families/Table/Table',
  component: Table,
  decorators: [(Story) => <Canvas><div style={{ width: '100%', maxWidth: 640 }}><Story /></div></Canvas>],
  args: { caption: 'Analyses', children: rows },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
