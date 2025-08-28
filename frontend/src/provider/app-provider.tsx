'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { ServiceContainerProvider } from '@/provider/service-container-provider'

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ServiceContainerProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ServiceContainerProvider>
  )
}
