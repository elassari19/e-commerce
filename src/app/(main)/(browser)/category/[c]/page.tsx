import React from 'react'
import { db } from '@/lib/db'
import CategoriesSwiper from '@/components/swipers/CategoriesSwiper'
import ProductCard from '@/components/cards/ProductCard'
import { CustomTabs } from '@/components/ui/tabs'
import LoadMore from '@/components/atoms/LoadMore'
import { IProductData } from '@/types/products'

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

  const productsCategory = await db.product.findMany({
    where: { categoryId: params.c },
    include: {
      images: true,
      Category: true,
      properties: true,
      reviews: true
    },
    take: 10
  }) as IProductData[]

  return (
    <div>
      <div className="col-span-full place-content-center">
      <h1 className="font-semibold text-xl ml-2 md:pl-8 py-4 bg-foreground">
        {categories[0].name}
      </h1>

        <CategoriesSwiper
          categories={categories.filter((category) => category.parentId )}
          path='products'
        />
      </div>

      <section className='m-2 md:m-4 lg:m-8 my-4'>
        <div>
          {
            productsCategory.length > 0 ? (
              <CustomTabs
                tabList={["Top Seller", "Latest Product"]}
                tabContent={[
                  <LoadMore categoryId={params.c!} productsList={productsCategory} />,
                  <div key={"is-second"} className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center px-2">
                  {
                    productsCategory.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))
                  }
                  </div>
                ]}
              />  
            ) : (
              <div className="flex justify-center items-center h-64">
                <h1 className="text-2xl">No Product Found</h1>
              </div>
            )
          }
        </div>
        {/* <LoadMore categories={ids} /> */}
      </section>

    </div>
  )
}

export default Category