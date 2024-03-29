"use server"

import { db } from "@/lib/db";

export const getProducts = async (searchQuery: string) => {
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

export async function getProductsByCategory(categoryIds: string[]) {
  let afterCursor = null;
  const products = [];

  for (const categoryId of categoryIds) {
    const res = await db.product.findMany({
      where: { categoryId },
      include: { images: true },
      orderBy: { id: "asc" },
      take: 2,
      skip: afterCursor ? 1 : 0, // Skip existing results
    });
    products.push(res[0]); // Assuming data is an array
  }

  return products;
}
