import React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const HeadingVariants = cva(
  "text-black dark:text-white",
  {
    variants: {
      variant: {
        default: "text-black dark:text-white",
        primary: "text-white",
        secondary: "text-secondary",
        gray: "text-gray-400",
        distructive: "text-destructive",
        gold: "text-yellow-400"
      },
      size: {
        default: "text-3xl",
        xxs: "text-lg",
        xs: "text-xl",
        sm: "text-2xl",
        lg: "text-4xl",
        xl: "text-5xl",
        "2xl": "text-6xl",
        "3xl": "text-7xl",
      },
      font: {
        default: "font-normal",
        thin: "font-thin",
        xlight: "font-extralight",
        light: "font-light",
        semib: "font-semibold",
        bold: "font-bold",
        xbold: "font-extrabold",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      font: "default"
    }
  }
)

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement>,
  VariantProps<typeof HeadingVariants> {
  children: React.ReactNode
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  ellipsis?: boolean
  center?: boolean
}

const Typography = ({ children, heading="span", variant, size, font, ellipsis, center, className }: Props) => {
  return React.createElement(
    heading,
    {
      className: cn(`
        ${ellipsis && "overflow-hidden text-ellipsis whitespace-nowrap"}
        ${center && "w-full text-center"}
      `,
      HeadingVariants({ variant, size, font }), className)
    },
    children
  )
}

export default Typography