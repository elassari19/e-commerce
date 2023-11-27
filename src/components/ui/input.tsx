import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import UseMemo from "../layout/UseMemo"

const InputVariants = cva(
  "flex flex-row gap-4 items-center justify-center p-4 rounded-md text-xl font-medium border outline-none",
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
      <UseMemo dependencies={[props.value]}>
        {/* input section */}
        <div
          className={cn(InputVariants({ variant, className }))}
        >
          {preIcon}
          <input
            className="flex-1 h-8 w-full bg-inherit text-xl placeholder:text-slate-500 outline-none"
            ref={ref}
            {...props}
          />
          {children}
          {sufIcon}
        </div>
      </UseMemo>
    )
  }
)
Input.displayName = "Input"

export { Input }
