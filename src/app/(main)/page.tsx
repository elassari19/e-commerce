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


export default async function Home({ searchParams }: Props) {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav />
      </div>
    </div>
  )
}
