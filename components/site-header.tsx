'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/rules', label: 'Правила администрации' },
  { href: '/tickets', label: 'Тикеты и соглашение' },
  { href: '/docs', label: 'Документы' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Логотип HillStreet RP"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-heading text-sm font-bold tracking-wide text-foreground">
            HILLSTREET RP
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://dsc.gg/hillstreet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Discord
          </a>
        </nav>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden"
          aria-label="Мобильная навигация"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://dsc.gg/hillstreet"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            Discord
          </a>
        </nav>
      )}
    </header>
  )
}
