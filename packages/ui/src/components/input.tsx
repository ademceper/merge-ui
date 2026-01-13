import * as React from "react"

import { cn } from "@merge/ui/lib/utils"

// Safe input types that don't pose security risks
const SAFE_INPUT_TYPES = [
  'text',
  'email',
  'password',
  'number',
  'tel',
  'url',
  'search',
  'date',
  'time',
  'datetime-local',
  'month',
  'week',
  'color',
  'range',
] as const

type SafeInputType = typeof SAFE_INPUT_TYPES[number]

type InputProps = Omit<React.ComponentProps<"input">, "type"> & {
  type?: SafeInputType
}

const Input = React.memo(function Input({ className, type = 'text', ...props }: InputProps) {
  // Validate and sanitize input type
  const safeType = React.useMemo(
    () => SAFE_INPUT_TYPES.includes(type as SafeInputType) ? type : 'text',
    [type]
  )

  React.useEffect(() => {
    if (type && !SAFE_INPUT_TYPES.includes(type as SafeInputType)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Input] Unsafe input type "${type}" was changed to "text"`)
      }
    }
  }, [type])

  return (
    <input
      type={safeType}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      aria-label={props['aria-label'] || (props.placeholder ? undefined : 'Input field')}
      aria-required={props.required}
      aria-disabled={props.disabled}
      {...props}
    />
  )
})

export { Input }
export type { InputProps, SafeInputType }