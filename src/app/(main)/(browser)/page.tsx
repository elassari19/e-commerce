import dynamic from 'next/dynamic'

import { db } from "@/lib/db"
import { IProductData } from "@/types/products"
import { getRootCategories } from '@/helpers/actions/categories'
import SwiperSuspense from '@/components/suspense/SwiperSuspense'
import CategoriesSwiper from '@/components/swipers/CategoriesSwiper'

const DynamicLoadMore = dynamic(() => import("@/components/atoms/LoadMore"), {
  loading: () => <SwiperSuspense />,
  ssr: false
})


interface Props {
  searchParams: {
    search?: string
    q?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const products = await db.product.findMany({
    include: {
      images: true,
      properties: true,
      reviews: true,
    },
    take: 10
  }) as IProductData[]

  const categories = await getRootCategories()

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-10 md:col-start-2 my-8">
        {/* categories */}
        <div className="col-span-full place-content-center">
          <h1 className="font-bold text-lg pl-2">
            Shop by categories
          </h1>
          <CategoriesSwiper
            path="category"
          />
        </div>

        <div className="">
          <h2 className="col-span-full font-bold text-lg">
            Popular Products for Daily Shopping
          </h2>
          <DynamicLoadMore
            categoryId={categories.map((category) => category.id && category.id)}
            productsList={products}
          />
        </div>
      </div>
    </div>
  )
}
