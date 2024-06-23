'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { RouterItem } from '@/lib/types'

export default function ModelsTable({
  routerItems,
}: {
  routerItems: RouterItem[]
}) {
  const columns: ColumnDef<RouterItem>[] = [
    {
      accessorKey: 'vendor',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            VENDOR
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'model',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            MODEL
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'elo',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ELO (LMSYS)
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const elo = row.getValue('elo') as number
        if (elo) {
          return <span className="text-blue-400">{elo}</span>
        }
        return <>-</>
      },
    },
    {
      accessorKey: 'costPerMTok',
      header: 'INPUT TOKENS (M)',
      cell: ({ row }) => {
        const cost = row.getValue('costPerMTok') as {
          input: number
          output: number
        }
        return <span className="text-red-400">${cost.input.toFixed(2)}</span>
      },
    },
    {
      accessorKey: 'costPerMTok',
      header: 'OUTPUT TOKENS (M)',
      cell: ({ row }) => {
        const cost = row.getValue('costPerMTok') as {
          output: number
        }
        return <span className="text-red-400">${cost.output.toFixed(2)}</span>
      },
    },
    {
      accessorKey: 'costToPerformanceRatio',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            COST TO PERFORMANCE RATIO
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const costToPerformanceRatio = row.getValue(
          'costToPerformanceRatio'
        ) as number
        if (costToPerformanceRatio === undefined) {
          return <>-</>
        }
        return (
          <span className="text-green-400">
            {costToPerformanceRatio?.toFixed(2) ?? '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'skills',
      header: 'SKILLS',
      cell: ({ row }) => {
        const skills = row.getValue('skills') as string[]
        return skills.map((item) => {
          return (
            <Badge className="m-[2px]" key={item}>
              {item}
            </Badge>
          )
        })
      },
    },
  ]

  return (
    <DataTable filterColumn={'model'} columns={columns} data={routerItems} />
  )
}
