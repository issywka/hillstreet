'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Shield,
  MessageSquare,
  FileText,
  ScrollText,
  Lock,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Users,
  Gamepad2,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CubeField } from '@/components/fx/cube-field'
import { Reveal, Stagger, StaggerItem } from '@/components/fx/reveal'

const docs = [
  {
    href: '/rules',
    icon: Shield,
    title: 'Правила администрации',
    description: 'Обязанности, запреты и система выговоров для игровой администрации и Discord-персонала.',
  },
  {
    href: '/tickets',
    icon: MessageSquare,
    title: 'Тикеты и пользовательское соглашение',
    description: 'Правила поведения в тикетах и условия использования сервисов проекта.',
  },
  {
    href: '/oferta',
    icon: ScrollText,
    title: 'Договор оферты',
    description: 'Публичный договор оферты в соответствии с законодательством Кыргызской Республики.',
  },
  {
    href: '/privacy',
    icon: Lock,
    title: 'Политика конфиденциальности',
    description: 'Как мы собираем, храним и защищаем ваши персональные данные.',
  },
  {
    href: '/refund',
    icon: RotateCcw,
    title: 'Правила возврата',
    description: 'Порядок и условия возврата денежных средств за цифровые услуги.',
  },
]

const features = [
  {
    icon: Gamepad2,
    title: 'Живой роллплей',
    description: 'Своя экономика, работы, фракции и уличные истории, которые пишут сами игроки.',
  },
  {
    icon: Users,
    title: 'Активное сообщество',
    description: 'Ивенты, розыгрыши и дружное комьюнити в Discord и Telegram каждый день.',
  },
  {
    icon: Sparkles,
    title: 'Уникальная атмосфера',
    description: 'Кастомные плагины, проработанный город и внимание к деталям в каждом квартале.',
  },
]

const marqueeWords = [
  'ROLEPLAY',
  'HILLSTREET',
  'MINECRAFT',
  'СВОИ УЛИЦЫ',
  'СВОЯ ИСТОРИЯ',
  'КОМЬЮНИТИ',
]

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="bg-hero-grid animate-grid-pan absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.62_0.28_328_/_22%),_transparent_60%)]"
      />
      <CubeField count={20} />

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center md:py-28"
      >
        <motion.div
          style={{ y: yLogo }}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.8, y: reduce ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Image
            src="/images/logo.png"
            alt="HillStreet Roleplay"
            width={260}
            height={260}
            priority
            className="animate-logo-float rounded-2xl"
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-heading text-3xl font-black tracking-tight text-balance md:text-6xl"
          >
            <span className="text-shimmer">HILLSTREET</span>{' '}
            <span className="text-primary">ROLEPLAY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
          >
            Атмосферный Minecraft Roleplay сервер. Своя история, свои улицы, свои правила.
            Присоединяйся к сообществу HillStreet RP.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <motion.a
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            href="https://dsc.gg/hillstreet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-8 py-3 font-heading text-sm font-bold text-primary-foreground shadow-[0_0_30px_-6px_oklch(0.62_0.28_328/70%)] transition-shadow hover:shadow-[0_0_45px_-4px_oklch(0.62_0.28_328/90%)]"
          >
            Наш Discord
          </motion.a>
          <motion.a
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            href="https://t.me/hillstreetrp"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card px-8 py-3 font-heading text-sm font-bold text-foreground transition-colors hover:border-primary/60 hover:bg-accent"
          >
            Telegram-канал
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Marquee() {
  const items = [...marqueeWords, ...marqueeWords]
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-b border-border bg-card py-4"
    >
      <div className="animate-marquee flex w-max items-center gap-8">
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-heading text-sm font-bold tracking-widest text-muted-foreground/60">
              {word}
            </span>
            <span className="size-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Reveal className="mb-10 flex flex-col gap-3">
            <h2 className="font-heading text-2xl font-bold text-foreground text-balance md:text-3xl">
              Почему <span className="text-primary">HillStreet</span>?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Мы строим не просто сервер, а живой город со своими законами улиц.
            </p>
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_12px_40px_-12px_oklch(0.62_0.28_328/35%)]">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-accent transition-colors group-hover:bg-primary/25">
                    <feature.icon className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-sm font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Documents */}
        <section className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Reveal className="mb-10 flex flex-col gap-3">
              <h2 className="font-heading text-2xl font-bold text-foreground text-balance md:text-3xl">
                Документы проекта
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Правила сервера и юридические документы HillStreet RP. Ознакомьтесь с ними перед
                игрой и покупками на проекте.
              </p>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc) => (
                <StaggerItem key={doc.href} className="h-full">
                  <Link
                    href={doc.href}
                    className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_12px_40px_-12px_oklch(0.62_0.28_328/35%)]"
                  >
                    <div className="flex size-11 items-center justify-center rounded-lg bg-accent transition-colors group-hover:bg-primary/25">
                      <doc.icon className="size-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading text-sm font-bold text-foreground">
                        {doc.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                      Читать
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
              <StaggerItem className="h-full">
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-6 text-center">
                  <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
                  <span className="font-heading text-sm font-bold text-foreground">
                    Правила дополняются администрацией проекта
                  </span>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* Community */}
        <section className="relative overflow-hidden border-t border-border bg-card">
          <CubeField count={12} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.62_0.28_328_/_14%),_transparent_65%)]"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-foreground text-balance md:text-4xl">
                Стань частью улиц <span className="text-primary">HillStreet</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
                Новости, ивенты, розыгрыши и общение с игроками — всё в нашем Discord и Telegram.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://dsc.gg/hillstreet"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-8 py-3 font-heading text-sm font-bold text-primary-foreground shadow-[0_0_30px_-6px_oklch(0.62_0.28_328/70%)] transition-all hover:scale-105 hover:shadow-[0_0_45px_-4px_oklch(0.62_0.28_328/90%)]"
              >
                dsc.gg/hillstreet
              </a>
              <a
                href="https://t.me/hillstreetrp"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-8 py-3 font-heading text-sm font-bold text-foreground transition-all hover:scale-105 hover:border-primary/60 hover:bg-accent"
              >
                t.me/hillstreetrp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
