"use server"

import { db } from "@/lib/db";

export const getSearchProducts = async (searchQuery: string) => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
    include: {
      images: true,
    },
  });
  return products;
}

export async function getProductsByCategory(categoryId: string, skip: number = 0) {
  const res = await db.product.findMany({
    where: { categoryId },
    include: {
      images: true,
      properties: true,
      reviews: true,
      Category: true,
    },
    orderBy: { id: "asc" },
    take: 10,
    skip: skip * 10,
  });

  return res ?? [];
}

export async function getProductById(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      reviews: true,
      properties: true,
    },
  });
  return product;
}

export async function getCategories() {
  const categories = await db.category.findMany({
  });
  return categories;
}