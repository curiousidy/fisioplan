'use client'
import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-neutral-700">{label}</label>
        )}
        <select
          ref={ref}
          className={[
            'h-9 border rounded-md px-3 w-full bg-white text-neutral-900 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            'transition-colors duration-150',
            error
              ? 'border-danger-500 focus:ring-danger-500'
              : 'border-neutral-300 focus:border-primary-500',
            className ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-danger-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
export default Select
