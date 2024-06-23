'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useUserStore from '@/stores/use-user-store'

function calculateGrowth(data: any[] | null) {
  if (data) {
    return data && data.length > 0 ? '+100%' : '0%'
  }
  return '-'
}

export default function FeedPage() {
  const { projects, objectives, keyResults, runs } = useUserStore()

  const projectsGrowth = calculateGrowth(projects)
  const objectivesGrowth = calculateGrowth(objectives)
  const keyResultsGrowth = calculateGrowth(keyResults)
  const runsGrowth = calculateGrowth(runs)

  const cardClass = 'bg-muted/0'

  return (
    <>
      <Card className={cardClass}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects?.length ?? '-'}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-400">{projectsGrowth} </span>from last
            month
          </p>
        </CardContent>
      </Card>
      <Card className={cardClass}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{objectives?.length ?? '-'}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-400">{objectivesGrowth} </span>from last
            month
          </p>
        </CardContent>
      </Card>
      <Card className={cardClass}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Key Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{keyResults?.length ?? '-'}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-400">{keyResultsGrowth} </span>from last
            month
          </p>
        </CardContent>
      </Card>
      <Card className={cardClass}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{runs?.length ?? '-'}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-400">{runsGrowth} </span>from last month
          </p>
        </CardContent>
      </Card>
    </>
  )
}
