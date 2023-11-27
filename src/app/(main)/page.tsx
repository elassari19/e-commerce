import { GridStack } from "@/components/layout"
import StoryTypography from "../../components/storybook/StoryTypography"

interface Props {
  searchParams: {
    search?: string
  }
}

export default function Home({ searchParams }: Props) {

  return (
    <GridStack className="grid-cols-1 md:grid-cols-12">
      <div className="col-span-12">
        <StoryTypography />
      </div>
    </GridStack>
  )
}
