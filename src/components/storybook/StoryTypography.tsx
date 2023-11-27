import { cn } from "../../lib/utils"
import Typography from "../layout/typography"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const StoryTypography = ({ className }: Props) => {
  return <div className={cn("p-8", className)}>
    {
      ["primary", "info", "error", "warning"].map((item, idx) => (
        <div key={idx} className="p-4">
          <Typography heading="h6" className={`text-${item}`}>{`text-${item}`}</Typography>
          <Typography heading="h6" className={`text-${item}-foreground`}>{`text-${item}-foreground`}</Typography>
          <Typography heading="h6" className={`text-${item}-dark`}>{`text-${item}-dark`}</Typography>
          <Typography heading="h6" className={`text-${item}-light`}>{`text-${item}-light`}</Typography>
        </div>
      ))
    }
  </div>
}

export default StoryTypography