'use server'

import { revalidatePath } from "next/cache";

export const revalidatePathByAction = (action: string) => {
  revalidatePath(`/dashboard/${action}`, "page")
}
