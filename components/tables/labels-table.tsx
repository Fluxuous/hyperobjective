'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/lib/types'
import { LabelDialog } from '@/components/dialogs/label-dialog'
import useUserStore from '@/stores/use-user-store'

export default function LabelsTable() {
  const labels = useUserStore((state) => state.labels)

  const columns: ColumnDef<Label>[] = [
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: ({ row }) => <Badge>{row.original.name}</Badge>,
    },
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => (
        <div className="flex flex-full justify-end">
          <LabelDialog label={row.original} />
        </div>
      ),
    },
  ]
  if (labels) {
    return (
      <DataTable
        className="w-100 m-0 flex flex-full flex-row"
        columns={columns}
        data={labels}
      />
    )
  }
}
