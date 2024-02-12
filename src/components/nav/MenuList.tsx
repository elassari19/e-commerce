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
                <div className="w-full py-5 px-2 -z-0 group hover:text-primary flex gap-2 items-center">
                  <Aperture size={25} />
                  <span className="text-secondary text-sm group-hover:text-primary">Catalog</span>
                </div>
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