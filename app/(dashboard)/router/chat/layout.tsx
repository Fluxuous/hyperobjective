import { LeftSidebarDesktop } from '@/components/sidebar/left-sidebar-desktop'
import { RightSidebarDesktop } from '@/components/sidebar/right-sidebar-desktop'
import { LeftSidebarToggle } from '@/components/sidebar/left-sidebar-toggle'
import { RightSidebarToggle } from '@/components/sidebar/right-sidebar-toggle'
import Main from '@/components/dashboard/main'

interface Props {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: Props) {
  return (
    <Main>
      <div className="flex h-full overflow-hidden">
        <LeftSidebarToggle />
        <LeftSidebarDesktop />
        <div className="flex flex-1 overflow-auto pt-4">{children}</div>
        <RightSidebarDesktop />
        <RightSidebarToggle />
      </div>
    </Main>
  )
}
