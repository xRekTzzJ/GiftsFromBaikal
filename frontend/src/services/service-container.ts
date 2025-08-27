"use client"

export class ServiceContainer {
    private services = new Map<string, any>()

    public register<T>(key: string, service: T) {
        this.services.set(key, service)
    }

    public get<T>(name: string): T {
        const service = this.services.get(name)
        if (!service) throw new Error(`Service ${name} not found`)
        return service;
    }
}