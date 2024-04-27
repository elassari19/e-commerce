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

export async function getProductsByTags(tags: string[], skip: number = 8, take: number=10) {
  const res = await db.product.findMany({
    where: {
      tags: { hasSome: tags }
    },
    include: {
      images: true,
      properties: true,
      reviews: true,
      Category: true,
    },
    orderBy: { id: "asc" },
    take: take,
    skip: skip * take,
  });

  return res ?? [];
}

export async function getProductsByCategory(categoryId: string[], skip: number = 0, take: number=10) {
  const res = await db.product.findMany({
    where: { categoryId: { in: categoryId } },
    include: {
      images: true,
      properties: true,
      reviews: true,
      Category: true,
    },
    orderBy: { id: "asc" },
    take: take,
    skip: skip * take,
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