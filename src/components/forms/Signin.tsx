"use client"

import React, { useLayoutEffect } from 'react'
import { Button } from '../ui/button'
import { Formik, Form } from 'formik';
import FormikField from '../inputs/FormikField'
import { signinSchema, signinType } from '../../schema'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Signin = ({  }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  useLayoutEffect(() => {
    if(session.data?.user) {
      return router.push(pathname)
    }
  }, [session.data])
  console.log("data", session)

  const signInWithGoogle = async () => {
    try {
      await signIn('google')
    } catch (error) {
      console.log(error)
      toast.error(`Signing with Google Failed`)
    }
  }

  const onSubmit = async (values: signinType) => {
    const data = await signIn('credentials', { redirect: false, ...values })

    if(data?.error) {
      toast.error('Something wrong' );
      return;
    }
    toast.success('Sign in successeeded')
    router.refresh()
  };

  return (
    <div className='col-span-10 col-start-2 grid grid-cols-12'>
      <Formik
        onSubmit={onSubmit}
        validationSchema={signinSchema}
        initialValues={{
          email: "zayd.fahd@gmail.com",
          password: "11111111"
        }}
      >
      {
        formik => {
          return (
            <Form className='col-span-12'>
              {/* form section */}
              <div className='flex flex-col gap-1'>

                <FormikField
                  name='email'
                  placeholder='Email'
                  value={formik.values.email}
                />
                <FormikField
                  type="password"
                  name='password'
                  placeholder='Password'
                  value={formik.values.password}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className='rounded-lg'
                  disabled={!formik.isValid && formik.isSubmitting}
                >Sign in</Button>

                <hr className='flex-1 mt-4'/>

              </div>
            </Form>
          )
        }
      }
      </Formik>
      <div className='col-span-full'>
        <Button onClick={signInWithGoogle} variant='primary-outline' size="lg" className="gap-x-4 rounded-lg">
          Continue with Google
        </Button>

        <div className='text-start my-4'>
          <Link href="/forgot-password" className='text-primary/70 hover:text-primary text-sm'>Forgot Password</Link>
          <br/>
          <Link href="/sign-up" className='text-primary/70 hover:text-primary text-sm'>Create Account</Link>
        </div>
      </div>
    </div>
)
}

export default Signin
