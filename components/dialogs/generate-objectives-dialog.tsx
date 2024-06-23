'use client'

import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

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
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { IconSpinner } from '@/components/icons'
import useUserStore from '@/stores/use-user-store'
import { Project } from '@/lib/types'

export const GenerateObjectivesDialog = ({ project }: { project: Project }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { createObjective } = useUserStore((state) => state)

  const FormSchema = z.object({
    objective0: z.string().min(10, {
      message: 'Must be at least 10 characters.',
    }),
    objective1: z.string().min(10, {
      message: 'Must be at least 10 characters.',
    }),
    objective2: z.string().min(10, {
      message: 'Must be at least 10 characters.',
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })

  const onClickGenerate = async () => {
    setIsLoading(true)

    try {
      const { vision, strategy, resourceIds } = project
      const res = await fetch('/api/objectives', {
        method: 'POST',
        body: JSON.stringify({ vision, strategy, resourceIds }),
      })
      const data = await res.json()
      form.setValue('objective0', data.objectives[0].outcome)
      form.setValue('objective1', data.objectives[1].outcome)
      form.setValue('objective2', data.objectives[2].outcome)

      await onSaveClick()
    } catch (e: any) {
      console.error(e)
      toast.error(e.message)
    }

    setIsLoading(false)
  }

  const onSaveClick = async () => {
    setIsLoading(true)

    const { objective0, objective1, objective2 } = form.getValues()
    if (objective0.length) {
      await createObjective({
        outcome: objective0,
        interval: '',
        labelId: '',
        parentId: '',
        cycleId: '',
        progress: 0,
        projectId: project.id,
      })
    }
    if (objective1.length) {
      await createObjective({
        outcome: objective1,
        interval: '',
        labelId: '',
        parentId: '',
        cycleId: '',
        progress: 0,
        projectId: project.id,
      })
    }
    if (objective2.length) {
      await createObjective({
        outcome: objective2,
        interval: '',
        labelId: '',
        parentId: '',
        cycleId: '',
        progress: 0,
        projectId: project.id,
      })
    }

    setIsLoading(false)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('onSubmit', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={false}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="m-0 mr-2"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault()
                onClickGenerate()
              }}
            >
              {isLoading ? <IconSpinner className="mr-2" /> : null}
              Generate Objectives
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Objectives</DialogTitle>
              <DialogDescription>
                Objectives will be generated based on your Project vision,
                priorities, and resources. You can edit the objectives to
                provide more specific information about your Project.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="objective0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objectives</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What are the overall outcomes you will achieve?"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="objective1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What are the overall outcomes you will achieve?"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="objective2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What are the overall outcomes you will achieve?"
                    />
                  </FormControl>
                  <FormDescription>
                    What are the overall outcomes you will achieve?
                  </FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" onClick={onSaveClick} disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}
