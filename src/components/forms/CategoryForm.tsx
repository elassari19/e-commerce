"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import toast from "react-hot-toast";
import { categorySchema } from "@/schema/productSchema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { categoriesType } from "@/types/categories";
import { Category, ImageUrl } from "@prisma/client";
import SelectInput from "../SelectInput";
import { uploadImagesHandler } from "@/helpers/methods/uploadImagesHandler";
import { useState } from "react";
import CardImage from "../cards/CardImage";
import { toggleIdToSlug, toggleSlugToId } from "../../helpers/methods/toggleIdName";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
  updateCategory?: Category&{ images: ImageUrl[] }
  createNewData?: (values: categoriesType, action: string) => Promise<any>
  updateData?: (values: categoriesType&{id: string}, action: string) => Promise<any>
}

const CategoryForm = ({ className, categories, updateCategory, createNewData, updateData }: Props) => {

  const [img, setImages] = useState<ImageUrl[]>(updateCategory?.images || [])

  const onSubmit = async (values: categoriesType) => {
    values.parentId = toggleSlugToId(categories, values.parentId!)
    values.images = img
    // console.log("values", values)

    let res = null
    if(!updateCategory) {
      res = createNewData && await createNewData(values, "categories")
        console.log("res", res)
        if(res < 300) {
          toast.success(`create ${values.name} Category successeeded`)
          return;
        }
      } else {
        res = updateData && await updateData({ id: updateCategory.id, ...values }, "categories")
        console.log("res", res)
        if(res < 300) {
          toast.success(`Update ${values.name} Category successeeded`)
          return;
        }
      }
    toast.error(`create ${values.name} Category Faileded` )
  };

  const removeImageHandler = (item: any) => {
    const remove = img.filter((pre: any) => pre.secure_url != item.secure_url && item)
    setImages(remove)
  }
  const initialValues = {
    name: updateCategory?.name || "",
    description: updateCategory?.description || "",
    parentId: updateCategory ? toggleIdToSlug(categories, updateCategory.parentId) : "",
    images: img,
  }

  return (
    <Formik
      onSubmit={async(values, actions) => [await onSubmit(values), actions.resetForm(), setImages([])]}
      validationSchema={categorySchema}
      initialValues={initialValues}
      className={cn('relative', className)}
    >
      {
      formik => (<Form className="col-span-12 grid gap-4 p-4 w-full mb-60">
        {
          [
            { lable: "Category Title/Name", name: "name", value: formik.values.name },
            { lable: "Category Description", name: "description", component:"textarea", rows: 5, value: formik.values.description },
            { lable: "Product Images", name: "images", type: "file", multiple: true, accept: "image/*",
              onChange: (e: any) => {uploadImagesHandler(e, setImages), formik.setFieldValue("images", img)}
            },
            { lable: "Category", name: "parentId" },
          ].map(({ lable, name, ...rest }, idx) => {
            if(name === "parentId") {
              return (
                <div key={idx} className="grid grid-cols-12 items-start w-full">
                  <label htmlFor={name} className="col-span-4 text-sm mt-4">{lable}</label>
                  <div className="col-span-12 md:col-span-8">
                    <SelectInput
                      placeholder="Select Category"
                      data={categories.filter((item) => !item.parentId)}
                      onSelect={(e) => formik.setFieldValue("parentId", e)}
                      value={formik.values.parentId}
                    />
                  </div>
                </div>
              )
            }
            return (
              <div key={idx} className="grid grid-cols-12 items-start w-full">
                <label htmlFor={name} className="col-span-4 text-sm mt-4">{lable}</label>
                <div className="col-span-12 md:col-span-8">
                  <FormikField
                    name={name}
                    placeholder={lable}
                    {...rest}
                  />
                  {
                    rest.type === "file" && (
                      <div className="min-h-20 w-full flex gap-2">
                        {
                          img.length > 0 && img?.map((item) => (
                            <CardImage
                              key={item.secure_url}
                              path={item.secure_url}
                              onClick={() => removeImageHandler(item)}
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

        {/* form action */}
        <div className="bg-white p-4 fixed bottom-0 right-0 left-0 shadow-2xl shadow-primary-dark">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="h-14"
                disabled={!formik.isValid && formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >{updateCategory ? "Update" : "Add"} Product</Button>
            </div>
            <div className="col-span-12 md:col-span-6">
              <SheetPrimitive.Close className="w-full">
                <Button
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