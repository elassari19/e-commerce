import { getAuthSession } from "@/lib/getAuthSession"
import { redirect } from "next/navigation"
import { ColStack } from "@/components/layout"
import Typography from "@/components/layout/typography"
import Register from "@/components/forms/Register"

interface Props {}

const page = async ({  }: Props) => {
  const session = await getAuthSession()
  // console.log("session", session)
  if(session?.user) {
    return redirect("/")
  }
 return (
  <ColStack className="justify-center text-center my-20 gap-8 px-4 md:px-20 lg:px-[30vw]">
    <Typography heading="h1">Create a new account</Typography>
    <Register />
  </ColStack>
  )
}

export default page