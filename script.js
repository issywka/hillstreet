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

// Актуальный год в футере
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
