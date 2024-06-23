import RunsTable from '@/components/tables/runs-table'
import { Separator } from '@/components/ui/separator'
import RunSheet from '@/components/sheets/run-sheet'

interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Runs</h3>
        <p className="text-sm text-muted-foreground">
          View and manage your Project runs.
        </p>
      </div>
      <Separator />
      <div className="justify-start flex">
        <RunSheet projectId={params.id} />
      </div>
      <RunsTable projectId={params.id} />
    </div>
  )
}
