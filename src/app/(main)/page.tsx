import Link from "next/link"
import HeaderNav from "@/components/nav/HeaderNav"

interface Props {
  searchParams: {
    search?: string
  }
}

export default function Home({ searchParams }: Props) {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-primary-foreground text-white">
        <HeaderNav />
      </div>
    </div>
  )
}
