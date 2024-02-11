import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import { productHandler } from "../../store/dashboard/product"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
}

const ColorProperties = ({ }: Props) => {
  const dispatch = useDispatch()
  const { properties } = useSelector((state: RootState) => state.product)

  const propertiesHandler = (data: {}, index: number) => {
    const updateData = properties.map((pro, idx) => (
      idx == index 
        ? { ...pro, ...data }
        : pro
    ))
    dispatch(productHandler({// save the image to the global state
      properties: updateData
    }))
  }

  const uploader = async (e: any, index: number) => [...e.currentTarget.files].map(async (fl: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      propertiesHandler({ secure_url: URL.createObjectURL(fl), file: reader.result }, index)
    }
    reader.readAsDataURL(fl)
  })

  return (
    <>
    {
      properties.map((pro, index) => {
        return (
        <div
          key={"colors"+index.toString()}
          className="col-span-full grid md:grid-cols-12 items-start md:gap-4 my-1"
        >
          <label className="col-span-full md:col-span-4 text-sm ml-4">color {index+1}</label>
          <div className="col-span-full md:col-span-8 grid grid-cols-12 gap-2">
            {/* color name */}
            <div className="col-span-full md:col-span-3">
              <Input
                placeholder="name"
                onChange={(e) => propertiesHandler({ color: e.target.value }, index)}
                value={pro.color||""}
                className="text-sm"
              />
            </div>
            {/* images */}
            <div className="col-span-full md:col-span-6 flex">
              <Input
                placeholder="image"
                type="file"
                onChange={async (e) => await uploader(e, index)}
                // value={pro.image?.[0]?.name}
                className="text-sm flex-1"
              />
              
            </div>
            {/* quantety */}
            <div className="col-span-full md:col-span-2">
              <Input
                placeholder="quantity"
                onChange={(e) => propertiesHandler({ quantity: e.target.value }, index)}
                value={pro.quantity||""}
                className="text-sm"
              />
            </div>
            {/* remove button */}
            <div className="col-span-full md:col-span-1">
              <Button
                variant="outline-destructive"
                size="sm"
                onClick={() => dispatch(productHandler({
                  properties: properties.length > 1
                    ? properties.filter((_, idx) => idx != index)
                    : [{ public_id: "", secure_url: "", color: "", quantity: "" }]
                }))}
                className="font-bold text-3xl h-10 rounded-full"
                disabled={properties.length-1 != index}
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      )})
    }
      <div className="col-span-full md:col-span-2 md:col-start-11 mt-2">
        <Button
          variant="primary"
            onClick={() => dispatch(productHandler(
              { properties: [...properties, { public_id: "", secure_url: "", color: "", quantity: "" }]}
          ))}
          className="mt-4 md:mt-0"
        >
          <Plus size={18}/> Add Color
        </Button>
      </div>
    </>
  )
}

export default ColorProperties
