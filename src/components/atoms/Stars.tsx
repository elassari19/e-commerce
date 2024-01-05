import { cn } from "@/lib/utils"
import { RowStack } from "../layout"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  stars: number
}

const Stars = ({ children, stars, className }: Props) => {
  return (
    <RowStack className={cn('gap-4', className)}>
      <RowStack>
        <p>p</p>
        {/* {Array(stars).fill("").map((item, idx) => (<AiFillStar key={idx} />))}
        {Array(5 - stars).fill("").map((item, idx) => (<AiOutlineStar key={idx} />))} */}
      </RowStack>
      {children}
    </RowStack>
  )
}

export default Stars