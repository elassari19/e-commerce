"use client"

import { Bell, MenuIcon } from "lucide-react"
import Brand from "../atoms/Brand"
import ReduxToggleItem from "../reduxtHandler/ReduxToggleItem"
import MotionSlide from "../framerMotion/MotionSlide"
import UserAuth from "../auth/UserAuth"
import MenuList from "./MenuList"
import DialogNav from "../DialogNav"
import { motion } from "framer-motion"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const HeaderSection = ({  }: Props) => {

  return <motion.header layout className="w-full bg-foreground p-4 border-b px-2 md:px-4 lg:px-12">
    <div className="flex justify-between items-center gap-4 lg:gap-8">

      {/* menu small, medium screens */}
      <div className="lg:hidden">
        <DialogNav
          className="h-screen overflow-y-auto p-4 w-80 top-0 transition ease-in-out duration-300 left-0 translate-x-[0%] translate-y-[0%] "
          dialogTrigger={<MenuIcon size={24} className="text-primary" />}
          dialogHeader={<Brand className="border-b" />}
          dialogContent={<MenuList className="cursor-pointer" />}
        />
      </div>
      
      {/* menu for >= large */}
      <ReduxToggleItem
        sliceActionType="dashboard/dashboardHandler"
        sliceStateName="dashboardNav"
        storeName="dashboard"
        className="hidden lg:block flex-1 cursor-pointer"
      >
        <MotionSlide top="100">
          <MenuIcon size={24} className="text-primary" />
        </MotionSlide>
      </ReduxToggleItem>

      {/* notification */}
      <div className="flex gap-4 w-40">
        <MotionSlide top="100" className="text-primary cursor-pointer border">
          <Bell fill="text-primary cursor-pointer" />
        </MotionSlide>

        {/* user avatar */}
        <UserAuth />
      </div>
    </div>
  </motion.header>
}

export default HeaderSection
