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
import { DocumentUpload } from '@/lib/types'
import useUserStore from '@/stores/use-user-store'
import { createBlob } from '@/lib/vendor/vercel'

interface Props {
  document?: DocumentUpload
  setOpen: any
}

export function DocumentForm({ document, setOpen }: Props) {
  const { createDocument, deleteDocument } = useUserStore((state) => state)

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
  })

  type FormValues = z.infer<typeof formSchema>

  const defaultValues: Partial<FormValues> = {
    name: document?.name ?? '',
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

    const { name } = data
    if (document) {
      throw new Error('Update not implemented')
    } else {
      toast.promise(
        createBlob('Test content', 'txt').then((url) => {
          createDocument({ name, url })
        }),
        {
          loading: 'Creating document...',
          success: 'Document created',
          error: 'Error creating document',
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
        <div className="flex justify-end space-x-2">
          {document ? (
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                await deleteDocument(document.id)
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
