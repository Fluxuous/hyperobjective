'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { CycleDialog } from '@/components/dialogs/cycle-dialog'
import { Cycle } from '@/lib/types'
import { Project } from '@/lib/types'

type Props = {
  project: Project
  cycles: Cycle[]
}

export default function CyclesTable({ project, cycles }: Props) {
  const columns: ColumnDef<Cycle>[] = [
    {
      accessorKey: 'quarter',
      header: 'QUARTER',
    },
    {
      accessorKey: 'year',
      header: 'YEAR',
    },
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex flex-full justify-end">
            <CycleDialog cycle={row.original} />
          </div>
        )
      },
    },
  ]

  const data = cycles.filter((cycle) => cycle.projectId === project.id)
  return <DataTable columns={columns} data={data} />
}
