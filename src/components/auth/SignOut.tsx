"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import Typography from "../layout/typography"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const SignOut = ({  }: Props) => {
  return (
    <Button
      onClick={() => signOut()}
      variant='ghost' size='sm'
      className="w-full justify-start gap-2"
    >
      <LogOut size={24} /> <Typography className="text-secondary">Sign Out</Typography>
    </Button>
  )
}

export default SignOut