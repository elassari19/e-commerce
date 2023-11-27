import Signin from "@/components/forms/Signin"
import { ColStack } from "@/components/layout"
import Typography from "@/components/layout/typography"
import { getAuthSession } from "@/lib/getAuthSession"
import { redirect } from "next/navigation"

interface Props {}

const page = async ({  }: Props) => {
  const session = await getAuthSession()
  // console.log("session", session)
  if(session?.user) {
    return redirect("/")
  }

  return <ColStack className="justify-center text-center my-20 gap-8 px-4 md:px-20 lg:px-[30vw]">
    <Typography heading="h1" size="2xl" font="xbold">Sign in</Typography>
    <Signin />
  </ColStack>
}

export default page