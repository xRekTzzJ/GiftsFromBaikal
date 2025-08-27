import { ServiceContainerContext } from "@/provider/service-container-provider"
import { ServiceContainer } from "@/services"
import { useContext } from "react"

export const useServiceContainer = (): ServiceContainer => {
    const context = useContext(ServiceContainerContext);
    if (!context) throw new Error("ServiceContainer not provided");
    return context;
};
