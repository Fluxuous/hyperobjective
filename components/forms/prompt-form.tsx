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
import { Prompt } from '@/lib/types'
import useUserStore from '@/stores/use-user-store'

interface Props {
  prompt?: Prompt
  setOpen: any
}

export function PromptForm({ prompt, setOpen }: Props) {
  const { createPrompt, deletePrompt } = useUserStore((state) => state)

  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(400, {
        message: 'Name must not be longer than 400 characters.',
      }),
    template: z
      .string()
      .min(2, {
        message: 'Template must be at least 2 characters.',
      })
      .max(400, {
        message: 'Template must not be longer than 400 characters.',
      }),
  })

  type FormValues = z.infer<typeof formSchema>

  const defaultValues: Partial<FormValues> = {
    name: prompt?.name ?? '',
    template: prompt?.template ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: FormValues) {
    const valid = await form.trigger()
    if (!valid) {
      return
    }

    if (prompt) {
      throw new Error('Update not implemented')
    } else {
      toast.promise(
        createPrompt({
          name: data.name,
          template: data.template,
        }),
        {
          loading: 'Creating prompt...',
          success: 'Created prompt',
          error: 'Error creating prompt',
        }
      )
    }

    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The template used for system prompting
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {prompt ? (
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                await deletePrompt(prompt.id)
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
