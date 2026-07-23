'use client'

import { ButtonHTMLAttributes } from 'react'
import { FiLoader } from '@/lib/icons'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary:
    'border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 focus:ring-neutral-300',
  danger:
    'bg-danger-500 text-white hover:bg-red-600 focus:ring-danger-500',
  ghost:
    'text-neutral-600 bg-transparent hover:bg-neutral-100 focus:ring-neutral-300',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'transition-colors duration-150',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && <FiLoader className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}
