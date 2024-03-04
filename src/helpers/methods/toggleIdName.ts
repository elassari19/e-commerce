export const toggleSlugToId = (data: any[], id: string) => {
  if(!id) return ""
  const result = data.filter((item) => item.slug === id)[0]?.id

  return result
}

export const toggleIdToSlug = (data: any[], id: string | null) => {
  if(!id) return ""
  const result = data.filter((item) => item.id === id && item.slug)[0]?.slug

  return result
}