"use client"

import {ServiceContainer} from "@/services/service-container";
import {createContext, FC, ReactNode, useContext} from "react";

const ServiceContainerContext = createContext<ServiceContainer | null>(null);

export let ServiceContainerProvider: FC<{ container: ServiceContainer; children: ReactNode }>;
ServiceContainerProvider = ({container, children}) => {
    return (
        <ServiceContainerContext.Provider value={container}>
            {children}
        </ServiceContainerContext.Provider>
    );
};

export const useServiceContainer = (): ServiceContainer => {
    const context = useContext(ServiceContainerContext);
    if (!context) throw new Error("ServiceContainer not provided");
    return context;
};
