import { cn } from "@/lib/utils"
import { Metadata } from "next"

interface Props {
  children: React.ReactNode,
}

export const metadata: Metadata = {
  title: 'Create new account',
  description: 'This page for create new account',
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default CartLayout