"use client"

import {SidebarProvider} from "@/components/ui/sidebar";
import {ServiceContainerProvider} from "@/provider/service-container-provider";
import {ServiceContainer, ThemeService} from "@/services";


export default function AppProvider({children}: { children: React.ReactNode }) {
    const sc = new ServiceContainer();
    sc.register('ThemeService', new ThemeService());

    return <ServiceContainerProvider container={sc}>
        <SidebarProvider>
            {children}
        </SidebarProvider>
    </ServiceContainerProvider>
}