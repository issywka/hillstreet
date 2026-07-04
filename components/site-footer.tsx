import Link from 'next/link'
import Image from 'next/image'

const docLinks = [
  { href: '/rules', label: 'Правила администрации' },
  { href: '/tickets', label: 'Правила тикетов и соглашение' },
  { href: '/oferta', label: 'Договор оферты' },
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/refund', label: 'Правила возврата' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Логотип HillStreet RP"
              width={44}
              height={44}
              className="rounded-md"
            />
            <span className="font-heading text-sm font-bold text-foreground">HILLSTREET RP</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Атмосферный Minecraft Roleplay сервер. Живи по своим правилам на улицах HillStreet.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm font-bold text-foreground">Документы</h3>
          {docLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm font-bold text-foreground">Контакты</h3>
          <a
            href="https://dsc.gg/hillstreet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Discord: dsc.gg/hillstreet
          </a>
          <a
            href="https://t.me/hillstreetrp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Telegram: t.me/hillstreetrp
          </a>
          <a
            href="mailto:moinoytbyk@gmail.com"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            moinoytbyk@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>ИП Бабаев Иса Абдирахимович · Кыргызская Республика</p>
          <p>
            {'© '}
            {new Date().getFullYear()}
            {' HillStreet RP. Все права защищены.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
