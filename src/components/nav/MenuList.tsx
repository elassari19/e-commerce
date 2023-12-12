import { Aperture } from "lucide-react"
import { catalog, menuOptions } from "../../helpers/constants/Categories"
import AccordionTree from "../AccordionTree"
import MenuLink from "../atoms/MenuLink"
import MotionScale from "../framerMotion/MotionScale"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nav?: boolean
}

const MenuList = ({ nav }: Props) => {
  return (
    <ul className="p-4 py-8">
    {
      menuOptions.map((item , idx) => {
        if(idx == 1) return (
          <li key={idx}>
              <AccordionTree
              accordionTrigger={
                <MenuLink Icon={Aperture} isNav={nav} title="Catalog" href="" className="py-5" />
              }
              accordionContent={catalog.map((item, idx) => (<MenuLink key={idx} {...item} href={item.href} className="py-1" />))}
            />
          </li>
        )
        return (
          <li key={idx}>
            <MotionScale>
              <MenuLink {...item} isNav={nav} className="py-5" />
            </MotionScale>
          </li>
      )})
    }
    </ul>
  )
}

export default MenuList