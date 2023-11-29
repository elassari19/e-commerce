import { LogIn } from "lucide-react"
import Link from "next/link"
import Typography from "../layout/typography"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const SignIn = ({  }: Props) => {
  return (
    <Link href="/sign-in" className="flex gap-2 px-2">
      <LogIn size={24} /> <Typography className="text-secondary">Sign In</Typography>
    </Link>
  )
}

export default SignIn