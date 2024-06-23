'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/icons'
import useUserStore from '@/stores/use-user-store'

export default function GenerateCyclesButton() {
  const [isLoading, setIsLoading] = useState(false)

  const { cycles, createCycle, activeProject } = useUserStore((state) => state)

  const onClickGenerateCycles = async () => {
    setIsLoading(true)

    const years = [2024, 2025]
    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < 4; j++) {
        const maybeCycle = cycles
          ?.filter((c) => {
            return c.projectId === activeProject?.id
          })
          .find(
            (c) =>
              c.quarter.toString() === (j + 1).toString() &&
              c.year.toString() === years[i].toString()
          )

        if (!maybeCycle) {
          await createCycle({
            quarter: j + 1,
            year: years[i],
            projectId: activeProject?.id ?? '',
          })
        }
      }
    }

    toast.success('Generated cycles')

    setIsLoading(false)
  }

  if (activeProject && cycles) {
    return (
      <Button
        className="m-0 mr-2"
        variant="outline"
        disabled={isLoading}
        onClick={onClickGenerateCycles}
      >
        {isLoading ? <IconSpinner className="animate-spin mr-2" /> : null}
        Generate Cycles
      </Button>
    )
  }
}
