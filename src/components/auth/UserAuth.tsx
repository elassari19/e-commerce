import SignIn from "./SignIn"
import DropdownMenu from "../DropdownMenu"
import MotionScale from "../framerMotion/MotionScale"
import { userOptions } from "../../helpers/constants/Categories"
import Link from "next/link"
import Typography from "../layout/typography"
import SignOut from "./SignOut"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pathname: string
  session: any
}

const UserAuth = ({ pathname, session }: Props) => {

  return <>
    {
      !session
      ? (
        <SignIn />
      )
      : (
        <DropdownMenu
          className="p-2 w-60 rounded-xl"
          menuTrigger={
            <MotionScale>
              <div className="h-8 w-8 bg-primary rounded-full" />
            </MotionScale>
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
                  <Icon size={25} />
                  <Typography
                    className={`
                      text-secondary text-sm
                      ${pathname === href && "text-primary font-bold"}
                      ${pathname === "/" && href === "/" && "text-primary font-bold"}
                    `}
                  >{title}</Typography>
                </Link>
              )),
              <SignOut />
            ]
          }
        />
      )
    }
  </>
}

export default UserAuth