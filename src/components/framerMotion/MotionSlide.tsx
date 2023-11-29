import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"


interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  scale?: boolean
}

const MotionSlide = ({ children, className }: Props) => {
  return (
    <motion.div
      transition={{ duration: .2, ease: "easeInOut" }}
      layout
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}

export default MotionSlide