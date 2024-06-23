import Main from '@/components/dashboard/main'
import ProjectManagement from '@/components/dashboard/project-management'
import SelectProject from '@/components/buttons/select-project'

interface Props {
  params: {
    id: string
  }
  children: React.ReactNode
}

export default function Layout({ children, params }: Props) {
  return (
    <Main>
      <SelectProject />
      <ProjectManagement projectId={params.id}>{children}</ProjectManagement>
    </Main>
  )
}
