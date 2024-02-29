import { LogIn } from "lucide-react"
import Link from "next/link"
import Typography from "../layout/typography"
import { cn } from "../../lib/utils"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const SignIn = ({ className }: Props) => {
  return (
    <Link href="/sign-in" className={cn("flex gap-2")}>
      <LogIn size={24} className={cn("", className)} /> <Typography className={cn("text-secondary", className)}>Sign In</Typography>
    </Link>
  )
}

export default SignIn