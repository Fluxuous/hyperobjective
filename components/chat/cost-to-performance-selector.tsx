'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { SliderProps } from '@radix-ui/react-slider'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { ROUTER_COST_TO_PERFORMANCE_RATIO } from '@/lib/constants'
import useUserStore from '@/stores/use-user-store'

interface TopPSelectorProps {
  defaultValue?: SliderProps['defaultValue']
  isDisabled?: boolean
}

export function CostToPerformanceSelector({
  defaultValue,
  isDisabled = false,
}: TopPSelectorProps) {
  const setChatConfig = useUserStore((state) => state.setChatConfig)

  const [costToPerformanceRatio, setCostToPerformanceRatio] = useLocalStorage<
    number[]
  >(ROUTER_COST_TO_PERFORMANCE_RATIO, defaultValue ?? [0.5])

  useEffect(() => {
    setChatConfig({
      costToPerformanceRatio,
    })
  }, [costToPerformanceRatio, setChatConfig])

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="cost">Cost to Performance Ratio</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {costToPerformanceRatio}
              </span>
            </div>
            <Slider
              id="cost"
              max={1}
              defaultValue={costToPerformanceRatio}
              step={0.1}
              value={costToPerformanceRatio}
              onValueChange={setCostToPerformanceRatio}
              disabled={isDisabled}
              className="[&_[role=slider]]:size-4"
              aria-label="Cost to Performance Ratio"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The efficiency of generating outputs by balancing financial costs
          against result quality.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
