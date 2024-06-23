'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { IconSpinner } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useUserStore from '@/stores/use-user-store'

export default function GenerateLabelsButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { createLabel } = useUserStore((state) => state)
  const activeProject = useUserStore((state) => state.activeProject)

  const onClickGenerateLabels = async () => {
    if (!activeProject) {
      return
    }

    setIsLoading(true)

    const labels = ['Enablers', 'Internal', 'Customer', 'Financial']
    for (let i = 0; i < labels.length; i++) {
      await createLabel({
        name: labels[i],
        color: 'black',
        projectId: activeProject?.id,
      })
    }

    setIsLoading(false)
    toast.success('Generated labels')
  }

  if (activeProject) {
    return (
      <Button
        className="m-0 mr-2"
        variant="outline"
        onClick={onClickGenerateLabels}
      >
        {isLoading ? <IconSpinner className="mr-2" /> : null}
        Generate Labels
      </Button>
    )
  }
}
