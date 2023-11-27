import { cn } from "@/lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ColStack = ({ children, className }: Props) => {
  return (
    <div
      className={cn("flex flex-col", className)}
    >
      {children}
    </div>
  )
}

export default ColStack