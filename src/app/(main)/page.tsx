import HeaderNav from "@/components/nav/HeaderNav"
import SearchProductsNav from "../../components/nav/SearchProductsNav"
import { db } from "../../lib/db"

interface Props {
  searchParams: {
    search?: string
    q?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: searchParams?.q, mode: "insensitive" } },
        { description: { contains: searchParams?.q, mode: "insensitive" } }
      ]
    },
    include: {
      images: true
    }
  })

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav>
          <SearchProductsNav
            products={products}
            searchQuery={searchParams?.q}
          />
        </HeaderNav>
      </div>
    </div>
  )
}
