"use client"

import React, { useLayoutEffect } from 'react'
import { ColStack } from '../layout'
import { Button } from '../ui/button'
import { Formik, Form } from 'formik';
import FormikField from '../inputs/FormikField'
import { signupSchema, signupType } from '../../schema'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Signup = ({  }: Props) => {
  const router = useRouter()
  const { data } = useSession()

  console.log("data", data)
  useLayoutEffect(() => {
    if(data?.user) {
      return router.push("/")
    }
  }, [data])

  const signUpWithGoogle = async () => {
    try {
      await signIn('google')
    } catch (error) {
      // console.log(error)
      toast.error(`Signing with Google Failed`)
    }
  }

  const onSubmit = async (values: signupType) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(values)
      })
      if(res.ok) {
        toast.success('Create account successeeded')
        router.push("/sign-in")
        return;
      }
      if(res.status === 409) {
        toast.error('Account alredy exists' );
        return;
      } else {
        toast.error('Something wrong' );
        return;
      }
      } catch (error) {
        console.log(error)
        toast.error('Something wrong' );
        return;
    }
  };

  return (
    <div className='col-span-10 col-start-2 grid grid-cols-12'>
      <Formik
        onSubmit={onSubmit}
        validationSchema={signupSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirm: ""
        }}
      >
      {
        formik => {
          return (
            <Form className='col-span-12'>
              {/* form section */}
              <ColStack className='gap-1'>

                {/* <div className='flex gap-2 w-full'> */}
                  <FormikField
                    name='firstName'
                    placeholder='Frst Name'
                    // value="elassari19@gmail.com"
                  />

                  <FormikField
                    name='lastName'
                    placeholder='Last Name'
                    // value="elassari19@gmail.com"
                  />
                {/* </div> */}

                <FormikField
                  name='email'
                  placeholder='Email'
                  // value="elassari19@gmail.com"
                />
                <FormikField
                  type="password"
                  name='password'
                  placeholder='Password'
                  // value="11111111"
                />
                <FormikField
                  type="password"
                  name='confirm'
                  placeholder='Confirm Password'
                  // value="11111111"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className='rounded-lg'
                  disabled={!formik.isValid && formik.isSubmitting}
                >Sign Up</Button>

                <hr className='flex-1 my-6'/>

              </ColStack>
            </Form>
          )
        }
      }
      </Formik>
      <div className='col-span-full my-4'>
        <Button onClick={signUpWithGoogle} variant='primary-outline' size="lg" className="gap-x-4 rounded-lg">
          Continue with Google
        </Button>

        <div className='text-start my-4'>
          <Link href="/sign-in" className='text-primary/70 hover:text-primary text-sm'>Already have account</Link>
        </div>
      </div>
    </div>
)
}

export default Signup
