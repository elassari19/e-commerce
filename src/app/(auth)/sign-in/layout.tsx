import { cn } from "@/lib/utils"
import { Metadata } from "next"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Sign in page',
  description: 'Sign in To User Account',
}

const CartLayout = ({ children, className }: Props) => {
  return (
    <div
      className={cn('', className)}
    >
      {children}
    </div>
  )
}

export default CartLayout