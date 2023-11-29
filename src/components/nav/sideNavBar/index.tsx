import { cn } from "@/lib/utils"
import { ColStack } from "../../layout"
import Brand from "../../atoms/Brand"
import MenuList from "../MenuList"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nav?: boolean
}

const index = ({ className, nav }: Props) => {
  return (
    <ColStack className={cn("p-2 gap-2 bg-foreground min-h-screen", className)}>
      <Brand nav={nav} />
      <MenuList nav={nav} />
    </ColStack>
  )
}

export default index