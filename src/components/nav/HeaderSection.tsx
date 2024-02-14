"use client"

import { Bell, MenuIcon } from "lucide-react"
import Brand from "../atoms/Brand"
import { RowStack } from "../layout"
import ReduxToggleItem from "../reduxtHandler/ReduxToggleItem"
import MotionSlide from "../framerMotion/MotionSlide"
import UserAuth from "../auth/UserAuth"
import MenuList from "./MenuList"
import DialogNav from "../DialogNav"
import { motion } from "framer-motion"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const HeaderSection = ({  }: Props) => {

  return <motion.header layout className="bg-foreground p-4 border-b px-2 md:px-4 lg:px-12">
    <RowStack className="justify-between items-center gap-4 lg:gap-8">

      {/* menu small, medium screens */}
      <div className="flex-1 lg:hidden">
        <DialogNav
          className="h-screen overflow-y-auto p-4 w-80 top-0 left-0 translate-x-[0%] translate-y-[0%] "
          dialogTrigger={<MenuIcon size={24} className="text-primary" />}
          dialogHeader={<Brand className="border-b" />}
          dialogContent={<MenuList />}
        />
      </div>
      
      {/* menu for >= large */}
      <ReduxToggleItem
        sliceActionType="dashboard/dashboardHandler"
        sliceStateName="dashboardNav"
        storeName="dashboard"
        className="hidden lg:block flex-1"
      >
        <MotionSlide top="100">
          <MenuIcon size={24} className="text-primary" />
        </MotionSlide>
      </ReduxToggleItem>

      {/* notification */}
      <MotionSlide top="100">
        <Bell fill="text-primary" />
      </MotionSlide>

      {/* user avatar */}
      <UserAuth />
    </RowStack>
  </motion.header>
}

export default HeaderSection
