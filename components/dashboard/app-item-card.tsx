'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import useUserStore from '@/stores/use-user-store'
import { Button } from '@/components/ui/button'
import { ResourceItem } from '@/lib/types'

type Props = {
  app: ResourceItem
  isConfigured?: boolean
}

export function AppItemCard({ app, isConfigured }: Props) {
  const [checked, setChecked] = useState(false)

  const { billingAccount, updateBillingAccount } = useUserStore(
    (state) => state
  )

  useEffect(() => {
    if (billingAccount) {
      setChecked(billingAccount.appIds.includes(app.id))
    }
  }, [billingAccount, app.id])

  if (!billingAccount) {
    return <Skeleton className="w-full h-[20px]" />
  }

  const AppStatus = () => {
    const color = checked
      ? isConfigured || isConfigured === undefined
        ? 'text-green-400'
        : 'text-yellow-400'
      : 'text-slate-400'
    return (
      <div
        className={`h-11 text-center flex flex-full m-0 p-0 text-4xl ${color}`}
      >
        &bull;
      </div>
    )
  }

  const onCheckedChange = async (checked: boolean, appId: string) => {
    setChecked(checked)

    if (checked) {
      await updateBillingAccount({
        ...billingAccount,
        appIds: [...billingAccount.appIds, appId],
      })
    } else {
      await updateBillingAccount({
        ...billingAccount,
        appIds: billingAccount.appIds.filter((id) => id !== appId),
      })
    }

    toast.success('Updated apps')
  }

  const onClickConfigure = async () => {
    if (app.provider === 'twitter') {
      // TODO: Fix
    } else {
      toast.success('No settings')
    }
  }

  return billingAccount ? (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <AppStatus />
      <div className="flex-1 space-y-1">
        <p className="text-lg font-medium leading-none">{app.name}</p>
        <p className="text-md text-muted-foreground">{app.description}</p>
        <Button
          onClick={onClickConfigure}
          disabled={!checked}
          variant="link"
          className="pl-0"
        >
          {isConfigured
            ? 'Revoke'
            : isConfigured === undefined
              ? 'Settings'
              : 'Authorize'}
        </Button>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(c) => onCheckedChange(c, app.id)}
      />
    </div>
  ) : null
}
