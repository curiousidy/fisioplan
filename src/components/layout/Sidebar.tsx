'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiUsers, FiUser, FiCalendar, FiHome } from '@/lib/icons'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/physios', label: 'Fisioterapeutas', icon: FiUsers },
  { href: '/clients', label: 'Clientes', icon: FiUser },
  { href: '/quotes', label: 'Citas', icon: FiCalendar },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    // hidden en mobile, flex en desktop (md+)
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-sidebar-bg">
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-6 border-b border-primary-800">
        <span className="text-white font-bold text-lg tracking-tight">FisioPlan</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
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
      </nav>
    </aside>
  )
}
