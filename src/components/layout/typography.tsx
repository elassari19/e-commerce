import React from "react"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const Variants = cva(
  "text-md",
  {
    variants: {
      variant: {
        default: "text-md",
        span: "text-md",
        p: "text-md",
        h6: "text-xs",
        h5: "text-sm",
        h4: "text-lg",
        h3: "text-xl",
        h2: "text-2xl",
        h1: "text-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> ,
VariantProps<typeof Variants>{
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  ellipsis?: boolean
  center?: boolean
}

const Typography = ({ children, heading="span", variant=heading, ellipsis, center, className }: Props) => {
  return React.createElement(
    heading,
    {
      className: cn(`
        ${ellipsis && "overflow-hidden text-ellipsis whitespace-nowrap"}
        ${center && "w-full text-center"}
      `, Variants({ variant }), className)
    },
    children
  )
}

export default Typography