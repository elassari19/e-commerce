"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Formik, Form } from 'formik';
import FormikField from '../inputs/FormikField'
import { signinSchema, signupType } from '../../schema'
import { postMethod } from '@/helpers/restApiMethods'
import { RootState } from '../../store'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Typography from '../layout/typography'

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Register = ({  }: Props) => {
  const country = useSelector((state: RootState) => state.root.country)
  const router = useRouter()
  const { data } = useSession()

  const onSubmit = async (values: signupType) => {
    const res = await postMethod("/api/register", values);
    // console.log(res.status)
    if(res.status === 201) {
      router.push('/sign-in')
      return;
    }
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
              
            </Form>
          )
        }
      }
  </Formik>
)
}

export default Register