'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import LabelsTable from '@/components/tables/labels-table'
import { LabelDialog } from '@/components/dialogs/label-dialog'
import GenerateLabelsButton from '@/components/buttons/generate-labels-button'

const accountFormSchema = z.object({})

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {}

export function LabelsForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit() {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-row flex-full">
          <GenerateLabelsButton />
          <LabelDialog />
        </div>
        <LabelsTable />
      </form>
    </Form>
  )
}
