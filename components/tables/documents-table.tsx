'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { DocumentUpload } from '@/lib/types'
import useUserStore from '@/stores/use-user-store'

export default function DocumentsTable() {
  const documents = useUserStore((state) => state.documents)
  if (!documents) {
    return <Skeleton className="w-full h-[20px]" />
  }

  const columns: ColumnDef<DocumentUpload>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            NAME
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'url',
      header: 'URL',
    },
  ]

  return <DataTable filterColumn={'name'} columns={columns} data={documents} />
}
