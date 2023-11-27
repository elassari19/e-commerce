import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-primary-foreground hover:bg-primary",
        secondary:
          "bg-secondary text-white hover:bg-secondary-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-inherit hover:bg-primary-forground/30 hover:text-primary-forground/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        ghost: "border-0 text-gray-400 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        dark: "text-white bg-black"
      },
      size: {
        default: "h-20 px-4 py-2",
        sm: "h-12 rounded-md px-6",
        lg: "h-24 rounded-md px-8 text-lg",
        icon: "h-36 w-28",
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
