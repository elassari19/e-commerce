"use client"

import { cn } from "@/lib/utils"
import { GridStack } from "@/components/layout"
import SideNavBar from "@/components/nav/sideNavBar"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import MotionSlide from "@/components/framerMotion/MotionSlide"
import { usePathname } from "next/navigation"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Design = ({ children, className }: Props) => {
  const nav = useSelector((state: RootState) => state.dashboard.dashboardNav)
  const pathname = usePathname()

  return (
    <div
      className={cn('', className)}
    >
      <GridStack className='grid-cols-12'>
        <SideNavBar nav={nav} className={`hidden lg:flex ${nav ? "col-span-3" : "lg:hidden"}`} />

        <MotionSlide className={`col-span-full ${nav ? "lg:col-span-9" : "lg:col-span-12"}`}>
          {children}
        </MotionSlide>
      </GridStack>
    </div>
  )
}

export default Design