import { array, number, object, string } from "yup";

export const productSchema = object().shape({
  name: string().required().min(3),
  brand: string().required().min(3),
  description: string().required().min(20).max(200),
  images: array(),
  barcode: string(),
  category: string(),
  price: string(),
  tags: array().of(string()),
  quantity: number().required(),
  size: array().of(string()),
  color: array().of(string())
})

export const categorySchema = object().shape({
  name: string().required().min(3),
  parentId: string(),
  description: string(),
})