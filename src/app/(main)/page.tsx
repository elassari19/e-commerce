import HeaderNav from "@/components/nav/HeaderNav"
import SearchProductsNav from "../../components/nav/SearchProductsNav"
import { db } from "../../lib/db"
import { ImageUrl, Product } from "@prisma/client"

interface Props {
  searchParams: {
    search?: string
    q?: string
  }
}

export default async function Home({ searchParams }: Props) {

  const getSearchProducts = () => {
    return new Promise((resolve) =>
      resolve(
        setTimeout(() => {
          db.product.findMany({
            where: {
              OR: [
                { name: { contains: searchParams?.q, mode: "insensitive" } },
                { description: { contains: searchParams?.q, mode: "insensitive" } }
              ]
            },
            include: { images: true }
          })
        } , 1000)
    ))
  }
  const products = await getSearchProducts() as Partial<Product& { images: ImageUrl[]}>[]

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav>
          <SearchProductsNav
            products={products || []}
            searchQuery={searchParams?.q}
          />
        </HeaderNav>
      </div>
    </div>
  )
}
