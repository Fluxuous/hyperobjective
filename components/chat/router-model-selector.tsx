'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { PopoverProps } from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'
import { useMutationObserver } from '@/lib/hooks/use-mutation-observer'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RouterItem } from '@/lib/types'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { ROUTER_MODELS } from '@/lib/constants'
import useUserStore from '@/stores/use-user-store'

interface ModelItemProps {
  routerItem: RouterItem
  isSelected: boolean
  onSelect: () => void
  onPeek: (model: RouterItem) => void
}

function ModelItem({
  routerItem,
  isSelected,
  onSelect,
  onPeek,
}: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'aria-selected') {
          onPeek(routerItem)
        }
      }
    }
  })

  return (
    <CommandItem
      key={routerItem.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {routerItem.model}
      <CheckIcon
        className={cn(
          'ml-auto size-4',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
    </CommandItem>
  )
}

interface ModelSelectorProps extends PopoverProps {
  models: RouterItem[]
}

export function RouterModelSelector({ models, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const setChatConfig = useUserStore((state) => state.setChatConfig)

  const [selectedModels, setSelectedModels] = useLocalStorage<RouterItem[]>(
    ROUTER_MODELS,
    []
  )
  const [peekedModel, setPeekedModel] = React.useState<RouterItem>(models[0])

  const vendors = Array.from(new Set(models.map((model) => model.vendor)))

  useEffect(() => {
    setChatConfig({
      modelUri:
        selectedModels
          .map((model) => `${model.provider}:${model.vendor}:${model.model}`)
          .pop() ?? '',
    })
  }, [selectedModels, setChatConfig])

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Router Model</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            <span className="flex max-h-5 text-left overflow-x-scroll">
              {selectedModels.length === 0 ? 'Auto' : selectedModels[0].model}
            </span>
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[267px] offset-y-0 p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px] hidden"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">
                  {peekedModel.model}
                </h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.skills ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>

                    {peekedModel.skills.map((skillset) => (
                      <ul
                        key={skillset}
                        className="text-sm text-muted-foreground"
                      >
                        {skillset}
                      </ul>
                    ))}
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command>
              <CommandInput className="" placeholder="Search models..." />
              <CommandEmpty>No Models found.</CommandEmpty>
              <CommandList className="max-h-[400px]">
                <HoverCardTrigger />
                {vendors.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.vendor === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          routerItem={model}
                          isSelected={
                            selectedModels.filter((m: any) => m.id === model.id)
                              .length > 0
                          }
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            if (selectedModels[0]?.id === model.id) {
                              setSelectedModels([])
                            } else {
                              setSelectedModels([model])
                            }
                            setOpen(false)
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}
