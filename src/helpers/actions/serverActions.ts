'use server'

import { redirect } from "next/navigation"

export const inputSearch = async (form: FormData) => {

  const value = form.get('search')?.toString()
  // console.log(value)
  if (value?.length)
  redirect(`/search?q=${value}`)
}

export const goToHome =async () => {
  redirect(`/`)
}