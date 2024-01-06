"use client"

import React, { useLayoutEffect } from 'react'
import { ColStack, RowStack } from '../layout'
import { Button } from '../ui/button'
import { Formik, Form } from 'formik';
import FormikField from '../inputs/FormikField'
import { signinSchema, signinType } from '../../schema'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Signin = ({  }: Props) => {
  const router = useRouter()
  const { data } = useSession()

  useLayoutEffect(() => {
    if(data?.user?.email) {
      return router.push("/")
    }
  }, [data])

  // const signInWithGoogle = async () => {
  //   try {
  //     await signIn('google')
  //     router.refresh()
  //     router.push("/")
  //   } catch (error) {
  //     // console.log(error)
  //     toast({
  //       title: 'Error',
  //       description: 'There was an error logging in with Google',
  //       variant: 'destructive',
  //     })
  //   }
  // }

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
    <ColStack className='gap-4'>
      <Formik
        onSubmit={onSubmit}
        validationSchema={signinSchema}
        initialValues={{
          email: "elassari19@gmail.com",
          password: "11111111"
        }}
      >
        {
          formik => {
            return (
              <Form>
                {/* form section */}
                <ColStack className='gap-4'>

                  <FormikField
                    name='email'
                    placeholder='Email'
                    value="elassari19@gmail.com"
                  />
                  <FormikField
                    type="password"
                    name='password'
                    placeholder='Password'
                    value="11111111"
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className='rounded-full'
                    disabled={!formik.isValid && formik.isSubmitting}
                  >Sign in</Button>

                {/* divder section */}
                <RowStack className='gap-8 my-4'>
                  <hr className='flex-1'/>
                  <span>Or continue with</span>
                  <hr className='flex-1'/>
                </RowStack>

                </ColStack>
              </Form>
            )
          }
        }
    </Formik>
    {/* <Button onClick={signInWithGoogle} variant='outline' className="w-full h-full gap-4 rounded-full">
      <FcGoogle className="w-8 h-8" /> Google
    </Button> */}
  </ColStack>
)
}

export default Signin
