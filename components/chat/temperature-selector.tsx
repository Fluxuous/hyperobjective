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
import { ROUTER_TEMPERATURE } from '@/lib/constants'
import useUserStore from '@/stores/use-user-store'

interface SelectorProps {
  defaultValue?: SliderProps['defaultValue']
  isDisabled?: boolean
}

export function TemperatureSelector({ defaultValue }: SelectorProps) {
  const [temperature, setTemperature] = useLocalStorage<number[]>(
    ROUTER_TEMPERATURE,
    defaultValue ?? [0.5]
  )

  const setChatConfig = useUserStore((state) => state.setChatConfig)

  useEffect(() => {
    setChatConfig({
      temperature,
    })
  }, [temperature, setChatConfig])

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="quality">Temperature</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {temperature}
              </span>
            </div>
            <Slider
              id="quality"
              max={1}
              value={temperature}
              defaultValue={temperature}
              step={0.1}
              onValueChange={setTemperature}
              className="[&_[role=slider]]:size-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls the randomness of predictions in language models, with lower
          values making outputs more deterministic and higher values increasing
          variability and creativity.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
