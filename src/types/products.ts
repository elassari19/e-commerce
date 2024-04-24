import { Product, Properties, ImageUrl, Reviews, Category } from "@prisma/client";

export type TImage = {
  secure_url: string
  file?: string
}

export type TImageColors = {
  secure_url?: string,
  public_id?: string,
  file?: string
  color: string,
  quantity: string
}

export interface TColorForm extends TImage {
  color: string
  quantity: number
}

export interface IProductData extends Product {
  images: ImageUrl[];
  properties: Properties[];
  reviews: Reviews[];
  Category: Category
}