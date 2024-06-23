'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUserStore from '@/stores/use-user-store'

export function FilterProjectButton() {
  const { projectViewConfig, setProjectViewConfig } = useUserStore(
    (state) => state
  )
  return (
    <Select
      value={projectViewConfig.view}
      onValueChange={(view) =>
        setProjectViewConfig({ view: view as 'all' | 'my' })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a view" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>View</SelectLabel>
          <SelectItem
            value="all"
            onSelect={() => setProjectViewConfig({ view: 'all' })}
          >
            All
          </SelectItem>
          <SelectItem
            value="my"
            onSelect={() => setProjectViewConfig({ view: 'my' })}
          >
            My Project
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
