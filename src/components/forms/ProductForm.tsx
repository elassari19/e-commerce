"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema } from "../../schema/productSchema";
import FormikField from "../inputs/FormikField";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Category, ImageUrl, Properties } from "@prisma/client";
import { uploadImagesHandler } from "../../helpers/methods/uploadImagesHandler";
import CardImage from "../cards/CardImage";
import ColorProperties from "./ColorProperties";
import { IProductData } from "../../types/products";
import FormActions from "./FormActions";
import OptionsProperties from "../OptionsProperties";
import { createNewData, updateData } from "../../helpers/actions/dashboardActions";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  categories: Category[]
  updateData?: (values: IProductData&{id: string}, action: string) => Promise<any>
  updateProduct: IProductData
}

const ProductForm = ({ className, categories, updateProduct }: Props) => {
  const router = useRouter()

  const [img, setImages] = useState<any[]>(updateProduct?.images || [] )
  // color properties
  const [properties, setProperties] = useState<Partial<Properties>[]>(updateProduct?.properties || [{ color: "", quantity: "" } ])
  // other properties
  const [optionsproperties, setOptionsProperties] = useState<Partial<Properties>[]>(updateProduct?.properties || [{ name: "", value: "" } ])

  const onSubmit = async (values: any) => {
    const fls = img.map(fl => fl.file)
    values.categoryId = categories.filter((item) => item.slug === values.category)[0]?.id || ""
    values.images = img
    delete values.category
    delete values.img

    if(!updateProduct) {
      const res = await createNewData({
        ...values,
        properties: [...properties, ...optionsproperties],
        images: fls
      }, "products")
      // const res = await fetch("/api/dashboard/products", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ...values,
      //     properties: [...properties, ...optionsproperties],
      //     images: fls
      //   })
      // });
      // console.log("res", res)
      console.log("res", res)
      if(res < 300) {
        toast.success(`create ${values.name} product successeeded`)
        return;
      }
    } else {
      const res = updateProduct && await updateData({ id: updateProduct.id, ...values }, "products")
      if(res < 300) {
        toast.success(`Update ${values.name} Product successeeded`)
        return;
      }
  }

    toast.error(`create ${values.name} product Faileded` )
  };

  const removeImageHandler = (item: any) => {
    const remove = img.filter((pre: any) => pre.secure_url != item.secure_url && item)
    setImages(remove)
  }

    return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={productSchema}
      initialValues={{
        name: updateProduct?.name || "",
        description: updateProduct?.description || "",
        img,
        categoryId: updateProduct?.categoryId || "",
        quantity: updateProduct?.quantity || "",
        price: updateProduct?.price || "",
        properties: updateProduct?.properties || [{name: "", value: ""}],
      }}
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
            { lable: "Product Price", name: "price", value: formik.values?.price },
            { lable: "Product Quantity", name: "quantity", value: formik.values?.quantity },
            {
              lable: "Product Properties", name: "properties"
            },
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
                          data={categories}
                          onSelect={(e) => formik.setFieldValue("category", e)}
                        />)
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
        <div className="py-8 p-8 fixed bottom-0 right-0 left-72 bg-foreground shadow-md shadow-primary">
          <FormActions isSubmitting={formik.isSubmitting} />
        </div>
      </Form>)
      }
    </Formik>
  )
}

export default ProductForm