import { cn } from "@/lib/utils"
import { Metadata } from "next"

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Sign in page',
  description: 'Sign in To User Account',
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default CartLayout