'use client'

import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { Project } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import ProjectSheet from '@/components/sheets/project-sheet'
import useUserStore from '@/stores/use-user-store'
import { formatToken } from '@/lib/utils'

export default function ProjectsTable() {
  const [data, setData] = useState<Project[]>([])
  const {
    beta,
    user,
    projects,
    objectives,
    keyResults,
    userTokenStats,
    projectViewConfig,
  } = useUserStore()

  useEffect(() => {
    if (projects && projectViewConfig && user) {
      if (projectViewConfig.view === 'my') {
        setData(projects.filter((project) => project.userId === user?.id))
      }
      if (projectViewConfig.view === 'all') {
        setData(projects)
      }
    }
  }, [projectViewConfig, projects, user])

  const columns: ColumnDef<Project>[] = []

  if (beta) {
    columns.push(
      ...([
        {
          accessorKey: 'contractAddress',
          header: 'CONTRACT',
          cell: ({ row }) => {
            const contractAddress = row.getValue('contractAddress') as string
            if (!contractAddress) {
              return '-'
            }
            return (
              <a
                href={`https://basescan.org/address/${contractAddress}`}
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
              >
                {formatToken(contractAddress)}
              </a>
            )
          },
        },
      ] as ColumnDef<Project>[])
    )
  }

  columns.push(
    ...([
      {
        accessorKey: 'name',
        header: 'NAME',
      },
      {
        accessorKey: 'private',
        header: 'VISIBILITY',
        cell: ({ row }) => {
          const isPrivate = row.getValue('private') as boolean
          return <Badge>{isPrivate ? 'Private' : 'Public'}</Badge>
        },
      },
      {
        accessorKey: 'vision',
        header: 'VISION',
        cell: ({ row }) => {
          const vision = row.getValue('vision') as string
          return (
            <span className="flex max-h-20 overflow-hidden text-ellipsis">
              {vision}
            </span>
          )
        },
      },
      {
        accessorKey: 'strategy',
        header: 'STRATEGY',
        cell: ({ row }) => {
          const strategy = row.getValue('strategy') as string
          return (
            <span className="flex max-h-20 overflow-hidden text-ellipsis">
              {strategy}
            </span>
          )
        },
      },
      {
        accessorKey: 'objectives',
        header: 'OBJECTIVES',
        cell: ({ row }) => {
          const id = row.getValue('id') as string
          return objectives?.filter((o) => o.projectId === id).length
        },
      },
      {
        accessorKey: '',
        header: 'KEY RESULTS',
        cell: ({ row }) => {
          const id = row.getValue('id') as string
          return keyResults?.filter((k) => k.projectId === id).length
        },
      },
      {
        accessorKey: 'budget',
        header: 'BUDGET',
        cell: ({ row }) => {
          const budget = row.getValue('budget') as number
          return <span className="">${budget.toFixed(2)}</span>
        },
      },
      {
        accessorKey: '',
        header: 'TOKENS',
        cell: ({ row }) => {
          const projectId = row.getValue('id')
          const usage = userTokenStats?.find(
            (stats) =>
              stats.entity === 'project' && stats.entityId === projectId
          )
          return (
            <span className="text-red-400">
              ${(usage?.totalCost || 0).toFixed(2)}
            </span>
          )
        },
      },
      {
        accessorKey: '',
        header: 'REVENUE',
        cell: () => {
          return <span className="text-green-400">${(0).toFixed(2)}</span>
        },
      },
      {
        accessorKey: 'id',
        header: '',
        cell: ({ row }) => {
          return <ProjectSheet project={row.original} />
        },
      },
    ] as ColumnDef<Project>[])
  )

  if (projects) {
    return <DataTable className="" columns={columns} data={data} />
  }
}
