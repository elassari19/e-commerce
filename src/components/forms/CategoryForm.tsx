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
import { createNewData, updateData } from "../../helpers/actions/dashboardActions";
import FormActions from "./FormActions";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
  formUpdateData?: Category&{ images: ImageUrl[] }
}

const CategoryForm = ({ className, categories, formUpdateData }: Props) => {

  const [img, setImages] = useState<ImageUrl[]>(formUpdateData?.images || [])

  const onSubmit = async (values: categoriesType) => {
    values.parentId = toggleSlugToId(categories, values.parentId!)
    values.images = img
    // console.log("values", values)

    let res = null
    if(!formUpdateData) {
      res = await createNewData(values, "categories")
        if(res < 300) {
          toast.success(`create ${values.name} Category successeeded`)
          return;
        }
      } else {
        res = await updateData({ id: formUpdateData.id, ...values }, "categories")
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
    name: formUpdateData?.name || "",
    description: formUpdateData?.description || "",
    parentId: formUpdateData ? toggleIdToSlug(categories, formUpdateData.parentId) : "",
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
        <div className="py-8 p-8 fixed bottom-0 right-0 left-0 bg-foreground shadow-md shadow-primary">
          <FormActions isSubmitting={formik.isSubmitting} update={formUpdateData?true:false} />
        </div>
      </Form>)
      }
    </Formik>
  )
}

export default CategoryForm