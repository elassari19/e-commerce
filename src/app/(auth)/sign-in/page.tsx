import Signin from "@/components/forms/Signin"
import { GridStack } from "@/components/layout"
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

  return <GridStack className="grid-cols-1 md:grid-cols-12">
    <div className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5 text-center py-8">
      <Typography heading="h1" className="font-bold text-xl my-8">Sign in</Typography>
      <Signin />
    </div>
  </GridStack>
}

export default page