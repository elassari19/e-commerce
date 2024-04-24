import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const InputVariants = cva(
  "flex border border-black-300 flex-row gap-4 items-center justify-center p-3 py-1 rounded-md text-sm font-medium border outline-none",
  {
    variants: {
      variant: {
        default: "focus:border-black bg-white",
        secondary: "border-white focus:border-white-200",
        ghost: "border-0",
        destructive: "border-red-800",
        success: "border-green-200 focus:border-green-800"
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof InputVariants> {
    preIcon?: any,
    sufIcon?: any,
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, variant, preIcon, sufIcon, ...props }, ref) => {

    return (
        <div
          className={cn(InputVariants({ variant, className }))}
        >
          <div className="flex gap-1 items-center flex-1">
            {preIcon}
            <input
              className="flex-1 h-8 w-full bg-inherit placeholder:text-slate-500 outline-none"
              ref={ref}
              {...props}
            />
          </div>
          {children}
          {sufIcon}
        </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
