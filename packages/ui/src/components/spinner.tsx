import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@merge/ui/lib/utils"

const Spinner = React.memo(function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
})

export { Spinner }
