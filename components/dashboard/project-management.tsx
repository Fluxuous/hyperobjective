'use client'

import { ProjectMenu } from '@/components/menus/project-menu'
import { SidebarNav } from '@/components/sidebar/sidebar-nav'
import useUserStore from '@/stores/use-user-store'

interface Props {
  children: React.ReactNode
  projectId: string
}

export default function ProjectManagement({ children, projectId }: Props) {
  const projects = useUserStore((state) => state.projects)
  const items = [
    {
      title: 'Cycles',
      href: `/project/${projectId}/cycles`,
    },
    {
      title: 'Labels',
      href: `/project/${projectId}/labels`,
    },
    {
      title: 'OKRs',
      href: `/project/${projectId}/okrs`,
    },
    {
      title: 'Feedback',
      href: `/project/${projectId}/feedback`,
    },
    {
      title: 'Runs',
      href: `/project/${projectId}/runs`,
    },
  ]

  if (projects && projects.length) {
    return (
      <div className="hidden space-y-4 p-4 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-0 lg:w-1/5">
            <ProjectMenu projectId={projectId} />
            <SidebarNav className="mt-4" items={items} />
          </aside>
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    )
  }
}
