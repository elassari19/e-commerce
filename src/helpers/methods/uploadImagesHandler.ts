"use client"

// function to upload images
export const uploadImagesHandler = async (e: any, setValue: (p:any) => void) => {

  // iterate over the files and upload them
  [...e.currentTarget.files].map(async (fl: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue((pre: any) => [...pre, { secure_url: URL.createObjectURL(fl), file: reader.result }])
    }
    reader.readAsDataURL(fl)
  })
}