"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import Typography from "../layout/typography"
import { cn } from "../../lib/utils"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const SignOut = ({ className }: Props) => {
  return (
    <Button
      onClick={() => signOut()}
      size='sm'
      className={cn("w-full justify-start gap-2")}
    >
      <LogOut size={24} className={cn("", className)} /> <Typography className={cn("text-secondary", className)}>Sign Out</Typography>
    </Button>
  )
}

export default SignOut