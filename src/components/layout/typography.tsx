import React from "react"
import { cn } from "@/lib/utils"


interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  ellipsis?: boolean
  center?: boolean
}

const Typography = ({ children, heading="span", ellipsis, center, className }: Props) => {
  return React.createElement(
    heading,
    {
      className: cn(`
        ${ellipsis && "overflow-hidden text-ellipsis whitespace-nowrap"}
        ${center && "w-full text-center"}
      `, className)
    },
    children
  )
}

export default Typography