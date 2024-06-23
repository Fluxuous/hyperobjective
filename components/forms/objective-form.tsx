'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconSpinner } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUserStore from '@/stores/use-user-store'
import { Project, Objective, KeyResult } from '@/lib/types'
import { concat } from '@/lib/utils'
import { CRON_INTERVALS } from '@/lib/constants'

interface Props {
  project: Project
  objective?: Objective
  keyResults?: KeyResult[]
  setOpen: any
}

// eslint-disable-next-line complexity
export function ObjectiveForm({
  project,
  objective,
  keyResults,
  setOpen,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    labels,
    objectives,
    cycles,
    createObjective,
    updateObjective,
    deleteObjective,
    createKeyResult,
    updateKeyResult,
    deleteKeyResult,
  } = useUserStore((state) => state)

  const formSchema = z.object({
    outcome: z
      .string()
      .min(2, {
        message: 'Must be at least 2 characters.',
      })
      .max(400, {
        message: 'Must not be longer than 400 characters.',
      }),
    labelId: z.string(),
    cycleId: z.string(),
    interval: z.string(),
    parentId: z.string(),
    name0: z.string(),
    name1: z.string(),
    name2: z.string(),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      outcome: objective?.outcome ?? '',
      labelId: objective?.labelId ?? '',
      interval: objective?.interval ?? '',
      cycleId: objective?.cycleId ?? '',
      parentId: objective?.parentId ?? '',
      name0: (keyResults && keyResults[0]?.name) ?? '',
      name1: (keyResults && keyResults[1]?.name) ?? '',
      name2: (keyResults && keyResults[2]?.name) ?? '',
    },
  })

  const onClickGenerate = async () => {
    setIsLoading(true)

    try {
      const { outcome } = form.getValues()
      const { vision, strategy, resourceIds } = project

      const res = await fetch('/api/keyresults', {
        method: 'POST',
        body: JSON.stringify({
          outcome,
          vision,
          strategy,
          resourceIds,
        }),
      })

      const data = await res.json()
      form.setValue('name0', data.keyResults[0].name)
      form.setValue('name1', data.keyResults[1].name)
      form.setValue('name2', data.keyResults[2].name)
    } catch (e: any) {
      toast.error(e.message)
      console.error(e)
    }

    setIsLoading(false)
  }

  async function onSubmit() {
    setIsLoading(true)

    const valid = await form.trigger()
    if (!valid) {
      return
    }

    const {
      outcome,
      interval,
      labelId,
      parentId,
      cycleId,
      name0,
      name1,
      name2,
    } = form.getValues()

    if (objective?.id) {
      await updateObjective({
        ...objective,
        outcome,
        interval,
        labelId,
        parentId,
        cycleId,
      })
    } else {
      objective = await createObjective({
        outcome,
        interval,
        labelId,
        parentId,
        cycleId,
        projectId: project.id,
        progress: 0,
      })
    }

    const names = [name0, name1, name2]
    for (let i = 0; i < names.length; i++) {
      if (keyResults && keyResults.length > i && keyResults[i].id) {
        if (names[i].length > 0) {
          keyResults[i].name = names[i]
          await updateKeyResult(keyResults[i])
        } else {
          await deleteKeyResult(keyResults[i].id)
        }
      } else if (names[i].length > 0) {
        await createKeyResult({
          projectId: project.id,
          name: names[i],
          objectiveId: objective.id,
          type: 'numeric',
          value: 0,
        })
      }
    }

    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="outcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective Outcome</FormLabel>
              <FormControl>
                <Input placeholder="Enter an objective" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                What is the overall outcome you will achieve?
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name0"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Results</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name1"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name2"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
              <FormDescription>
                Measurable targets to indicate if you have achieved your
                objective.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          disabled={isLoading}
          className="w-full"
          onClick={onClickGenerate}
        >
          {isLoading && <IconSpinner className="mr-2 size-4 animate-spin" />}
          Generate Key Results
        </Button>
        <FormField
          control={form.control}
          name="labelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={labels !== null && labels.length < 1}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a label" />
                  </SelectTrigger>
                  <SelectContent>
                    {labels?.map((label) => (
                      <SelectItem key={label.id} value={label.id}>
                        {concat(40, label.name)}
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
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={
                    objectives === null ||
                    objectives?.filter(
                      (o) =>
                        o.projectId === project.id && o.id !== objective?.id
                    ).length < 1
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives
                      ?.filter(
                        (o) =>
                          o.projectId === project.id && o.id !== objective?.id
                      )
                      .map((o, i) => (
                        <SelectItem key={`objective-${i}`} value={o.id}>
                          <span
                            key={`objective-outcome-${o.id}`}
                            className="text-left overflow-hidden flex h-5 text-ellipsis"
                          >
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
          name="cycleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cycle</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={
                    cycles === null ||
                    cycles.filter((c) => c.projectId === project.id).length < 1
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    {cycles === null ||
                      cycles
                        .filter((c) => c.projectId === project.id)
                        .map((cycle) => (
                          <SelectItem key={cycle.id} value={cycle.id}>
                            Q{cycle.quarter} {cycle.year}
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
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Run Interval</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an interval" />
                  </SelectTrigger>
                  <SelectContent>
                    {CRON_INTERVALS.map((i) => (
                      <SelectItem key={i.value} value={i.value}>
                        {i.display}
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
        <div className="flex justify-end space-x-2">
          {objective?.id ? (
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                await deleteObjective(objective?.id ?? '')
                setIsLoading(false)
                setOpen(false)
              }}
            >
              Delete
            </Button>
          ) : null}
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
