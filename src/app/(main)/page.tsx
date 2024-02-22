import Link from "next/link"
import HeaderNav from "@/components/nav/HeaderNav"
import SearchProductsNav from "../../components/nav/SearchProductsNav"

interface Props {
  searchParams: {
    search?: string
    q?: string
  }
}

export default function Home({ searchParams }: Props) {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav>
          <SearchProductsNav
            products={[]}
            searchQuery={searchParams?.q}
          />
        </HeaderNav>
      </div>
    </div>
  )
}
