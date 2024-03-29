import React from 'react'
import { db } from '@/lib/db'
import CategoriesSwiper from '@/components/swipers/CategoriesSwiper'
import ProductCard from '@/components/cards/ProductCard'
import { CustomTabs } from '@/components/ui/tabs'
import { getProductsByCategory } from '../../../../../helpers/actions/Products'

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
  const ids = categories.filter((category) => category.parentId == params.c && category.id).map((category) => category.id)

  const products = await getProductsByCategory(ids)

  return (
    <div>
      <div className="col-span-full place-content-center">
      <h1 className="font-semibold text-xl ml-2 md:pl-8 py-4 bg-foreground">
        {categories[0].name}
      </h1>

        <CategoriesSwiper
          categories={categories.filter((category) => category.parentId )}
          path='product'
        />
      </div>

      <section className='m-2 md:m-4 lg:m-8 my-4'>
        <div>
          <CustomTabs
            tabList={["Top Seller", "Latest Product"]}
            tabContent={[
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center px-2">
                {
                  products.map((product) => (<ProductCard key={product.id} product={product} />))
                }
              </div>,
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center px-2">
              {
                products.map((product) => (<ProductCard key={product.id} product={product} />))
              }
            </div>
          ]}
          />
        </div>
      </section>

    </div>
  )
}

export default Category