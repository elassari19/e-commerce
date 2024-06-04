'use server'

import { db } from "@/lib/db"

export const getRootCategories = async () => {
  return await db.category.findMany({
    where: { parentId: "" },
    include: { images: true }
  })
}

export const getSubCategories = async (parentId: string) => {
  return await db.category.findMany({
    where: {OR: [{ id: parentId }, { parentId: parentId }]},
    include: { images: true }
  })
}