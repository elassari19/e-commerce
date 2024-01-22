import { array, object, string } from "yup";

export const productSchema = object().shape({
  name: string().required().min(3),
  description: string().required().min(20).max(200),
  images: array(),
  colors: array(),
  category: string(),
  price: string(),
})

export const categorySchema = object().shape({
  name: string().required().min(3),
  slug: string(),
  description: string(),
})