import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, MessageSquare, ScrollText, Lock, RotateCcw, ArrowRight } from 'lucide-react'
import { DocPage } from '@/components/doc-page'

export const metadata: Metadata = {
  title: 'Документы — HillStreet RP',
  description: 'Все правила и юридические документы проекта HillStreet RP.',
}

const docs = [
  {
    href: '/rules',
    icon: Shield,
    title: 'Правила администрации',
    description:
      'Регламент работы игровой администрации и Discord-персонала: обязанности, запреты и система выговоров [0/3].',
  },
  {
    href: '/tickets',
    icon: MessageSquare,
    title: 'Правила тикетов и пользовательское соглашение',
    description:
      'Как правильно обращаться в поддержку и условия использования сервисов проекта.',
  },
  {
    href: '/oferta',
    icon: ScrollText,
    title: 'Договор публичной оферты',
    description:
      'Условия приобретения цифровых услуг в соответствии с законодательством Кыргызской Республики.',
  },
  {
    href: '/privacy',
    icon: Lock,
    title: 'Политика конфиденциальности',
    description: 'Какие данные мы собираем, зачем и как их защищаем.',
  },
  {
    href: '/refund',
    icon: RotateCcw,
    title: 'Правила возврата денежных средств',
    description: 'Когда возможен возврат оплаты и как его оформить.',
  },
]

export default function DocsPage() {
  return (
    <DocPage
      title="Документы проекта"
      subtitle="Все правила и юридические документы HillStreet RP в одном месте."
    >
      <div className="flex flex-col gap-4">
        {docs.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent">
              <doc.icon className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <h2 className="font-heading text-sm font-bold text-foreground md:text-base">
                {doc.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
            </div>
            <ArrowRight
              className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        ИП Бабаев Иса Абдирахимович · moinoytbyk@gmail.com · Кыргызская Республика
      </p>
    </DocPage>
  )
}
