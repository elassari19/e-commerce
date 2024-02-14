import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "../lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  menuTrigger: React.ReactNode,
  menuHeader?: React.ReactNode,
  menuContent: React.ReactNode[]
}

const Dropdown = ({ className, menuTrigger, menuHeader, menuContent }: Props) => {
  return <DropdownMenu>
  <DropdownMenuTrigger className='outline-none row-stack gap-1'>
    {menuTrigger}
  </DropdownMenuTrigger>
  <DropdownMenuContent className={cn("mt-4", className)}>
    {menuHeader}
    {
      menuContent.map((item, idx) => {
        return (
          <DropdownMenuItem key={idx}>
            {item}
          </DropdownMenuItem>
        )
      })
    }
  </DropdownMenuContent>
</DropdownMenu>

}

export default Dropdown