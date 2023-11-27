'use client'

import { Button } from "./ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { FcGoogle } from "@/assets/icons"
import { ColStack, RowStack } from "./layout"
import Typography from "./layout/typography"
import Image from "next/image"
import { useToast } from "./ui/use-toast"
import { redirect } from "next/navigation"

interface Props {}

const UserAuth = ({  }: Props) => {

  const { data } = useSession()
  const { toast } = useToast()

  const signInWithGoogle = async () => {
    // 'use server'
    try {
      await signIn('google')
      redirect("/")
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    }
  }

return <div>
    {
      !data?.user
      ? (
        <Button onClick={signInWithGoogle} type='submit' variant='ghost' className="w-full h-full gap-4">
          <FcGoogle className="w-8 h-8" /> Google
        </Button>
      )
      : (
        <RowStack className="gap-2">
          <Image src="" alt="profile image" className="rounded-full w-16 h-16" />
          <ColStack className="gap-4">
            <RowStack>
              <Typography variant="gray">Welcome back,</Typography>
              <Typography ellipsis>{data.user.email}</Typography>
            </RowStack>
            <Button onClick={() => signOut} type='submit' variant='outline' size='sm'>Sign Out</Button>
          </ColStack>
        </RowStack>
      )
    }

  </div>
}

export default UserAuth