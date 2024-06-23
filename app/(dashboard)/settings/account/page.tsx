'use client'

import { toast } from 'react-hot-toast'

import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import useUserStore from '@/stores/use-user-store'

export default function SettingsAccountPage() {
  const { updateUser, user, beta } = useUserStore((state) => state)

  const onChangeBetaMode = async (checked: boolean) => {
    if (!user) return
    updateUser({ ...user, private: checked })
    toast.success('Updated user')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">Manage your account.</p>
      </div>
      <Separator />
      <div className="flex items-center space-x-2">
        <Switch
          id="beta-mode"
          checked={beta}
          disabled={beta === null}
          onCheckedChange={onChangeBetaMode}
        />
        <Label htmlFor="beta-mode">Goblin Mode</Label>
      </div>
    </div>
  )
}
