import { ImageUrl } from "@prisma/client";

export type categoriesType = {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
  images?: ImageUrl[]
}