import { cn } from "@/lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const RowStack = ({ children, className }: Props) => {
  return (
    <div
      className={cn("flex flex-row items-center", className)}
    >
      {children}
    </div>
  )
}

export default RowStack