"use client"

import React from 'react'
import { ColStack, RowStack } from '../layout'
import { Button } from '../ui/button'
import Social from './Social'
import { useSelector } from 'react-redux'
import { Formik, Form } from 'formik';
import FormikField from '../inputs/FormikField'
import { signinSchema, signupType } from '../../schema'
import SelectCountry from '../Search/SelectCountry'
import { postMethod } from '@/helpers/restApiMethods'
import { useToast } from '../ui/use-toast'
import { RootState } from '../../store'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Typography from '../layout/typography'

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Register = ({  }: Props) => {
  const country = useSelector((state: RootState) => state.root.country)
  const { toast } = useToast()
  const router = useRouter()
  const { data } = useSession()

  if(data?.user?.email) {
    router.push("/")
    return <Typography heading='h2' size="2xl" font="bold" center>already sign in</Typography>
  }

  const onSubmit = async (values: signupType) => {
    const res = await postMethod("/api/register", values);
    // console.log(res.status)
    if(res.status === 201) {
      toast({ variant: "success", title: 'success', description: `create ${values.email} account successeeded` })
      router.refresh()
      router.push('/sign-in')
      return;
    }
    toast({ variant: "destructive", title: 'Failed', description: `create ${values.email} account Faileded` })
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={signinSchema}
      initialValues={{
        code: country.code,
        email: "",
        password: ""
      }}
    >
      {
        formik => {
          return (
            <Form>
              {/* form section */}
              <ColStack className='gap-4'>

                <SelectCountry name="code" />

                <FormikField
                  name='email'
                  placeholder='Email'
                />
                <FormikField
                  type="password"
                  name='password'
                  placeholder='Password'
                />

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className='rounded-full'
                  disabled={!formik.isValid && formik.isSubmitting}
                >Create account</Button>

              {/* divider section */}
              <RowStack className='gap-8 my-4'>
                <hr className='flex-1'/>
                <span>Or continue with</span>
                <hr className='flex-1'/>
              </RowStack>

              {/* social section */}
              <Social confirm />
              </ColStack>
            </Form>
          )
        }
      }
  </Formik>
)
}

export default Register