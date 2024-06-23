'use client'

import { toast } from 'react-hot-toast'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useUserStore from '@/stores/use-user-store'

export default function SettingsAccountPage() {
  const refresh = useUserStore((state) => state.refresh)

  const {
    labels,
    deleteLabel,
    objectives,
    deleteObjective,
    keyResults,
    deleteKeyResult,
    runs,
    deleteRun,
    projects,
    deleteProject,
    cycles,
    deleteCycle,
    chats,
    deleteChat,
  } = useUserStore((state) => state)

  const resetAccountData = async () => {
    await Promise.all((labels ?? []).map((l) => deleteLabel(l.id)))
    await Promise.all((objectives ?? []).map((o) => deleteObjective(o.id)))
    await Promise.all((keyResults ?? []).map((k) => deleteKeyResult(k.id)))
    await Promise.all((runs ?? []).map((r) => deleteRun(r.id)))
    await Promise.all((projects ?? []).map((p) => deleteProject(p.toString())))
    await Promise.all((cycles ?? []).map((c) => deleteCycle(c.id)))
    await Promise.all((chats ?? []).map((c) => deleteChat(c.id)))

    await refresh()
  }

  const onClickDeleteAccountData = async () => {
    await toast.promise(resetAccountData(), {
      loading: 'Resetting account data...',
      success: 'Account data reset',
      error: 'Failed to reset account data',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account data.
        </p>
      </div>
      <Separator />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Reset Account Data</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account data and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClickDeleteAccountData}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
