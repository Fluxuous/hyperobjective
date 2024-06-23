'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import { DataTable } from '@/components/ui/data-table'
import useUserStore from '@/stores/use-user-store'
import { ChatUsage } from '@/lib/types'

export default function UsageTable() {
  const { chatUsages } = useUserStore((state) => state)

  const columns: ColumnDef<ChatUsage>[] = [
    {
      accessorKey: 'createdAt',
      header: 'CREATED',
      cell: ({ row }) =>
        moment((row.getValue('createdAt') as number) * 1).format('l'),
    },
    {
      accessorKey: 'model',
      header: 'MODEL',
    },
    {
      accessorKey: 'totalTokens',
      header: 'TOKENS',
    },
    {
      accessorKey: 'totalCost',
      header: 'COST',
      cell: ({ row }) => {
        const totalCost = row.getValue('totalCost')
        return `$${Number(totalCost).toFixed(6)}`
      },
    },
  ]

  return <DataTable columns={columns} data={chatUsages || []} />
}
