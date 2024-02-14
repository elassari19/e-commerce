'use client'

import SignIn from "./SignIn"
import DropdownMenu from "../DropdownMenu"
import { userOptions } from "@/helpers/constants/Categories"
import Link from "next/link"
import Typography from "../layout/typography"
import SignOut from "./SignOut"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { User2 } from "lucide-react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuth = ({  }: Props) => {
  const pathname = usePathname()
  const session = useSession()

  return <>
    {
      !session.data
      ? (
        <SignIn />
      )
      : (
        <DropdownMenu
          className="px-2 w-60 rounded-xl"
          menuTrigger={
            <div className="font-bold flex items-center gap-2">
              <User2 /> <span className="md:hidden">Profile</span>
            </div>
          }
          menuContent={
            [
              ...userOptions.map(({ Icon, href, title }, idx) => (
                <Link
                  key={idx} href={href}
                  className={`
                    px-2 cursor-pointer flex items-center gap-2
                    ${pathname === href && "text-primary"}
                    ${pathname === "/" && href === "/" && "text-primary"}
                  `}
                >
                  <Icon size={22} />
                  <Typography
                    className={`
                      text-secondary text-sm
                      ${pathname === href && "text-primary font-bold"}
                      ${pathname === "/" && href === "/" && "text-primary font-bold"}
                    `}
                  >{title}</Typography>
                </Link>
              )),
              <SignOut key={"h-8 w-8 bg-primary rounded-full"} />
            ]
          }
        />
      )
    }
  </>
}

export default UserAuth