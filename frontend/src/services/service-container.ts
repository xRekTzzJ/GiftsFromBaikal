"use client"

import { ThemeService } from "@/services/theme-service"

export class ServiceContainer {
    private readonly _themeService = new ThemeService();

    public themeService() {
        return this._themeService;
    }
}