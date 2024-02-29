import HeaderNav from "@/components/nav/HeaderNav"
import { db } from "../../../lib/db"
import { Suspense } from "react"
import ProductCard from "@/components/cards/ProductCard"

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

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-10 md:col-start-2 my-8">
        <Suspense fallback={
            <div className="w-full h-full text-9xl text-black">loading ...</div>
          }
        >
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
            <h1 className="col-span-full font-bold text-xl">
              Shop by categories
            </h1>

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
