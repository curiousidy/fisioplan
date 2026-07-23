'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiHome, FiUsers, FiUser, FiCalendar } from '@/lib/icons'

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: FiHome },
  { href: '/physios', label: 'Fisioterapeutas', icon: FiUsers },
  { href: '/clients', label: 'Clientes', icon: FiUser },
  { href: '/quotes', label: 'Citas', icon: FiCalendar },
]

const sectionLabels: Record<string, string> = {
  '/dashboard': 'Inicio',
  '/physios': 'Fisioterapeutas',
  '/clients': 'Clientes',
  '/quotes': 'Citas',
}

function getCurrentLabel(pathname: string): string {
  for (const [prefix, label] of Object.entries(sectionLabels)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return label
    }
  }
  return 'FisioPlan'
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Cerrar menú al navegar
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Cerrar menú con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const currentLabel = getCurrentLabel(pathname)

  return (
    // Visible solo en mobile (oculto en md+)
    <header className="md:hidden flex items-center justify-between h-14 px-4 bg-sidebar-bg border-b border-primary-800">
      {/* Título de sección actual */}
      <span className="text-white font-semibold text-base">{currentLabel}</span>

      {/* Botón hamburger */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="p-1.5 rounded-md text-sidebar-text hover:text-white hover:bg-primary-800 transition-colors"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Overlay drawer mobile */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav
            className="fixed top-0 left-0 z-50 h-full w-64 bg-sidebar-bg flex flex-col shadow-xl"
            role="navigation"
            aria-label="Menú principal"
          >
            {/* Header del drawer */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-primary-800">
              <span className="text-white font-bold text-lg">FisioPlan</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-md text-sidebar-text hover:text-white hover:bg-primary-800 transition-colors"
                aria-label="Cerrar menú"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-active text-white'
                        : 'text-sidebar-text hover:bg-primary-800 hover:text-white',
                    ].join(' ')}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
