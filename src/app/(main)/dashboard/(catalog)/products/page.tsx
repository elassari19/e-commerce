import Typography from "@/components/layout/typography"
import { Button } from "@/components/ui/button"
import MainCard from "@/components/cards/MainCard"
import { Download, Plus, Trash2, Upload } from "lucide-react"
import OrdersTable from "@/components/tabls/OrdersTable"
import fakeData from "@/helpers/constants/fakeData.json"
import DeleteButtons from "@/components/buttons/DeleteButtons"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const page = ({  }: Props) => {
  return (
    <main className="min-h-screen flex flex-col gap-4 p-8 px-4">
      <Typography heading="h2" className="font-semibold text-lg">Products</Typography>

      {/* event section */}
      <section>
        <MainCard className="grid grid-cols-12 gap-4 justify-between">
        <div className="md:col-span-6 grid grid-cols-12 col-span-12 md:grid-cols-10 gap-1">
          <div className="col-span-6 md:col-span-2">
            <Button variant="outline"><Upload size={16} /> Export</Button>
          </div>
          <div className="col-span-6 md:col-span-2">
            <Button variant="outline"><Download size={16} /> Import</Button>
          </div>
        </div>
        <div className="md:col-span-6 grid grid-cols-12 col-span-12 gap-1">
          <DeleteButtons action="products" />
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <Button variant="primary"><Plus size={16} /> Add Product</Button>
          </div>
        </div>
        </MainCard>
      </section>

      <OrdersTable data={fakeData} action="products" />
    </main>
  )
}

export default page