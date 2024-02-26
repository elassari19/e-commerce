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