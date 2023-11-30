import { cn } from "@/lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const GridContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn('grid grid-flow-row grid-cols-10 md:grid-cols-12 xl:grid-cols-10 gap-2', className)}
    >
      {children}
    </div>
  )
}

export default GridContainer