import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {SidebarInset} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import AppProvider from "@/provider/app-provider";
import {Header} from "@/components/header";

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
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
