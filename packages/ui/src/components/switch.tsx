"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@merge/ui/lib/utils"

const Switch = React.memo(function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <div className="relative inline-flex">
      <SwitchPrimitive.Root
        data-slot="switch"
        className={cn(
          "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 z-10",
          className
        )}
        aria-label={props['aria-label'] || 'Toggle switch'}
        aria-checked={props.checked}
        aria-disabled={props.disabled}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>
      {/* WCAG 2.1 Level AA: 44x44px minimum touch target */}
      <span className="absolute inset-0 -m-3 min-w-[44px] min-h-[44px] pointer-events-none" aria-hidden="true" />
    </div>
  )
})

export { Switch }
