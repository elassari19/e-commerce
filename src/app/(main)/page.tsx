import Link from "next/link"
import HeaderNav from "@/components/nav/HeaderNav"
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
        { name: { contains: searchParams?.q } },
        { description: { contains: searchParams?.q } }
      ]
    },
    include: {
      images: true
    }
  })

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav searchParams={searchParams} />
      </div>
    </div>
  )
}
