"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Typography from "../layout/typography"
import { cn } from "../../lib/utils"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  href: string,
  Icon: any
  title: string
  isNav?: boolean
}

const MenuLink = ({ className, href, Icon, title, isNav=true }: Props) => {
  const pathname = usePathname()
  return (
    <Link
      className={cn(`
        p-2 cursor-pointer flex items-center gap-2
        ${pathname === href && "text-primary"}
        ${pathname === "/" && href === "/" && "text-primary"}
      `, className)}
      href={href}
    >
      <Icon size={25} />
      {/* <motion.div animate={{ x: isNav ? 0 : -200 }} initial={{ x: -200 }} exit={{ x: 0 }}> */}
        <Typography
          className={`
            text-secondary text-sm
            ${pathname === href && "text-primary font-bold"}
            ${pathname === "/" && href === "/" && "text-primary font-bold"}
            ${!isNav && "hidden"}
          `}
        >{title}</Typography>
      {/* </motion.div> */}
    </Link>
  )
}

export default MenuLink