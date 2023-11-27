"use client"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  header: React.ReactNode
  contents: React.ReactNode
  position?: "left" | "center" | "right" | ""
}

export const NavigationModal = ({ header, contents, position="", className }: Props) => {
  const value = position=="left"?"left-6":position=="center"?"left-[46%]":"right-6"
  return (
    <NavigationMenu className={cn("bg-white rounded-2xl", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{header}</NavigationMenuTrigger>
          <NavigationMenuContent className={cn("")}>
            <div className={`w-6 h-6 bg-white absolute z-[1] top-[-0.4rem] rotate-45 ${value}`} />
            {contents}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
