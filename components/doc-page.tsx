import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CubeField } from '@/components/fx/cube-field'
import { Reveal } from '@/components/fx/reveal'

export function DocPage({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative overflow-hidden border-b border-border bg-card">
          <CubeField count={8} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.62_0.28_328_/_14%),_transparent_60%)]"
          />
          <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-16">
            <Reveal>
              <h1 className="font-heading text-2xl font-bold text-foreground text-balance md:text-4xl">
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.12}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {subtitle}
                </p>
              </Reveal>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}

export function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="mb-10">
        <h2 className="font-heading mb-4 text-lg font-bold text-primary md:text-xl text-balance">
          {title}
        </h2>
        <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90 md:text-base">
          {children}
        </div>
      </section>
    </Reveal>
  )
}

export function DocItem({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/40 hover:bg-accent/40">
      {n && <span className="font-heading shrink-0 text-sm font-bold text-primary">{n}</span>}
      <p className="leading-relaxed">{children}</p>
    </div>
  )
}
