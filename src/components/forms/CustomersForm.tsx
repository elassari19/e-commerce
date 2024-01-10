"use client"

import { cn } from "@/lib/utils"
import { Form, Formik } from "formik"
import toast from "react-hot-toast";
import { profileSchema, profileSchemaType } from "@/schema/profile.schema";
import { Button } from "../ui/button";
import FormikField from "../inputs/FormikField";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { User } from "@prisma/client";
import SelectInput from "../SelectInput";
import useCoordinate from "../../hooks/useCoordinate";
import { uploadImagesHandler } from "../../helpers/methods/uploadImagesHandler";
import { useState } from "react";
import CardImage from "../cards/CardImage";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  customer: User[]
}

const CustomersForm = ({ className, customer }: Props) => {
  const [image, setImage] = useState<any>([])
  const {lat, lng} = useCoordinate()  

  const onSubmit = async (values: profileSchemaType ) => {
    console.log("values", values)
    const res = await fetch("/api/dashboard/profile", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        image: [image[0].file],
        lat,
        lng
      })
    });
    console.log("res", await res.json())
    if(res.ok) {
      toast.success(`create ${values.firstName} ${values.lastName} Customer successeeded`)
      // window.location.reload()
      return;
    }
    toast.error(`create ${values.firstName} ${values.lastName} Customer Faileded` )
  };

  const removeImageHandler = (item: any) => {
    const remove = image.filter((pre: any) => pre.path != item.path && item)
    setImage(remove)
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={profileSchema}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        birthDate: new Date(),
        gender: undefined,
        address: "",
        city: "",
        lat: "",
        lng: "",
        postalCode: "",
        cardExpire: new Date(),
        cardName: "",
        cardNumber: "",
        cardType: "",
        currency: "",
        iban: "",
        image: []
      }}
      className={cn('', className)}
    >
      {
      formik => (<Form className="col-span-12 grid gap-4 p-4 w-full">
        {
          [
            { lable: "First Name*", name: "firstName" },
            { lable: "Last Name*", name: "lastName" },
            { lable: "Image Profile", name: "image", type: "file", multiple: false,
              onChange: (e: any) => {uploadImagesHandler(e, setImage), formik.setFieldValue("image", image)}
            },
            { lable: "Gender", name: "gender" },
            { lable: "Age", name: "age" },
            { lable: "Email*", name: "email" },
            { lable: "Password*", name: "password" },
            { lable: "Phone", name: "phone" },
            { lable: "BirthDate", name: "birthDate" },
            { lable: "Address" },
            { lable: "Address", name: "address" },
            { lable: "City", name: "city" },
            { lable: "State", name: "state" },
            { lable: "Postal Code", name: "postalCode" },
            { lable: "Payment" },
            { lable: "Card Name", name: "cardName" },
            { lable: "Card Type", name: "cardType" },
            { lable: "Expire Date", name: "cardExpire" },
            { lable: "Card Number", name: "cardNumber" },
            { lable: "Currency", name: "currency" },
            { lable: "Account", name: "iban" },
          ].map(({ lable, name, ...rest }, idx) => {
            if(!name) {
              return (
                <div key={idx} className="grid grid-cols-12 items-start w-full">
                  <hr className="col-span-1 h-[2px] bg-primary-foreground"/>
                  <label htmlFor={name} className="col-span-2 text-center font-bold">{lable}</label>
                  <hr className="col-span-9 h-[2px] bg-primary-foreground"/>
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
                          image.length > 0 && image?.map((item: any) => (
                            <CardImage
                              key={item.path}
                              path={item.path}
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

export default CustomersForm