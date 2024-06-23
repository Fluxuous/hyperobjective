'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { Feedback } from '@/lib/types'

export default function FeedbackTable() {
  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: 'runId',
      header: 'RUN',
    },
    {
      accessorKey: 'feedback',
      header: 'FEEDBACK',
    },
  ]

  return <DataTable columns={columns} data={[]} />
}
