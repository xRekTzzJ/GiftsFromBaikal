'use client'

import { AppSidebar } from '@/components/app-sidebar'
import Footer from '@/components/footer/footer'
import { Header } from '@/components/header'
import { SidebarInset } from '@/components/ui/sidebar'
import { ThemeType } from '@/constants'
import AppProvider from '@/provider/app-provider'
import { Geist, Geist_Mono } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') as ThemeType | null
    if (theme === ThemeType.Dark) {
      setIsDark(true)
      document.body.classList.add('dark')
    } else {
      setIsDark(false)
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <html lang="ru">
      <body
        title="Подарки с Байкала 🌊"
        className={`${geistSans.variable} ${geistMono.variable} ${
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
