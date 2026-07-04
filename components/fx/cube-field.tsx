'use client'

import { useMemo } from 'react'

type Cube = {
  left: number
  top: number
  size: number
  duration: number
  delay: number
  opacity: number
  rotate: number
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 19) % 2147483647
    return (s % 1000) / 1000
  }
}

export function CubeField({ count = 18 }: { count?: number }) {
  const cubes = useMemo<Cube[]>(() => {
    const rand = seededRandom(42)
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 8 + rand() * 26,
      duration: 7 + rand() * 9,
      delay: rand() * -14,
      opacity: 0.08 + rand() * 0.28,
      rotate: rand() * 45,
    }))
  }, [count])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {cubes.map((cube, i) => (
        <span
          key={i}
          className="animate-cube-float absolute block rounded-[3px] border border-primary/40 bg-primary/20"
          style={{
            left: `${cube.left}%`,
            top: `${cube.top}%`,
            width: cube.size,
            height: cube.size,
            opacity: cube.opacity,
            animationDuration: `${cube.duration}s`,
            animationDelay: `${cube.delay}s`,
            transform: `rotate(${cube.rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}
