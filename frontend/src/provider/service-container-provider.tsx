"use client"

import { ServiceContainer } from "@/services/service-container"
import { createContext, FC, ReactNode } from "react"

export const ServiceContainerContext = createContext<ServiceContainer | null>(null);

export let ServiceContainerProvider: FC<{ children: ReactNode }>;
ServiceContainerProvider = ({children}) => {
    const sc = new ServiceContainer();
    return (
        <ServiceContainerContext.Provider value={sc}>
            {children}
        </ServiceContainerContext.Provider>
    );
};

