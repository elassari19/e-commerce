import Link from "next/link"
import { getAuthSession } from "../../../lib/getAuthSession"
import Typography from "../../../components/layout/typography"
import { Metadata } from "next"

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "App Dashboard"
}

const Layout = async ({ children }: Props) => {
  // todo: check the user role (admin/gest/user)
  const session = await getAuthSession()
  const role = session
  console.log("role", role)
  return (
    <div>
      {
        [
          { name: "Home", href: "/" },
          { name: "Product", href: "/product" },
          { name: "Admins", href: "/admin" },
          { name: "Bills", href: "/bill" }
        ].map(({ name, href }, idx) => (
          <Link href={href} key={idx}>
            <Typography font="bold">{name}</Typography>
          </Link>
        ))
      }
      {children}
    </div>
  )
}

export default Layout