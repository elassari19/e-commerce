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

export const uploadImages =async (image: any) => {
  await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, {}, (error, result) => {
      if(error) {
        console.log("error", error)
        return reject(error);
      }
      console.log("result", result?.secure_url, result?.public_id)
      return resolve(result)
    })
  })
  revalidatePath("/")
}
