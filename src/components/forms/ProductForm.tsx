"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema } from "../../schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import SelectInput from "../SelectInput";
import { Category } from "@prisma/client";
import Properties from "../Properties";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
}

const ProductForm = ({ className, categories }: Props) => {
  const router = useRouter()

  const [images, setImages] = useState<any[]>([])
  const [properties, setProperties] = useState<{name: string, value: string}[]>([
      { name: "", value: "" }
    ])

  const onSubmit = async (values: any) => {
    const fls = images.map(fl => fl.file)
    values.categoryId = categories.filter((item) => item.slug === values.category)[0]?.id || ""
    delete values.category

    const res = await fetch("/api/dashboard/products", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        properties,
        images: fls
      })
    });
    // console.log("res", res)
    if(res.ok) {
      toast.success(`create ${values.email} account successeeded`)
      router.refresh()
      router.push('/dashboard/products')
      return;
    }
    toast.error(`create ${values.email} account Faileded` )
  };

  const uploadImagesHandler = async (e: any) => {
    [...e.currentTarget.files].map(async (fl: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(pre => [...pre, { path: URL.createObjectURL(fl), file: reader.result }])
      }
      reader.readAsDataURL(fl)
    })
  }

    return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={productSchema}
      initialValues={{
        name: "",
        description: "",
        images: [],
        category: "",
        price: "0",
      }}
      className={cn('', className)}
    >
      {
      formik => (
        <Form className="col-span-12 grid gap-4 p-4 w-full mb-36 md:mb-20">
        {
          [
            { lable: "Product Title/Name", name: "name" },
            { lable: "Product Description", name: "description", component:"textarea", rows: 5 },
            { lable: "Product Images", name: "images", type: "file", multiple: true,
              onChange: (e: any) => {uploadImagesHandler(e), formik.setFieldValue("images", images)}
            },
            { lable: "Category", name: "category" },
            { lable: "Product Price", name: "price" },
            { lable: "Product Quantity", name: "quantity" },
            {
              lable: "Product Properties", name: "properties",
            },
          ].map(({ lable, name, ...rest }, idx) => {
            if(name === "properties"){
              return (
                <div className="grid grid-cols-1 md:grid-cols-12" key={idx}>
                  <label htmlFor={name} className="col-span-full text-md my-4">{lable}</label>
                  <Properties
                    properties={properties}
                    setProperties={setProperties}
                  />
                </div>
              )
            }
            if(name === "category") {
              return (
                <div key={idx} className="grid grid-cols-12 items-start w-full">
                  <label htmlFor={name} className="col-span-4 text-sm mt-4">{lable}</label>
                  <div className="col-span-8">
                    <SelectInput
                      placeholder="Select Category"
                      data={categories}
                      onSelect={(e) => formik.setFieldValue("category", e)}
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
                  {
                    rest.type === "file" && (
                      <div className="min-h-20 w-full flex gap-2">
                        {
                          images.length > 0 && images?.map((item) => (
                            <div className="relative w-fit hover:scale-[250%] hover:z-10 transition-all duration-200 hover:delay-200" key={item.path}>
                              <Image
                                src={item.path}
                                alt={"item"} width={40} height={40}
                                className="h-20 w-20 border border-primary rounded-md"
                              />
                              <X
                                className="absolute -top-1 -right-1 bg-destructive text-white cursor-pointer rounded-sm"
                                size={14} onClick={() => {
                                  const remove = images.filter((pre: any) => pre.path != item.path && item)
                                  setImages(remove)
                                }}
                              />
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
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
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            >Add Product</Button>
          </div>
          <div className="col-span-12 md:col-span-6">
            <SheetPrimitive.Close className="w-full">
              <Button
                variant="outline-destructive"
                size="sm"
                className="h-14"
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

export default ProductForm