// HillStreet RP — общий скрипт

// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle')
const mobileNav = document.querySelector('.mobile-nav')

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open')
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню')
  })

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open')
      menuToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

// Появление блоков при прокрутке (с каскадной задержкой)
const reveals = document.querySelectorAll('.reveal')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Каскад: карточки внутри одной сетки появляются по очереди
document.querySelectorAll('.card-grid, .doc-list, .community__inner').forEach((group) => {
  group.querySelectorAll(':scope > .reveal').forEach((el, idx) => {
    el.style.setProperty('--reveal-delay', idx * 0.1 + 's')
  })
})

if ('IntersectionObserver' in window && reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  reveals.forEach((el) => observer.observe(el))
} else {
  reveals.forEach((el) => el.classList.add('visible'))
}

// Прогресс-бар прокрутки страницы
const progressBar = document.createElement('div')
progressBar.className = 'scroll-progress'
progressBar.setAttribute('aria-hidden', 'true')
document.body.appendChild(progressBar)

let progressTicking = false
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const ratio = max > 0 ? window.scrollY / max : 0
  progressBar.style.transform = 'scaleX(' + Math.min(ratio, 1) + ')'
  progressTicking = false
}
window.addEventListener(
  'scroll',
  () => {
    if (!progressTicking) {
      progressTicking = true
      requestAnimationFrame(updateProgress)
    }
  },
  { passive: true }
)
updateProgress()

// 3D-наклон карточек за курсором
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card:not(.card--dashed)').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      card.classList.add('tilting')
      card.style.setProperty('--tilt-x', (-py * 8).toFixed(2) + 'deg')
      card.style.setProperty('--tilt-y', (px * 8).toFixed(2) + 'deg')
    })
    card.addEventListener('mouseleave', () => {
      card.classList.remove('tilting')
      card.style.removeProperty('--tilt-x')
      card.style.removeProperty('--tilt-y')
    })
  })

  // Лёгкий параллакс логотипа в hero за курсором
  const heroLogo = document.querySelector('.hero__logo')
  const hero = document.querySelector('.hero')
  if (heroLogo && hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      heroLogo.style.translate = px * 14 + 'px ' + py * 14 + 'px'
    })
    hero.addEventListener('mouseleave', () => {
      heroLogo.style.translate = ''
    })
  }
}

// Декоративные плавающие кубы
document.querySelectorAll('.cube-field').forEach((field) => {
  const count = parseInt(field.dataset.count || '12', 10)
  for (let i = 0; i < count; i++) {
    const cube = document.createElement('span')
    cube.className = 'cube'
    const size = 10 + Math.random() * 26
    cube.style.width = size + 'px'
    cube.style.height = size + 'px'
    cube.style.left = Math.random() * 100 + '%'
    cube.style.top = Math.random() * 100 + '%'
    cube.style.animationDelay = -(Math.random() * 8) + 's'
    cube.style.animationDuration = 6 + Math.random() * 6 + 's'
    cube.style.opacity = String(0.3 + Math.random() * 0.5)
    field.appendChild(cube)
  }
})

// Копирование IP сервера
document.querySelectorAll('[data-copy-ip]').forEach((btn) => {
  let resetTimer
  btn.addEventListener('click', async () => {
    const ip = btn.dataset.copyIp
    try {
      await navigator.clipboard.writeText(ip)
    } catch {
      // Фолбэк для старых браузеров
      const ta = document.createElement('textarea')
      ta.value = ip
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    btn.classList.add('copied')
    const hint = btn.querySelector('.server-ip__hint')
    if (hint) hint.textContent = 'Скопировано!'
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      btn.classList.remove('copied')
      if (hint) hint.textContent = 'Нажми, чтобы скопировать'
    }, 2000)
  })
})

