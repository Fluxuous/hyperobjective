import { Separator } from '@/components/ui/separator'
import { LabelsForm } from '@/components/forms/labels-form'

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Labels</h3>
        <p className="text-sm text-muted-foreground">
          Update your Project labels.
        </p>
      </div>
      <Separator />
      <LabelsForm />
    </div>
  )
}
