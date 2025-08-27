'use client'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useServiceContainer } from '@/hooks'
import { IconBrightnessHalf } from '@tabler/icons-react'

export function Header() {
  const sc = useServiceContainer()
  const themeService = sc.themeService()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Button
        className="ml-auto cursor-pointer"
        onClick={() => themeService.toggleCurrentTheme()}
      >
        <IconBrightnessHalf />
      </Button>
    </header>
  )
}
