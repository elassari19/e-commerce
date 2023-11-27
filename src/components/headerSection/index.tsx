import { MenuIcon } from "lucide-react"
import { menuOptions } from "@/helpers/constants/Categories"
import DropdownMenu from "../DropdownMenu"
import Link from "next/link"
import Typography from "../layout/typography"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  param?: string
}

const index = ({ param="/" }: Props) => {

  return <header className="bg-foreground p-4 border-b">
    <div className="block lg:hidden">
      <DropdownMenu
        menuTrigger={<MenuIcon size={24} /> }
        menuContent={
          menuOptions.map(({ Icon, href, title }, idx) => (
            <Link
              key={idx} href={href}
                className={`
                  p-2 cursor-pointer flex items-center gap-2
                  ${param === href && "text-primary"}
                  ${param === "/" && href === "/" && "text-primary"}
                `}
              >
              <Icon size={25} />
              <Typography
                className={`
                  text-secondary text-sm
                  ${param === href && "text-primary"}
                  ${param === "/" && href === "/" && "text-primary"}
                `}
              >{title}</Typography>
            </Link>
          ))
        }
      />
    </div>
  </header>
}

export default index