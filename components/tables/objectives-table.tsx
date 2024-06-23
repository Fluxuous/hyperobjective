'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CaretDown, CaretRight } from 'phosphor-react'

import { Progress } from '@/components/ui/progress'
import { CollapsibleDataTable } from '@/components/ui/collapsible-data-table'
import { Objective } from '@/lib/types'
import ObjectiveSheet from '@/components/sheets/objective-sheet'
import useUserStore from '@/stores/use-user-store'
import { CRON_INTERVALS } from '@/lib/constants'
import { Project } from '@/lib/types'

export default function ObjectiveTable({ project }: { project: Project }) {
  const { objectives, labels, keyResults, runs, cycles } = useUserStore(
    (state) => state
  )

  if (!keyResults || !objectives || !labels || !cycles) {
    return
  }

  const columns: ColumnDef<Objective>[] = [
    {
      accessorKey: 'expandable',
      header: '',
      cell: ({ row, getValue }) => (
        <div
          style={{
            paddingLeft: `${row.depth * 0}rem`,
          }}
        >
          <>
            {row.getCanExpand() ? (
              <div
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }}
              >
                {row.getIsExpanded() ? <CaretDown /> : <CaretRight />}
              </div>
            ) : null}
            {getValue()}
          </>
        </div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'outcome',
      header: 'OUTCOME',
      cell: ({ row }) => {
        const okrs = keyResults.filter((k) => k.objectiveId === row.original.id)
        return (
          <ObjectiveSheet
            project={project}
            link={row.getValue('outcome')}
            objective={row.original}
            keyResults={okrs}
          />
        )
      },
    },
    {
      accessorKey: '',
      header: 'KEY RESULTS',
      cell: ({ row }) => {
        const id = row.original.id
        const krs = keyResults.filter((k) => k.objectiveId === id)
        return krs.length
      },
    },
    {
      accessorKey: 'labelId',
      header: 'LABEL',
      cell: ({ row }) => {
        const labelId = row.getValue('labelId') as string
        const label = labels.find((label) => label.id === labelId)
        return label?.name ?? '-'
      },
    },
    {
      accessorKey: 'cycleId',
      header: 'CYCLE',
      cell: ({ row }) => {
        const cycleId = row.getValue('cycleId') as string
        const cycle = cycles.find((c) => c.id === cycleId)
        return cycle?.quarter && cycle?.year
          ? 'Q' + cycle?.quarter + ' ' + cycle?.year
          : '-'
      },
    },
    {
      header: 'INTERVAL',
      cell: ({ row }) => {
        const interval = CRON_INTERVALS.find(
          (i) => i.value === row.original.interval
        )
        return interval?.display ?? '-'
      },
    },
    {
      header: 'RUNS',
      cell: ({ row }) => {
        if (runs) {
          return runs.filter((r) => r.objectiveId === row.original.id).length
        } else {
          return '-'
        }
      },
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: () => {
        const color = true ? 'text-green-400' : 'text-slate-400'
        return (
          <div
            className={`h-11 text-center flex flex-full pt-1 p-0 text-2xl ${color}`}
          >
            &bull;
          </div>
        )
      },
    },
    {
      header: 'PROGRESS',
      cell: ({ row }) => {
        return <Progress value={row.original.progress} className="w-48 h-1" />
      },
    },
    {
      accessorKey: 'x',
      header: '',
      cell: ({ row }) => {
        const objectiveKeyResults = keyResults.filter(
          (k) => k.objectiveId === row.original.id
        )
        return (
          <span className="text-right float-right">
            <ObjectiveSheet
              project={project}
              objective={row.original}
              keyResults={objectiveKeyResults}
            />
          </span>
        )
      },
    },
  ]

  const buildTree = (items: Objective[]) => {
    for (const item of items) {
      const children = keyResults.filter((kr) => kr.objectiveId === item.id)
      if (children.length) {
        // TODO: Not quite there...
        // @ts-ignore
        //item.subRows = children
      }
    }
    return items
  }

  const data = buildTree(objectives.filter((o) => o.projectId === project.id))
  return (
    <CollapsibleDataTable
      renderSubComponent={() => <div>Hi</div>}
      columns={columns}
      data={data}
    />
  )
}
