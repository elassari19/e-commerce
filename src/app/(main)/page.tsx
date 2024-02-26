import HeaderNav from "@/components/nav/HeaderNav"
import SearchProductsNav from "@/components/nav/SearchProductsNav"
import { db } from "@/lib/db"
import { ImageUrl, Product } from "@prisma/client"

interface Props {
  searchParams: {
    search?: string
    q?: string
  }
}

const getProducts = (search: string) => {
  const products = db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ]
    },
    include: {
      images: true
    }
  })
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(products)
    }, 500)
  )
}

export default async function Home({ searchParams }: Props) {
  let products: Partial<Product& { images: ImageUrl[]}>[] = []

  try {
    if(searchParams?.q && searchParams?.q?.length > 2) {
      products = await getProducts(searchParams.q) as Partial<Product& { images: ImageUrl[]}>[]
    }
  } catch (error) {
    products = []
    console.error('Error fetching products', error)
  }
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
