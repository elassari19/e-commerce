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
    <div className="p-4 py-8">
    {
      menuOptions.map((item , idx) => {
        if(idx == 1) return (
          <AccordionTree
            accordionTrigger={
              <MenuLink Icon={Aperture} isNav={nav} title="Catalog" href="" />
            }
            accordionContent={catalog.map((item, idx) => (<MenuLink key={idx} {...item} className="py-1" />))}
          />
        )
        return (
          <MotionScale key={idx}>
            <MenuLink {...item} isNav={nav} />
          </MotionScale>
      )})
    }
    </div>
  )
}

export default MenuList