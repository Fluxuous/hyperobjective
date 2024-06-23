'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import { DataTable } from '@/components/ui/data-table'
import { Run } from '@/lib/types'
import RunSheet from '@/components/sheets/run-sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import useUserStore from '@/stores/use-user-store'

type Props = {
  projectId: string
}

export default function RunsTable({ projectId }: Props) {
  const { runs, objectives, keyResults, chatUsages } = useUserStore(
    (state) => state
  )
  if (!objectives || !runs) {
    return <Skeleton className="w-full h-[20px]" />
  }

  const columns: ColumnDef<Run>[] = [
    {
      accessorKey: 'createdAt',
      header: 'CREATED',
      cell: ({ row }) => moment(row.getValue('createdAt')).format('LLL'),
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge className="m-[2px]" key={status}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'objectiveId',
      header: 'OBJECTIVE',
      cell: ({ row }) => {
        const objectiveId = row.getValue('objectiveId') as string
        const objective = objectives.find((o) => o.id === objectiveId)
        if (objective) {
          return (
            <span className="flex max-h-20 overflow-hidden text-ellipsis">
              {objective.outcome}
            </span>
          )
        }
        return <span>-</span>
      },
    },
    {
      accessorKey: 'keyresults',
      header: 'KEY RESULTS',
      cell: ({ row }) => {
        const count = keyResults?.filter(
          (kr) => kr.objectiveId === row.original.objectiveId
        ).length
        return <div>{count}</div>
      },
    },
    {
      accessorKey: 'tasks',
      header: 'TASKS',
      cell: ({ row }) => {
        const tasks = row.getValue('tasks') as any[]
        return <div>{tasks.length}</div>
      },
    },
    {
      accessorKey: '',
      header: 'COST',
      cell: ({ row }) => {
        const runId = row.getValue('id')
        const usage = chatUsages?.find((chatUsage) => chatUsage.runId === runId)
        if (usage) {
          return `${usage.totalCost.toFixed(2)}`
        }
        return '$0.00'
      },
    },
    {
      accessorKey: 'x',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex flex-full justify-end">
            <RunSheet run={row.original} projectId={projectId} />
          </div>
        )
      },
    },
  ]

  const data = runs.filter((run) => run.projectId === projectId)
  return <DataTable columns={columns} data={data} />
}
