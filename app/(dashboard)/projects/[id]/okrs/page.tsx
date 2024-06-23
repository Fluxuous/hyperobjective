'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import ObjectiveSheet from '@/components/sheets/objective-sheet'
import { GenerateObjectivesDialog } from '@/components/dialogs/generate-objectives-dialog'
import ObjectivesTable from '@/components/tables/objectives-table'
import useUserStore from '@/stores/use-user-store'

interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { projects } = useUserStore((state) => state)
  const project = projects?.find((a) => a.id === params.id)
  if (!project) {
    return <Skeleton className="w-full h-[20px]" />
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">OKRs</h3>
        <p className="text-sm text-muted-foreground">
          Update your Project objectives and key results.
        </p>
      </div>
      <Separator />
      <div className="justify-start flex">
        <GenerateObjectivesDialog project={project} />
        <ObjectiveSheet project={project} />
      </div>
      <ObjectivesTable project={project} />
    </div>
  )
}
