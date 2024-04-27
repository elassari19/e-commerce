import { db } from "@/lib/db"
import { Suspense } from "react"
import ProductCard from "@/components/cards/ProductCard"
import CategoriesSwiper from "@/components/swipers/CategoriesSwiper"
import SuspenseRoot from "@/components/SuspenseRoot"
import { IProductData } from "../../../types/products"
import LoadMore from "../../../components/atoms/LoadMore"

export const dynamic = "force-dynamic"

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

  const categories = await db.category.findMany({
    include: {
      images: true
    }
  })

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-10 md:col-start-2 my-8">
        <Suspense fallback={<SuspenseRoot />}
        >
          {/* categories */}
          <div className="col-span-full place-content-center">
            <h1 className="font-bold text-lg pl-2 bg-foreground">
              Shop by categories
            </h1>

            <CategoriesSwiper
              categories={categories.filter((category) => category.parentId === "" )}
              path="category"
            />
          </div>
          <div className="">

            <h2 className="col-span-full font-bold text-lg">
              Popular Products for Daily Shopping
            </h2>
            <LoadMore
              categoryId={categories.map((category) => category.id && category.id)}
              productsList={products}
            />
          {/* {
            products.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
              />
            ))
          } */}
          </div>
        </Suspense>
      </div>
    </div>
  )
}
