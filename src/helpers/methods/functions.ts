import { Category, Reviews } from "@prisma/client"

export const createList = (categories: Partial<Category>[], parentId?: string) => {
  const tree: Partial<Category& {children: Partial<Category>[]}>[] = []
  let catList: Partial<Category>[] = []
  if(parentId == undefined || parentId == "") {
    catList = categories.filter(cat => cat.parentId == undefined || cat.parentId == "")
  } else {
    catList = categories.filter(cat => cat.parentId == parentId)
  }

  for (let cat of catList) {
    tree.push({
      ...cat,
      children: createList(categories, cat.id)
    })
  }
  
  return tree
}

export const ratings = (reviews: Reviews[]) => {
  const total = reviews.reduce((acc: number, review: Reviews) => acc + review.rating, 0)
  const rate = total / reviews.length +1
  return rate
}