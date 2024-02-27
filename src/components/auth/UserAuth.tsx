'use client'

import SignIn from "./SignIn"
import SignOut from "./SignOut"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "../../lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuth = ({ className }: Props) => {
  const session = useSession()

  return <>
    {
      !session.data
      ? (
        <SignIn className={cn(className)} />
      )
      : <SignOut className={cn(className)} />
    }
  </>
}

export default UserAuth