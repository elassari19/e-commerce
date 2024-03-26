'use server'

import { db } from "../../lib/db";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    include: {
      User: { select: { id: true, email: true } },
      images: true
    }
  })
  return categories
}