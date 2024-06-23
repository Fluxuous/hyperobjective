'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { Chat } from '@/lib/types'
import { SidebarItem } from '@/components/sidebar/sidebar-item'
import ChatDropdownMenu from '@/components/menus/chat-dropdown-menu'

interface Props {
  chats: Chat[]
}

export function SidebarItems({ chats }: Props) {
  if (chats.length) {
    return (
      <AnimatePresence>
        {chats.map(
          (chat, index) =>
            chat && (
              <motion.div
                key={chat?.id}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
              >
                <SidebarItem index={index} chat={chat}>
                  <ChatDropdownMenu chat={chat} />
                </SidebarItem>
              </motion.div>
            )
        )}
      </AnimatePresence>
    )
  }
}
