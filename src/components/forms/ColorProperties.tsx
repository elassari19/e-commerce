import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import { uploadImagesHandler } from "@/helpers/methods/uploadImagesHandler"
import { useEffect, useState } from "react"
import { Properties } from "@prisma/client"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  properties: Partial<Properties>[]
  setProperties: (properties: Partial<Properties>[]) => void
}

const ColorProperties = ({ properties, setProperties }: Props) => {

  const [images, setImages] = useState<Partial<Properties>[]>([])
// console.log("images", properties, images)
  useEffect(() => {
    setProperties(
      properties.map((p, n) => ({ ...p, ...images[n] } ))
    )
  }, [images])

  return (
    <div className="col-span-full grid grid-cols-12 my-2">
    {
      properties.map((pro, index) => {
        return (
        <div
          key={"properties"+index.toString()}
          className="col-span-full grid md:grid-cols-12 items-start md:gap-4 my-1"
        >
          <label className="col-span-full md:col-span-1 text-sm ml-4"></label>
          <div className="col-span-full md:col-span-11 grid grid-cols-12 gap-1">
            {/* property name */}
            <div className="col-span-full md:col-span-3">
              <Input
                placeholder="color"
                onChange={(e) => 
                  setProperties(
                    properties.map((p, n) => n == index ? { ...p, color: e.currentTarget.value } : p)
                  )
                }
                value={pro.color||""}
                className="text-sm text-black"
              />
            </div>
            {/* quantety */}
            <div className="col-span-full md:col-span-2">
              <Input
                placeholder="quantity"
                onChange={(e) => {
                  setProperties(
                    properties.map((p, n) => n == index ? { ...p, quantity: e.target.value } : p)
                  )
                }}
                value={pro.quantity||""}
                className="text-sm text-black"
              />
            </div>
            {/* images */}
            <div className="col-span-full md:col-span-6 flex">
              <Input
                placeholder="image"
                type="file"
                onChange={async (e) => await uploadImagesHandler(e, setImages)}
                // value={pro.image?.[0]?.color}
                className="text-sm text-black flex-1"
              />
              
            </div>
            {/* remove button */}
            <div className="col-span-full md:col-span-1">
              <Button
                variant="outline-destructive"
                size="sm"
                onClick={() => setProperties(properties.length > 1 ? properties.slice(0, -1) : [{ color: "", quantity: "" }] )}
                className="font-bold text-3xl h-10 rounded-full"
                disabled={properties.length - 1 != index}
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      )})
    }
      <div className="col-span-full md:col-span-3 md:col-start-10 mt-2">
        <Button
          variant="primary"
            onClick={() => setProperties([...properties, { color: "", quantity: "" }]) }
          className="mt-4 md:mt-0"
        >
          <Plus size={18}/> Add Color
        </Button>
      </div>
    </div>
  )
}

export default ColorProperties