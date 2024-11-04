import { array, object, string, number, boolean } from 'yup';

export const productSchema = object().shape({
  name: string().required().min(3),
  description: string().required().min(20).max(200),
  images: array(),
  colors: array(),
  categoryId: string(),
  price: string(),
});

export const categorySchema = object().shape({
  name: string().required().min(3),
  slug: string(),
  description: string(),
  parentId: string(),
});

export const orderSchema = object().shape({
  quantity: string(),
  price: string(),
  tax: number(),
  shipping: number(),
  total: number(),
  paymentMethod: string(),
  isPaid: boolean(),
  isDelivered: boolean(),
  products: array().of(
    object().shape({
      productId: string(),
      quantity: number(),
    })
  ),
});
