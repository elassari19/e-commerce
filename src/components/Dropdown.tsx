import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { IoIosArrowDown } from '@/assets/icons'
import { menuType } from "@/types/menu"
import Image from "next/image"

interface Props {
  title: string,
  options: menuType[]
}

const Dropdown = ({ title, options }: Props) => {
  return <DropdownMenu >
  <DropdownMenuTrigger className='px-2 outline-none row-stack gap-1'>
    <span>{title}</span>
    <IoIosArrowDown />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="mt-4">
    {
      options.map(({ href, src, name }, idx) => {
        return (
          <DropdownMenuItem key={idx}>
            <Link
              className="row-stack gap-4"
              href={href}
            >
              <Image src={src} alt={name} />
              <p className="font-midum">{name}</p>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuItem>
        )
      })
    }
  </DropdownMenuContent>
</DropdownMenu>

}

export default Dropdown