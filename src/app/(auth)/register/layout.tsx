import { cn } from "@/lib/utils"
import { Metadata } from "next"

interface Props {
  children: React.ReactNode,
}

export const metadata: Metadata = {
  title: 'Register new account',
  description: 'Create a new account',
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default CartLayout