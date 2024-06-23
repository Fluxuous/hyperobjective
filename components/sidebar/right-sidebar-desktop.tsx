'use client'

import { useState, useEffect } from 'react'

import { RightSidebar } from '@/components/sidebar/right-sidebar'
import { RouterModelSelector } from '@/components/chat/router-model-selector'
import { RouterSkillsSelector } from '@/components/chat/router-skills-selector'
import { CostToPerformanceSelector } from '@/components/chat/cost-to-performance-selector'
import { TemperatureSelector } from '@/components/chat/temperature-selector'
import { Switch } from '@/components/ui/switch'
import { routerItems } from '@/lib/manifests/router'
import useUserStore from '@/stores/use-user-store'

function StreamSwitchForm() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex flex-row items-center justify-between rounded-lg p-0 mt-3 pt-3">
      <div className="space-y-0.5 font-medium text-sm leading-none">Stream</div>
      <Switch checked={checked} disabled={true} onCheckedChange={setChecked} />
    </div>
  )
}

export function RightSidebarDesktop() {
  const [isDisabled, setIsDisabled] = useState(false)
  const { chatConfig } = useUserStore((state) => state)

  useEffect(() => {
    setIsDisabled(chatConfig.modelUri.length > 0)
  }, [chatConfig.modelUri])

  return (
    <RightSidebar className="px-4 z-30 space-y-4 flex-full duration-300 ease-in-out flex w-1/5">
      <RouterModelSelector models={routerItems} />
      <RouterSkillsSelector models={routerItems} />
      <CostToPerformanceSelector isDisabled={isDisabled} />
      <TemperatureSelector isDisabled={isDisabled} />
      <StreamSwitchForm />
    </RightSidebar>
  )
}
