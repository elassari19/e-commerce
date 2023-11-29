"use client"

import { cn } from "@/lib/utils"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { InferType } from "yup"
import { reduxActionType } from "../../types/sliceActionType"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  actionType: reduxActionType
  initialValues: any
  validationSchema: any
}

const SmartFormik = ({ children, initialValues, validationSchema, actionType, className }: Props) => {
  const dispatch = useDispatch()

  const onSubmit = (values: InferType<typeof validationSchema>) => {
    // console.log("values", values)
    dispatch({ type: actionType, payload: { ...values } })
    // Toast({ variant: "success", title: 'success', description: 'create account successeeded' })
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}
      className={cn('', className)}
    >
      {children}
    </form>
  )
}

export default SmartFormik