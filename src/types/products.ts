import { Product, Properties, ImageUrl } from "@prisma/client";

export type TImage = {
  secure_url: string
  file: any
}

export type TImageColors = {
  secure_url: string,
  public_id: string,
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
}