// ============ Статус Discord-ботов ============
// Настройка — в файле status-config.js
;(function initBotStatus() {
  const grid = document.querySelector('[data-bot-status-grid]')
  const updatedEl = document.querySelector('[data-status-updated]')
  const config = window.BOT_STATUS_CONFIG

  if (!grid || !config || !Array.isArray(config.bots)) return

  const STATE = {
    checking: {
      cls: 'is-checking',
      label: 'Проверка…',
      note: 'Получаем статус бота',
    },
    online: {
      cls: 'is-online',
      label: 'Онлайн',
      note: 'Бот работает исправно',
    },
    offline: {
      cls: 'is-offline',
      label: 'Оффлайн',
      note: 'Технические работы — бот скоро вернётся',
    },
  }

  // Создаём карточки ботов
  const cards = config.bots.map((bot) => {
    const card = document.createElement('article')
    card.className = 'status-card reveal is-checking'
    card.innerHTML =
      '<div class="status-card__icon" aria-hidden="true">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>' +
      '</div>' +
      '<div class="status-card__body">' +
      '<h3 class="status-card__name"></h3>' +
      '<p class="status-card__note"></p>' +
      '</div>' +
      '<div class="status-card__badge">' +
      '<span class="status-card__dot" aria-hidden="true"></span>' +
      '<span class="status-card__state"></span>' +
      '</div>'
    card.querySelector('.status-card__name').textContent = bot.name
    grid.appendChild(card)
    return card
  })

  // Каскадное появление карточек
  cards.forEach((card, idx) => {
    card.style.setProperty('--reveal-delay', idx * 0.1 + 's')
  })
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    cards.forEach((card) => obs.observe(card))
  } else {
    cards.forEach((card) => card.classList.add('visible'))
  }

  function setCardState(card, stateKey, customNote) {
    const state = STATE[stateKey]
    card.classList.remove('is-checking', 'is-online', 'is-offline')
    card.classList.add(state.cls)
    card.querySelector('.status-card__state').textContent = state.label
    card.querySelector('.status-card__note').textContent = customNote || state.note
  }

  cards.forEach((card) => setCardState(card, 'checking'))

  const guildId = String(config.guildId || '').trim()
  const guildIdValid = /^\d{17,20}$/.test(guildId)

  if (!guildIdValid) {
    // ID сервера ещё не вставлен в status-config.js
    cards.forEach((card) =>
      setCardState(card, 'offline', 'Ожидает настройки: вставьте ID сервера в status-config.js')
    )
    if (updatedEl) {
      updatedEl.textContent = 'Статус не настроен — укажите ID Discord-сервера в файле status-config.js'
    }
    return
  }

  async function checkStatus() {
    try {
      const res = await fetch('https://discord.com/api/guilds/' + guildId + '/widget.json', {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('widget disabled or wrong guild id: ' + res.status)
      const data = await res.json()
      const onlineIds = new Set((data.members || []).map((m) => m.id))

      config.bots.forEach((bot, idx) => {
        // В виджете у участников могут быть анонимные ID, поэтому
        // дополнительно сверяем по имени бота
        const onlineById = onlineIds.has(bot.id)
        const onlineByName = (data.members || []).some(
          (m) => (m.username || '').toLowerCase() === bot.name.toLowerCase()
        )
        setCardState(cards[idx], onlineById || onlineByName ? 'online' : 'offline')
      })

      if (updatedEl) {
        const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        updatedEl.textContent = 'Обновлено в ' + time + ' · проверка каждые ' + Math.round((config.refreshInterval || 60000) / 1000) + ' сек.'
      }
    } catch {
      // Виджет выключен, неверный ID или Discord недоступен
      cards.forEach((card) =>
        setCardState(card, 'offline', 'Не удалось проверить статус — включите виджет сервера в Discord')
      )
      if (updatedEl) {
        updatedEl.textContent = 'Ошибка проверки: убедитесь, что виджет сервера включён (Настройки сервера → Виджет)'
      }
    }
  }

  checkStatus()
  setInterval(checkStatus, Math.max(config.refreshInterval || 60000, 15000))
})()

// Актуальный год в футере
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
