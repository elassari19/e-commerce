import { cn } from "@/lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GridStack = ({ children, className }: Props) => {
  return (
    <div
      className={cn("grid grid-flow-row repeat(auto-fit, minmax(5rem, 1fr))", className)}
    >
      {children}
    </div>
  )
}

export default GridStack