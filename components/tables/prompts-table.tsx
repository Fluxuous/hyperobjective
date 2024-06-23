'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { Prompt } from '@/lib/types'
import PromptSheet from '@/components/sheets/prompt-sheet'
import useUserStore from '@/stores/use-user-store'

export default function DocumentsTable() {
  const prompts = useUserStore((state) => state.prompts)
  if (!prompts) {
    return <Skeleton className="w-full h-[20px]" />
  }

  const columns: ColumnDef<Prompt>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            NAME
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'template',
      header: 'TEMPLATE',
    },
    {
      accessorKey: 'x',
      header: '',
      cell: ({ row }) => {
        // TODO: Verify
        return (
          <span className="float-right w-full text-right">
            <PromptSheet prompt={row.original} />
          </span>
        )
      },
    },
  ]

  return <DataTable filterColumn={'name'} columns={columns} data={prompts} />
}
