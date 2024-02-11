"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema } from "../../schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import { useState } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import SelectInput from "../SelectInput";
import { Category, ImageUrl } from "@prisma/client";
import OptionsProperties from "../OptionsProperties";
import { uploadImagesHandler } from "../../helpers/methods/uploadImagesHandler";
import CardImage from "../cards/CardImage";
import ColorProperties from "./ColorProperties";
import { IProductData, TColorForm } from "../../types/products";
import { useUploadImages } from "../../hooks/useUploadImages";

// interface IUpdataData extends Product, ImageUrl, Properties {}
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
  updateData?: IProductData
}

const ProductForm = ({ className, categories, updateData }: Props) => {
  // console.log("updateData", updateData)
  const router = useRouter()

  const { images, uploadImages, filterImages } = useUploadImages()

  // console.log("updateData", state)
  // submit form
  const onSubmit = async (values: any) => {
    console.log("values", values)
    values.categoryId = categories.filter((item) => item.slug === values.categoryId)[0]?.id || ""

    const url = updateData ? `/api/dashboard/products/${updateData.id}` : "/api/dashboard/products"
    // try {
    //   const res = await fetch(url, {
    //     method: updateData ? "PATCH" : "POST",
    //     body: JSON.stringify({
    //       ...values,
    //       images,
    //     })
    //   });
    //   if(res.ok) {
    //     toast.success(`${updateData ? "update" : "create"} ${values.name} product successeeded`)
    //     router.refresh()
    //     return;
    //   }
  
    // } catch (error) {
    //   console.log("error", error)
    //   toast.error(`${updateData ? "update" : "create"} ${values.name} product Faileded` )
    // }
  };

    return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={productSchema}
      initialValues={{
        name: updateData?.name || "",
        description: updateData?.description || "",
        images,
        colors: updateData?.images.filter((item) => item?.color != null && item) || [{color: "", quantity: "", file: ""}],
        categoryId: updateData?.categoryId || "",
        price: updateData?.price || "",
        properties: updateData?.properties || [{name: "", value: ""}],
      }}
      enableReinitialize
      className={cn('', className)}
    >
      {
      formik => (
          <Form className="col-span-12 grid gap-4 p-4 w-full mb-36 md:mb-20">
          {
            [
              { lable: "Product Images", name: "images", type: "file", multiple: true,
                onChange: async(e: any) => uploadImages(e, formik)
              },
              { lable: "Product Title/Name", name: "name", value: formik.values.name },
              { lable: "Product Description", name: "description", component:"textarea", rows: 5, value: formik.values.description},
              { lable: "Category", name: "category", value: formik.values.categoryId },
              { lable: "Product Price", name: "price", value: formik.values.price },
              { lable: "Product Colors", name: "Colors", type: "color", value: formik.values.colors },
              { lable: "Product Properties", name: "properties", value: formik.values.properties },
            ].map(({ lable, name, ...rest }, idx) => {
              if(rest.type === "color"){
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12" key={idx}>
                    <label htmlFor={name} className="col-span-full text-md my-4">{lable}</label>
                    <ColorProperties
                      {...rest}
                    />
                  </div>
                )
              }
              if(name === "properties"){
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12" key={idx}>
                    <label htmlFor={name} className="col-span-full text-md my-4">{lable}</label>
                    <OptionsProperties
                      properties={formik.values.properties}
                      setProperties={(prop) => formik.setFieldValue("properties", prop)}
                      {...rest}
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
                        onSelect={(e) => formik.setFieldValue("categoryId", e)}
                        value={formik.values.categoryId}
                      />
                    </div>
                  </div>
                )
              }
              // normal input
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
                            
                            images.length > 0 && images?.map((item, idx) => (
                              <CardImage
                                key={idx}
                                path={item?.secure_url!}
                                onClick={() => filterImages(item)}
                              />
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

            {/* submit/cancel buttons */}
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
          </Form>
        )
      }
    </Formik>
  )
}

export default ProductForm