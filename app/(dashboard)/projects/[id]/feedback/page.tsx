import { Separator } from '@/components/ui/separator'
import FeedbackTable from '@/components/tables/feedback-table'
import FeedbackSheet from '@/components/sheets/feedback-sheet'

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Feedback</h3>
        <p className="text-sm text-muted-foreground">
          Provide feedback on your Project runs to fine-tune your models.
        </p>
      </div>
      <Separator />
      <div className="justify-start flex">
        <FeedbackSheet />
      </div>
      <FeedbackTable />
    </div>
  )
}
