import { GridStack } from "@/components/layout"

interface Props {
  searchParams: {
    search?: string
  }
}

export default function Home({ searchParams }: Props) {

  return (
    <GridStack className="grid-cols-1 md:grid-cols-12">
    </GridStack>
  )
}
