import Main from '@/components/dashboard/main'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar/sidebar-nav'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const items = [
    {
      title: 'All',
      href: '/apps',
    },
  ]
  return (
    <Main>
      <div className="hidden space-y-6 p-4 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Apps</h2>
          <p className="text-muted-foreground">
            Third-party apps provide data, tools, and account integrations for
            your project. Are we missing something? Send us a{' '}
            <a
              href="mailto:hello@hyperobjective.capital"
              className="text-muted-foreground underline"
            >
              message
            </a>
            !
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-0 lg:w-1/5">
            <SidebarNav items={items} />
          </aside>
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    </Main>
  )
}
