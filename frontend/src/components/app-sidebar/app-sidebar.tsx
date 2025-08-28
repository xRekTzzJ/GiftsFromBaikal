'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Route } from '@/constants'
import { useServiceContainer } from '@/hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const data = {
  navMain: [
    {
      title: 'Основное',
      items: [
        {
          title: 'Каталог',
          url: Route.CATALOG,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sc = useServiceContainer()
  const eventAggregator = sc.eventAgregator()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const unsubLogin = eventAggregator.subscribe<{ username: string }>(
      'login',
      (payload) => {
        setUsername(payload.username)
      }
    )

    const unsubLogout = eventAggregator.subscribe('logout', () => {
      setUsername(null)
    })

    return () => {
      unsubLogin()
      unsubLogout()
    }
  }, [])

  return (
    <Sidebar {...props} className="flex flex-col">
      <SidebarHeader className="px-4 py-4">
        <Link
          href={Route.HOME}
          className={'text-lg font-bold duration-300 hover:opacity-80'}
        >
          Подарки с Байкала 🌊
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {username}
      <div className="px-4 py-4 mt-auto">
        <Button className="w-full" asChild>
          <Link href={Route.LOGIN}>Войти</Link>
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
