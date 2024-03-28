import React from 'react'
import { db } from '@/lib/db'
import CategoriesSwiper from '@/components/swipers/CategoriesSwiper'

interface Props {
  params: {
    c?: string
  }
}

const Category = async({ params }: Props) => {
  const categories = await db.category.findMany({
    where: { OR: [
      { id: params.c },
      { parentId: params.c }
    ] },
    include: {
      images: true,
    }
  })
  return (
    <div>
      <div className="col-span-full place-content-center">
      <h1 className="font-semibold text-xl ml-2 md:pl-8 py-4 bg-foreground">
        {categories[0].name}
      </h1>

        <CategoriesSwiper
          categories={categories.filter((category) => category.parentId )}
          className=''
        />
      </div>

    </div>
  )
}

export default Category