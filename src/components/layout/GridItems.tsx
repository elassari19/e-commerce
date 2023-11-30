import { cn } from "@/lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const GridItems = ({ children, className }: Props) => {
  return (
    <div
      className={cn('col-span-10 sm:col-span-5 md:col-span-4 xl:col-span-2', className)}
    >
      {children}
    </div>
  )
}

export default GridItems