"use client"

import { cn } from "@/lib/utils"
import { GridStack } from "@/components/layout"
import SideNavBar from "@/components/nav/sideNavBar"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import MotionSlide from "@/components/framerMotion/MotionSlide"
import { motion } from "framer-motion"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Design = ({ children, className }: Props) => {
  const nav = useSelector((state: RootState) => state.dashboard.dashboardNav)

  return (
    <div
      className={cn('', className)}
    >
      <GridStack className='grid-cols-11'>
        <MotionSlide left={-200} delay={0} className={`hidden lg:flex ${nav ? "col-span-2" : "lg:hidden"}`}>
        <SideNavBar nav={nav} className="w-full" />
        </MotionSlide>
        <div className={`duration-500 transition-all col-span-full ${nav ? "lg:col-span-9" : "lg:col-span-11"}`}>
          {children}
        </div>
      </GridStack>
    </div>
  )
}

export default Design