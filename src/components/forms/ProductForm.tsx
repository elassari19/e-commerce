"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import toast from "react-hot-toast";
import { productSchema } from "@/schema/productSchema";
import FormikField from "../inputs/FormikField";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Category, ImageUrl, Product, Properties } from "@prisma/client";
import CardImage from "../cards/CardImage";
import ColorProperties from "./ColorProperties";
import FormActions from "./FormActions";
import OptionsProperties from "../OptionsProperties";
import { uploadImagesHandler } from "@/helpers/methods/uploadImagesHandler";
import { revalidatePathByAction } from "@/helpers/actions/revalidate";
import { toggleIdToSlug, toggleSlugToId } from "@/helpers/methods/toggleIdName";
import ProductTags from "../ProductTags";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
  formUpdateData?: Product&{ images: ImageUrl[], properties: Properties[], quantity: number, price: number }
}

const ProductForm = ({ className, categories, formUpdateData }: Props) => {

  const [img, setImages] = useState<any[]>(formUpdateData?.images || [] )
  // color properties
  const [properties, setProperties] = useState<Partial<Properties>[]>(formUpdateData?.properties || [{ color: "", quantity: "" } ])
  // other properties
  const [optionsproperties, setOptionsProperties] = useState<Partial<Properties>[]>(formUpdateData?.properties || [{ name: "", value: "" } ])

  const onSubmit = async (values: any) => {
    values.categoryId = toggleSlugToId(categories, values.categoryId)
    values.images = img
    delete values.category
    delete values.img

    if(!formUpdateData) {
      const res = await fetch('/api/dashboard/products',{
        method: "POST",
        body: JSON.stringify({
          ...values,
          properties: [...properties, ...optionsproperties],
        })
      })
      // console.log("res", res)
      if(res.ok) {
        revalidatePathByAction("products")
        toast.success(`create ${values.name} product successeeded`)
        return;
      }
    } else {
      const res = await fetch('/api/dashboard/products',{
        method: "PATCH",
        body: JSON.stringify({
          id: formUpdateData.id,
          ...values
        })
      })
      if(res.ok) {
        revalidatePathByAction("products")
        toast.success(`Update ${values.name} Product successeeded`)
        return;
      }
  }
  // the operation failed
  toast.error(`create ${values.name} product Faileded` )
  };

  const removeImageHandler = (item: any) => {
    const remove = img.filter((pre: any) => pre.secure_url != item.secure_url && item)
    setImages(remove)
  }

  const initialValues = {
    name: formUpdateData?.name || "",
    description: formUpdateData?.description || "",
    img,
    categoryId: formUpdateData ? toggleIdToSlug(categories, formUpdateData.categoryId) : "",
    tags: formUpdateData?.tags || [],
    quantity: formUpdateData?.quantity || "",
    price: formUpdateData?.price || "",
    properties: formUpdateData?.properties || [{name: "", value: ""}],
  }

    return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={productSchema}
      initialValues={initialValues}
      className={cn('', className)}
    >
      {
      formik => (
        <Form className="col-span-12 grid gap-4 p-4 w-full mb-36 md:mb-20 relative">
        {
          [
            { lable: "Product Title/Name", name: "name", value: formik.values.name },
            { lable: "Product Description", name: "description", component:"textarea", rows: 5, value: formik.values?.description},
            { lable: "Product Images", name: "images", type: "file", multiple: true, accept: "image/*",
              onChange: (e: any) => {uploadImagesHandler(e, setImages), formik.setFieldValue("images", img)}
            },
            { lable: "Category", name: "category", value: formik.values?.categoryId},
            { lable: "Product Tags", name: "tags", component: "textarea", rows: 3 , value: formik.values?.tags},
            { lable: "Product Price", name: "price", value: formik.values?.price },
            { lable: "Product Quantity", name: "quantity", value: formik.values?.quantity },
            { lable: "Product Properties", name: "properties" },
          ].map(({ lable, name, ...rest }, idx) => {
              return (
                <div className="grid grid-cols-1 md:grid-cols-12" key={idx}>
                  <div className="col-span-full">
                  <label htmlFor={name} className="col-span-full text-md my-4">{lable}</label>
                  {
                    name === "properties"
                      ? (
                        <>
                          <ColorProperties properties={properties} setProperties={setProperties} />
                          <OptionsProperties properties={optionsproperties} setProperties={setOptionsProperties} />
                        </>
                        )
                      : name === "category"
                      ? (
                        <SelectInput
                          placeholder="Select Category"
                          data={categories.filter(item => item.parentId == "")}
                          onSelect={(e) => formik.setFieldValue("categoryId", e)}
                          value={formik.values.categoryId}
                        />)
                      : name === "tags"
                      ? (
                        <>
                          <ProductTags>
                            {tags => tags.map((tag) =>(
                              <div className="bg-primary/80 rounded-md p-2 flex items-center">
                                <input
                                  key={tag} type="checkbox"
                                  name={tag} value={tag}
                                  onChange={(e) => {
                                    e.target.value
                                    if(e.target.checked) {
                                      formik.values.tags.indexOf(tag) === -1 && formik.setFieldValue("tags", [...formik.values.tags, tag])
                                    } else {
                                      const ind = formik.values.tags.indexOf(tag)
                                      ind !== -1 && formik.setFieldValue("tags", formik.values.tags?.filter((item: string) => item !== tag))
                                    }
                                  }}
                                  className="p-1 bg-primary-foreground text-white rounded-lg w-4 h-4 border-primary"
                                />
                                <label htmlFor={tag} className="ml-1">{tag}</label>
                              </div>
                            ))}
                          </ProductTags>
                        </>
                      )
                      : (<>
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
                      </>)
                  }
                  </div>
                </div>
              )
            }
          )
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

export default ProductForm