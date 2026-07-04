import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Unbounded, Inter } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-unbounded',
  weight: ['500', '700', '900'],
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'HillStreet RP — Minecraft Roleplay сервер',
  description:
    'HillStreet RP — атмосферный Minecraft Roleplay сервер. Правила, документы и сообщество проекта.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/logo.png' }],
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c0f22',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`bg-background ${unbounded.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
