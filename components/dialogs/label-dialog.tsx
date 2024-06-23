'use client'

import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUserStore from '@/stores/use-user-store'

export const LabelDialog = ({ ...props }) => {
  const { label } = props

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(label?.name ?? 'My label')
  const [color, setColor] = useState(label?.color ?? 'red')

  const { activeProject, createLabel, deleteLabel, updateLabel } = useUserStore(
    (state) => state
  )

  const onClickSave = async () => {
    setIsLoading(true)

    if (!activeProject) {
      return
    }

    if (label) {
      label.name = name
      label.color = color
      toast.promise(updateLabel(label), {
        loading: 'Update label...',
        success: 'Label update',
        error: 'Error updating label',
      })
    } else {
      toast.promise(createLabel({ name, color, projectId: activeProject.id }), {
        loading: 'Creating label...',
        success: 'Label created!',
        error: 'Error creating label',
      })
    }

    setIsLoading(false)
    setOpen(false)
  }

  if (activeProject) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          {label ? (
            <Link href="" onClick={() => setOpen(true)}>
              Edit
            </Link>
          ) : (
            <Button
              className="m-0"
              variant="default"
              onClick={() => setOpen(true)}
            >
              New Label
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{label ? 'Edit' : 'New'} Label</DialogTitle>
            <DialogDescription>
              Labels are used to categorize objectives.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My label"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={(e) => setColor(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="violet">Violet</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            {props.label ? (
              <Button
                variant="destructive"
                disabled={isLoading}
                onClick={() => deleteLabel(props.label.id)}
              >
                Delete
              </Button>
            ) : null}
            <Button type="submit" disabled={isLoading} onClick={onClickSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
}
