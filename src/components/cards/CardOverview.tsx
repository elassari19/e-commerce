import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const Variants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-black dark:text-white",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>,
VariantProps<typeof Variants> {}

const CardOverview = ({ children, className, variant, size }: Props) => {
  return (
    <div
      className={cn('',Variants({ variant, size }), className)}
    >
      {children}
    </div>
  )
}

export default CardOverview