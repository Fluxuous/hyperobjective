'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import useUserStore from '@/stores/use-user-store'
import { getBlob } from '@/lib/vendor/vercel'
import { Run, Task } from '@/lib/types'

interface Props {
  projectId: string
  run?: Run
  setOpen: any
}

export function RunForm({ run, setOpen, projectId }: Props) {
  const { createRun, deleteRun, objectives } = useUserStore((state) => state)

  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    objectiveId: z.string().min(1, 'Please select an objective.'),
    outputContent: z.string(),
    tasks: z.array(z.any()),
  })

  type FormValues = z.infer<typeof formSchema>

  const defaultValues: Partial<FormValues> = {
    objectiveId: run?.objectiveId ?? '',
    outputContent: '',
    tasks: (run?.tasks as Task[]) ?? [],
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit() {
    const valid = await form.trigger()
    if (!valid) {
      setIsLoading(false)
      return
    }

    const { objectiveId } = form.getValues()
    if (!run) {
      toast.promise(
        createRun({
          objectiveId,
          projectId,
          outputUrl: '',
          status: 'pending',
          tasks: [],
        }),
        {
          loading: 'Creating run...',
          success: 'Created run',
          error: 'Error creating run',
        }
      )
    }

    setOpen(false)
  }

  useEffect(() => {
    if (run?.outputUrl) {
      getBlob(run.outputUrl).then((output) => {
        form.setValue('outputContent', output)
      })
    }
  }, [run, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="objectiveId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading || !!run?.id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives
                      ?.filter((o) => o.projectId === projectId)
                      .map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          <span className="flex text-left h-5 overflow-hidden text-ellipsis">
                            {o.outcome}
                          </span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tasks"
          render={({ field }) => (
            <FormItem className={run?.id ? '' : 'hidden'}>
              <FormLabel>Tasks</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {run
                      ? (run?.tasks as Task[]).map((task) => (
                          <SelectItem key={task.task} value={task.task}>
                            <span className="flex text-left h-5 overflow-hidden text-ellipsis">
                              {task.task}
                            </span>
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outputContent"
          render={({ field }) => (
            <FormItem className={run?.id ? '' : 'hidden'}>
              <FormLabel>Output</FormLabel>
              <FormControl>
                <Textarea className="h-[600px]" {...field} />
              </FormControl>
              <FormDescription>The output from the agent run</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {run ? (
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                await deleteRun(run.id)
                setIsLoading(false)
                setOpen(false)
              }}
            >
              Delete
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
