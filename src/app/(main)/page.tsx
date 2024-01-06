import { GridStack } from "@/components/layout"
import StoryTypography from "../../components/storybook/StoryTypography"
import Link from "next/link"

interface Props {
  searchParams: {
    search?: string
  }
}

export default function Home({ searchParams }: Props) {

  return (
    <GridStack className="grid-cols-1 md:grid-cols-12 my-10">
      <div className="col-span-12 col-start-2">
        <Link href="/dashboard" className="text-primary font-bold">Go to dashboard</Link>
      </div>
    </GridStack>
  )
}
