import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ConfirmDialog, Dialog, TextField } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Dialog/Dialog',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function DialogExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename process</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Rename process"
        description="The new name shows on the dashboard and in every analysis."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <TextField label="Name" defaultValue="DR_MS_04" />
      </Dialog>
    </>
  )
}

function ConfirmExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete process</Button>
      <ConfirmDialog
        open={open}
        tone="danger"
        title="Delete this process?"
        description="Its analyses are deleted too. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}

export const WithForm: Story = { render: () => <DialogExample /> }
export const Confirm: Story = { render: () => <ConfirmExample /> }
