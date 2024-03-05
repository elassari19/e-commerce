import { db } from "@/lib/db"
import { Suspense } from "react"
import ProductCard from "@/components/cards/ProductCard"
import { brand } from "@/assets/brand"
import CategoriesSwiper from "@/components/swipers/CategoriesSwiper"
import { Loader2 } from "lucide-react"

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

  const categories = await db.category.findMany()

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-10 md:col-start-2 my-8">
        <Suspense fallback={
            <div className="w-[100vw] h-[80vh] justify-center items-center text-9xl">
              <Loader2 className="h-48 w-48 animate-spin ease-in-out text-primary font-extrabold" />
            </div>
          }
        >
          {/* categories */}
          <div className="col-span-full place-content-center">
            <h1 className="font-bold text-xl">
              Shop by categories
            </h1>

            <CategoriesSwiper categories={categories.filter((category) => category.parentId === "" )} />
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center">

            <h2 className="col-span-full font-bold text-xl">
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
