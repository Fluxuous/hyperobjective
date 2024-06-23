import Main from '@/components/dashboard/main'
import ProjectSheet from '@/components/sheets/project-sheet'
import ProjectsTable from '@/components/tables/projects-table'
import { FilterProjectButton } from '@/components/buttons/filter-project-button'

export default function Page() {
  return (
    <Main>
      <div className="m-4">
        <div className="mt-8 mb-4 justify-between flex">
          <FilterProjectButton />
          <ProjectSheet />
        </div>
        <ProjectsTable />
      </div>
    </Main>
  )
}

export const runtime = 'nodejs'
