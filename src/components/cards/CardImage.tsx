"use client"

import { X } from "lucide-react"
import Image from "next/image"

interface Props {
  path: string
  onClick: React.MouseEventHandler<SVGSVGElement> | undefined
}

const CardImage = ({ path, onClick }: Props) => {
  return (
    <div className="relative w-fit hover:scale-[125%] hover:z-10 transition-all duration-200 hover:delay-200">
    <Image
      src={path}
      alt={"item"} width={40} height={40}
      className="h-20 w-20 border border-primary rounded-md"
    />
    <X
      className="absolute -top-1 -right-1 bg-destructive text-white cursor-pointer rounded-sm"
      size={14}
      onClick={onClick}
    />
  </div>

  )
}

export default CardImage