"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import { categorySchema } from "@/schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import * as SheetPrimitive from "@radix-ui/react-dialog"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const CategoryForm = ({ className }: Props) => {
  const router = useRouter()

  const onSubmit = async (values: any) => {
    const res = await db.category.create(values);
    console.log("res.category", res)
    if(res) {
      toast.success(`create ${values.email} account successeeded`)
      router.refresh()
      router.push('/sign-in')
      return;
    }
    toast.error(`create ${values.email} account Faileded` )
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={categorySchema}
      initialValues={{
        name: "",
        description: "",
        images: [],
        parentId: ""
      }}
      className={cn('', className)}
    >
      {
      formik => (<Form className="col-span-12 grid gap-4 p-4 w-full">
        {
          [
            { lable: "Category Title/Name", name: "name" },
            { lable: "Category Description", name: "description", component:"textarea", rows: 5 },
            { lable: "Category Description", name: "description" },
          ].map(({ lable, name, ...rest }, idx) => {
            return (
              <div key={idx} className="grid grid-cols-12 items-start w-full">
                <label htmlFor={name} className="col-span-4 text-sm mt-4">{lable}</label>
                <div className="col-span-8">
                  <FormikField
                    name={name}
                    placeholder={lable}
                    {...rest}
                  />
                </div>
              </div>
            )
          })
        }

        {/* form action */}
        <div className="py-8 fixed p-8 bottom-0 left-0 right-0 bg-foreground shadow-md shadow-primary">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="h-14"
              disabled={!formik.isValid && formik.isSubmitting}
            >Add Product</Button>
          </div>
          <div className="col-span-12 md:col-span-6">
            <SheetPrimitive.Close className="w-full">
              <Button
                type="submit"
                variant="outline-destructive"
                size="sm"
                className="h-14"
                disabled={!formik.isValid && formik.isSubmitting}
              >Cancel</Button>
            </SheetPrimitive.Close>
          </div>
        </div>
        </div>
      </Form>)
      }
    </Formik>
  )
}

export default CategoryForm