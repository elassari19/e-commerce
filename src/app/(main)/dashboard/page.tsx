import { BadgeAlert, BadgeCheck, BadgeDollarSign, CalendarClock, Car, Check, RefreshCcw, ShoppingCart } from "lucide-react"
import CardOverview from "../../../components/cards/CardOverview"
import Typography from "../../../components/layout/typography"
import GridContainer from "../../../components/layout/GridContainer"
import CardOrders from "../../../components/cards/CardOrders"
import GridItems from "../../../components/layout/GridItems"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const page = ({  }: Props) => {
  return <main className="min-h-screen p-8 py-4">
    <section className="flex flex-col gap-6">
      <Typography heading="h2" className="font-bold text-lg text-secondary">Dashboard Overview</Typography>
      <GridContainer>
      {
        [
          { Icon: BadgeAlert, title: "Total Orders", amount: 3434.45, cash: 34, card: 87, credit: 93, variant: "primaryDark" },
          { Icon: BadgeDollarSign, title: "Yesterday Orders", amount: 3434.45, cash: 34, card: 87, credit: 93, variant: "warning" },
          { Icon: BadgeCheck, title: "This Month", amount: 3434.45, cash: 34, card: 87, credit: 93, variant: "info" },
          { Icon: ShoppingCart, title: "Last Month", amount: 3434.45, variant: "infoDark" },
          { Icon: CalendarClock, title: "All-Time Sales", amount: 3434.45, variant: "primary" },
        ].map((item, idx) => (
          <GridItems key={idx}>
            {/* @ts-ignore */}
            <CardOverview {...item} className="w-full h-full"/>
          </GridItems>
        ))
      }
      </GridContainer>
      <GridContainer className="lg:grid-cols-12 xl:grid-cols-12">
        {
          [
            { variant: "orange", Icon: ShoppingCart, status: "Total Order", total: "625" },
            { variant: "info", Icon: RefreshCcw, status: "Total Order", total: "625", amount: 458054.45 },
            { variant: "infoDark", Icon: Car, status: "Total Order", total: "625" },
            { variant: "primary", Icon: Check, status: "Total Order", total: "625" },
          ].map((item, idx) => (
            <GridItems key={idx} className="md:col-span-3 xl:col-span-3">
              {/* @ts-ignore */}
              <CardOrders {...item} className="h-full" />
            </GridItems>
          ))
        }
      </GridContainer>
    </section>
  </main>
}

export default page