'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className = '', ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        {...props}
        className={[
          'border rounded-md px-3 py-2 w-full text-neutral-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'placeholder:text-neutral-400',
          'transition-colors duration-150',
          error
            ? 'border-danger-500 focus:ring-danger-500'
            : 'border-neutral-300 focus:border-primary-500',
          props.disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : 'bg-white',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error && (
        <p className="text-danger-500 text-sm" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-neutral-400 text-sm">{hint}</p>
      )}
    </div>
  )
})

export default Input
