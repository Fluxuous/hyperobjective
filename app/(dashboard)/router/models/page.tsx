import Main from '@/components/dashboard/main'
import ModelsTable from '@/components/tables/models-table'
import { getAnalyzedRouterItems } from '@/lib/ai/router'

export default async function Page() {
  const routerItems = await getAnalyzedRouterItems()
  return (
    <Main>
      <div className="p-4 flex flex-full flex-col w-full">
        <ModelsTable routerItems={routerItems} />
      </div>
    </Main>
  )
}
