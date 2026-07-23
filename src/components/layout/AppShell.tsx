// Server Component — sin 'use client'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar fijo en desktop (md+), oculto en mobile */}
      <Sidebar />
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar visible solo en mobile */}
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
