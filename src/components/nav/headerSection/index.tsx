"use client"

import { Bell, MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Brand from "../../atoms/Brand"
import { RowStack } from "../../layout"
import ReduxToggleItem from "../../reduxtHandler/ReduxToggleItem"
import MotionScale from "../../framerMotion/MotionScale"
import UserAuth from "../../auth/UserAuth"
import { useSession } from "next-auth/react"
import MenuLink from "../../atoms/MenuLink"
import MenuList from "../MenuList"
import DialogNav from "../../DialogNav"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const index = ({  }: Props) => {

  const pathname = usePathname()
  const { data } = useSession()

  return <header className="bg-foreground p-4 border-b px-0 md:px-4 lg:px-12">
    <RowStack className="justify-between items-center gap-4 lg:gap-8">

      {/* menu small, medium screens */}
      <div className="flex-1 lg:hidden">
        <DialogNav
          className="h-screen overflow-y-auto p-4 w-80 top-0 left-0 translate-x-[0%] translate-y-[0%] "
          dialogTrigger={<MenuIcon size={24} className="text-primary" />}
          dialogHeader={<Brand className="border-b" />}
        ><MenuList /></DialogNav>
      </div>
      
      {/* menu for >= large */}
      <ReduxToggleItem
        sliceActionType="dashboard/dashboardHandler"
        sliceStateName="dashboardNav"
        storeName="dashboard"
        className="hidden lg:block flex-1"
      >
        <MotionScale>
          <MenuIcon size={24} className="text-primary" />
        </MotionScale>
      </ReduxToggleItem>

      {/* notification */}
      <MotionScale>
        <Bell fill="text-primary" />
      </MotionScale>

      {/* user avatar */}
      <UserAuth pathname={pathname} session={data?.user?.email} />
    </RowStack>
  </header>
}

export default index