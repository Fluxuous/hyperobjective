'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useUserStore from '@/stores/use-user-store'
import { Objective, KeyResult } from '@/lib/types'

interface Props {
  objective: Objective
  keyResults: KeyResult[]
}

export function CheckInForm({ objective, keyResults }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const updateKeyResult = useUserStore((state) => state.updateKeyResult)

  const formSchema = z.object({
    outcome: z.string(),
    message: z
      .string()
      .min(2, {
        message: 'Must be at least 2 characters.',
      })
      .max(400, {
        message: 'Must not be longer than 400 characters.',
      }),
    keyResults: z.array(
      z.object({
        value: z.coerce.number(),
      })
    ),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      outcome: objective.outcome,
      message: 'My update message',
      keyResults: keyResults.map((keyResult) => ({
        value: keyResult.value,
      })),
    },
  })

  async function onSubmit(data: FormValues) {
    // TODO: Why does this not get called?
    console.log('onSubmit', data)
  }

  async function onClickSave() {
    const valid = await form.trigger()
    if (!valid) {
      return
    }

    setIsLoading(true)

    for (let i = 0; i < keyResults.length; i++) {
      const { value } = form.getValues().keyResults[i]
      toast.promise(updateKeyResult({ ...keyResults[i], value }), {
        loading: 'Updating key result...',
        success: 'Key result updated',
        error: 'Error updating key result',
      })
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
      // TODO: Issue with the delay here as store gets overwritten
      await delay(1_000)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="outcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {keyResults.map((keyResult, i) => (
          <FormField
            control={form.control}
            key={`keyesults.${i}.value`}
            name={`keyResults.${i}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Result</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" type="number" />
                </FormControl>
                <FormDescription>{keyResult.name}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClickSave} type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
