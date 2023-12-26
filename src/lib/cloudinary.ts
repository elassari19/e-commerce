import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true,
});

export default cloudinary

export type CloudinaryResource = {
  context?: {
    alt?: string,
    caption?: string
  },
  public_id: string,
  secure_url: string
}

export const uploader = (image: string) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload(image,
    {
      folder: "my-ecom-app/products",
    }, (error, result) => {
    if(error) {
      console.log("error", error)
      return reject(error);
    }

    return resolve({
      secure_url: result?.secure_url,
      public_id: result?.public_id
    })
  })
})

export const uploadImages = async (images: any) => new Promise((resolve, reject) => {
  const upload = images.map((image: string) => uploader(image))
  Promise.all(upload)
    .then(val => resolve(val))
    .catch(error => reject(error))

})
