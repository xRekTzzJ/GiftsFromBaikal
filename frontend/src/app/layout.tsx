import { AppSidebar } from '@/components/app-sidebar'
import Footer from '@/components/footer/footer'
import { Header } from '@/components/header'
import { SidebarInset } from '@/components/ui/sidebar'
import { CookieStoreType, ThemeType } from '@/constants'
import AppProvider from '@/provider/app-provider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import React from 'react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Подарки с Байкала 🌊',
  description: 'Открой для себя настоящие подарки с Байкала',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const theme = cookieStore.get(CookieStoreType.THEME)?.value as ThemeType
  const isDark = theme === ThemeType.Dark

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${
          isDark ? 'dark' : ''
        } antialiased flex bg-secondary`}
        style={{ maxWidth: '1920px', margin: '0 auto' }}
      >
        <AppProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col flex-1 min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SidebarInset>
        </AppProvider>
      </body>
    </html>
  )
}
