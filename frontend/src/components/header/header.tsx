"use client"
import React from "react";
import {Button} from "@/components/ui/button";
import {IconMoon} from '@tabler/icons-react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ThemeService} from "@/services";
import {ThemeType} from "@/constants";

const themeService = new ThemeService();

export function Header() {
    const toggleTheme = () => {
        themeService.setCurrentTheme(
            themeService.currentTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
        );
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer"/>
            <Button className="ml-auto cursor-pointer" onClick={toggleTheme}>
                <IconMoon/>
            </Button>
        </header>
    )
}
