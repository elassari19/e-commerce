'use client'
import React from "react"
import { easeIn, easeInOut, motion } from "framer-motion"
import { cn } from "@/lib/utils"


interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  top?: string | number
  bottom?: string | number
  left?: string | number
  right?: string | number
  delay?: undefined | number
}

const MotionSlide = ({ children, className, top, bottom, left, right, delay }: Props) => {
  const yslide = top ? -100 : bottom ? 100 : 0
  const xslide = left ? -100 : right ? 100 : 0

  return (
    <motion.div
      initial={{ y: yslide, x: xslide }}
      animate={{ y: 0, x: 0 }}
      transition={{ duration: .5, delay: delay ||.2, ease: "easeInOut", type: "spring", damping: 12 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}

export default MotionSlide