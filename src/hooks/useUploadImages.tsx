"use client"

import { ImageUrl } from "@prisma/client";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";


export const useUploadImages = () => {
  const [images, setImages] = useState<ImageUrl[]>([])

  const uploadImages = (e: any, formik: FormikProps<any>) => {
    // let folder: any[] = [];

    [...e.currentTarget.files]?.map((fl: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((pre: any) => [...pre, { secure_url: URL.createObjectURL(fl), file: reader.result }])
      }
      reader.readAsDataURL(fl)
      })

      formik.setFieldValue("images", images)
      // setImages(folder)
      console.log("images", formik.values.images)
    }

  const filterImages = (img: ImageUrl) => {
    const filtered = images.filter((item) => item?.secure_url != img.secure_url)
    setImages(filtered)
  }

  return { images, uploadImages, filterImages };
}