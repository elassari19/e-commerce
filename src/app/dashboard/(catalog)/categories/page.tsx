import Typography from "@/components/layout/typography"
import { Button } from "@/components/ui/button"
import MainCard from "@/components/cards/MainCard"
import { Download, Plus, Trash2, Upload } from "lucide-react"
import CategoriesTable from "@/components/tabls/CategoriesTable"
import DeleteButtons from "@/components/buttons/DeleteButtons"
import DialogForm from "@/components/modals/DialogForm"
import CategoryForm from "@/components/forms/CategoryForm"
import { db } from "@/lib/db"
import { createNewData, deleteItems, updateData } from "@/helpers/actions/dashboardActions"

interface Props {}

const page = async ({  }: Props) => {
  const categories = await db.category.findMany({
    include: {
      User: { select: { id: true, email: true } },
      images: true
    }
  })
  // console.log("categories", categories)
  return (
    <main className="min-h-screen flex flex-col gap-4 p-8 px-4">
      <Typography heading="h2" className="font-semibold text-lg">Category</Typography>

      {/* event section */}
      <section>
        <MainCard className="grid grid-cols-12 gap-4 justify-between">
        <div className="md:col-span-6 grid grid-cols-12 col-span-12 md:grid-cols-10 gap-1">
          <div className="col-span-6 md:col-span-2">
            {/* export products to file (excel) */}
            <Button variant="outline"><Upload size={16} /> Export</Button>
          </div>
          <div className="col-span-6 md:col-span-2">
            {/* upload products based on sheet (excel) */}
            <Button variant="outline"><Download size={16} /> Import</Button>
          </div>
        </div>
        <div className="md:col-span-6 grid grid-cols-12 col-span-12 gap-1">
          {/* delete selected products */}
          <DeleteButtons action="categories" deleteItems={deleteItems} />
          {/* add product button & open dialog (modal/sheet) when click */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <DialogForm
              sheetTitle="Add Category"
              sheetDescription="Add your Category and necessary information from here"
              sheetTrigger={<Button variant="primary"><Plus size={16} /> Add Category</Button>}
              sheetContent={
                <CategoryForm categories={categories} createNewData={createNewData} />}
              className="w-full md:w-3/4"
            />
          </div>
        </div>
        </MainCard>
      </section>

      <section>
        <CategoriesTable data={categories} updateData={updateData} />
      </section>
    </main>
  )
}

export default page
