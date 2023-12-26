import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const buttonVariants = cva(
  "w-full inline-flex items-center justify-center gap-2 text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-foreground hover:bg-background",
        primary: "bg-primary-foreground/80 hover:bg-primary text-slate-50",
        secondary:
          "bg-secondary text-white hover:bg-secondary-200 dark:bg-slate-800",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90",
        "outline-destructive":
          "border border-destructive/70 text-destructive/70 bg-foreground hover:bg-background hover:border-destructive hover:text-destructive",
        outline:
          "border border-slate-500 text-slate-500 bg-foreground hover:bg-background hover:border-black hover:text-black",
      },
      size: {
        default: "h-12",
        sm: "h-8 px-2",
        lg: "h-14 text-lg",
        icon: "h-10 w-28",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean,
  isLoading?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, href, ...props }, ref) => {

    // const { pending } = useFormStatus()
    // convert from button to anchor tag
    if(href) return React.createElement(
      Link,
      {
        href,
        className: cn(buttonVariants({ variant, size, className })),
      },
      children
    )

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        type="button"
        ref={ref}
        {...props}
      >
        {children}
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
