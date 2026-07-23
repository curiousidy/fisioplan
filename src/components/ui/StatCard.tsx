// Server Component — sin 'use client'
import { type ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: number | string
  icon?: ReactNode
  colorClass?: string
}

export default function StatCard({
  label,
  value,
  icon,
  colorClass = 'text-primary-600',
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 flex items-center gap-4">
      {icon && (
        <div className={`text-3xl ${colorClass}`}>{icon}</div>
      )}
      <div>
        <p className="text-neutral-500 text-sm font-medium">{label}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
      </div>
    </div>
  )
}
