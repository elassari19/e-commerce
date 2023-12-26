"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categorySchema } from "@/schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { categoriesType } from "@/types/categories";
import { Category } from "@prisma/client";
import SelectInput from "../SelectInput";
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
}

const CategoryForm = ({ className, categories }: Props) => {
  const router = useRouter()

  const onSubmit = async (values: categoriesType) => {
    values.parentId = categories.filter((item) => item.slug === values.parentId)[0]?.id || ""

    // console.log("values", values)
    const res = await fetch("/api/dashboard/categories", {
      method: "POST",
      body: JSON.stringify({
        ...values,
      })
    });

    if(res.ok) {
      toast.success(`create ${values.slug} Category successeeded`)
      router.refresh()
      // router.replace('/dashboard/categories/')
    }
    toast.error(`create ${values.slug} Category Faileded` )
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={categorySchema}
      initialValues={{
        name: "",
        description: "",
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
            { lable: "Category", name: "parentId" },
          ].map(({ lable, name, ...rest }, idx) => {
            if(name === "parentId") {
              return (
                <div key={idx} className="grid grid-cols-12 items-start w-full">
                  <label htmlFor={name} className="col-span-4 text-sm mt-4">{lable}</label>
                  <div className="col-span-8">
                    <SelectInput
                      placeholder="Select Category"
                      data={categories}
                      onSelect={(e) => formik.setFieldValue("parentId", e)}
                    />
                  </div>
                </div>
              )
            }
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
                isLoading={formik.isSubmitting}
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