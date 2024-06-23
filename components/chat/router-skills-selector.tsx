'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { PopoverProps } from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
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
import { ROUTER_SKILLS } from '@/lib/constants'
import useUserStore from '@/stores/use-user-store'

interface ModelItemProps {
  skill: string
  isSelected: boolean
  onSelect: () => void
}

function SkillItem({ skill, isSelected, onSelect }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <CommandItem
      key={skill}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {skill}
      <CheckIcon
        className={cn(
          'ml-auto size-4 p-1',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
    </CommandItem>
  )
}

interface ModelSelectorProps extends PopoverProps {
  models: RouterItem[]
}

export function RouterSkillsSelector({ models, ...props }: ModelSelectorProps) {
  const setChatConfig = useUserStore((state) => state.setChatConfig)

  const [open, setOpen] = React.useState(false)

  const [selectedSkills, setSelectedSkills] = useLocalStorage<string[]>(
    ROUTER_SKILLS,
    []
  )

  useEffect(() => {
    setChatConfig({
      skill: selectedSkills[0],
    })
  }, [selectedSkills, setChatConfig])

  const skills = Array.from(new Set(models.map((model) => model.skills).flat()))

  return (
    <div className="grid gap-2 mt-3">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Skill</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model skills which will generate the completion. Some models are
          suitable for natural language tasks, others specialize in code. Learn
          more.
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
            {selectedSkills.length === 0
              ? 'Auto'
              : selectedSkills.length > 1
                ? 'Multiple'
                : selectedSkills[0]}
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
            ></HoverCardContent>
            <Command>
              <CommandInput className="" placeholder="Search skills..." />
              <CommandEmpty>No skills found.</CommandEmpty>
              <CommandList className="max-h-[400px] p-1">
                <HoverCardTrigger />
                {skills.map((skill) => (
                  <SkillItem
                    key={skill}
                    skill={skill}
                    isSelected={
                      selectedSkills.filter((m: any) => m === skill).length > 0
                    }
                    onSelect={() => {
                      if (selectedSkills[0] === skill) {
                        setSelectedSkills([])
                      } else {
                        setSelectedSkills([skill])
                      }

                      setOpen(false)
                    }}
                  />
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}
