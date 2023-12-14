"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { db } from "../../lib/db";
import { productSchema } from "../../schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const ProductForm = ({ className }: Props) => {
  const router = useRouter()

  const onSubmit = async (values: any) => {
    const res = await db.product.create(values);
    console.log("res", res)
    if(res) {
      toast.success(`create ${values.email} account successeeded`)
      router.refresh()
      router.push('/sign-in')
      return;
    }
    toast.error(`create ${values.email} account Faileded` )
  };

  const uploadImagesHandler = async (e: any) => {
    const file = [...e.currentTarget.files].map(async (fl: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(pre => [...pre, { path: URL.createObjectURL(fl), file: reader.result }])
      }
      reader.readAsDataURL(fl)
    })
    // const res = await fetch("/api/dashboard/products", { method: "POST", body: JSON.stringify(images) })
    // console.log("uploadImages", res.body)
  }

  const [images, setImages] = useState<any[]>([])

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={productSchema}
      initialValues={{
        name: "",
        description: "",
        images: [],
        barcode: "",
        category: "",
        price: "0",
        tags: "",
        quantity: 0,
        size: "md",
        color: "black"
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
            { lable: "Product Barcode", name: "barcode" },
            { lable: "Category", name: "category" },
            { lable: "Product Price", name: "price" },
            { lable: "Product Quantity", name: "quantity" },
            { lable: "Product Tags", name: "tags" },
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
                  {
                    rest.type === "file" && (
                      <div className="min-h-20 w-full flex gap-2">
                        {
                          images.length > 0 && images?.map((item) => (
                            <div className="relative w-fit hover:scale-[250%] hover:z-10 transition-all duration-200" key={item.path}>
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

export default ProductForm