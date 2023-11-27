import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { menuType } from "@/types/menu"
import Image from "next/image"

interface Props {
  menuTrigger: React.ReactNode,
  menuContent: React.ReactNode[]
}

const Dropdown = ({ menuTrigger, menuContent }: Props) => {
  return <DropdownMenu >
  <DropdownMenuTrigger className='px-2 outline-none row-stack gap-1'>
    {menuTrigger}
  </DropdownMenuTrigger>
  <DropdownMenuContent className="mt-4">
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