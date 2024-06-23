import { Button } from '@/components/ui/button'
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker'
import Main from '@/components/dashboard/main'
import Dashboard from '@/components/dashboard/feed'
import UsageTable from '@/components/tables/usage-table'

export default function Page() {
  return (
    <Main>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-4 pb-0">
          <div className="flex items-center justify-between space-y-0">
            <h2 className="text-3xl font-bold tracking-tight"></h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button disabled>Download</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Dashboard />
          </div>
        </div>
      </div>
      <div className="m-4">
        <UsageTable />
      </div>
    </Main>
  )
}
