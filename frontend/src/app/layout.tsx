import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { CookieStoreType, ThemeType } from '@/constants'
import AppProvider from "@/provider/app-provider"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from 'next/headers'
import React from "react"
import "./globals.css"


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Подарки с Байкала 🌊",
    description: "Открой для себя настоящие подарки с Байкала",
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const theme = cookieStore.get(CookieStoreType.THEME)?.value as ThemeType;
    const isDark = theme === ThemeType.Dark;

    return (
        <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable}  ${isDark ? 'dark' : ''} antialiased flex`}>
        <AppProvider>
            <AppSidebar/>
            <SidebarInset className="flex flex-col flex-1 min-h-screen">
                <Header/>
                <main className="flex-1 p-4">{children}</main>
                <footer className="h-16 shrink-0 border-t px-4 flex items-center justify-center text-sm">
                    © 2025 Подарки с Байкала. Все права защищены.
                </footer>
            </SidebarInset>
        </AppProvider>
        </body>
        </html>
    );
}
