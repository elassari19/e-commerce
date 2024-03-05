'use server'

import { revalidatePath } from "next/cache";
import { categoriesType } from "@/types/categories";
import { auth } from "@/lib/getAuthSession";

export const createNewData = async (data: categoriesType, action: string) => {
  const userId = await auth("id")

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${action}`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      userId
    })
  });

  revalidatePath(`/dashboard/${action}`, "page")

  return response.status
}

export const updateData = async (data: categoriesType&{id: string}, action: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${action}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });

  revalidatePath(`/dashboard/${action}`, "page")

  return response.status
  }

export const deleteItems = async(deletData: any[], action: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${action}`, {
    method: "DELETE",
    body: JSON.stringify(deletData)
  })

  revalidatePath(`/dashboard/${action}`, "page")

  return response.status
}