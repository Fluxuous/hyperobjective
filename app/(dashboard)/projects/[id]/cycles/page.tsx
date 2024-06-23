'use client'

import CyclesTable from '@/components/tables/cycles-table'
import GenerateCyclesButton from '@/components/buttons/generate-cycles-button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { CycleDialog } from '@/components/dialogs/cycle-dialog'
import useUserStore from '@/stores/use-user-store'

interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { cycles, projects } = useUserStore((state) => state)
  const project = projects?.find((a) => a.id === params.id)
  if (!cycles || !project) {
    return <Skeleton className="w-full h-[20px]" />
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cycles</h3>
        <p className="text-sm text-muted-foreground">
          Update your Project cycles.
        </p>
      </div>
      <Separator />
      <div className="justify-start flex">
        <GenerateCyclesButton />
        <CycleDialog />
      </div>
      <CyclesTable cycles={cycles} project={project} />
    </div>
  )
}
