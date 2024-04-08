import { db } from "@/lib/db"
import { Suspense } from "react"
import ProductCard from "@/components/cards/ProductCard"
import CategoriesSwiper from "@/components/swipers/CategoriesSwiper"
import SuspenseRoot from "@/components/SuspenseRoot"

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
      images: true
    }
  })

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
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center px-2">

            <h2 className="col-span-full font-bold text-lg">
              Popular Products for Daily Shopping
            </h2>
          {
            products.map((product) => (<ProductCard key={product.id} product={product} />))
          }
          </div>
        </Suspense>
      </div>
    </div>
  )
}
