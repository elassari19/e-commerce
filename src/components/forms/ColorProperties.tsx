import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { uploadImagesHandler } from "@/helpers/methods/uploadImagesHandler"
import { useEffect, useState } from "react"
import { ImageUrl } from "@prisma/client"


interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  colors: Partial<ImageUrl>[]
  setColors: (colors: Partial<ImageUrl>[]) => void
}

const ColorProperties = ({ colors, setColors }: Props) => {

  const [images, setImages] = useState<Partial<ImageUrl>[]>(colors)

  useEffect(() => {
    setColors(
      colors.map((p, n) => ({ ...p, ...images[n] } ))
    )
  }, [images])

  return (
    <>
    {
      colors.map((pro, index) => {
        return (
        <div
          key={"colors"+index.toString()}
          className="col-span-full grid md:grid-cols-12 items-start md:gap-4 my-1"
        >
          <label className="col-span-full md:col-span-4 text-sm ml-4">property {index+1}</label>
          <div className="col-span-full md:col-span-8 grid grid-cols-12 gap-2">
            {/* color name */}
            <div className="col-span-full md:col-span-3">
              <Input
                placeholder="name"
                onChange={(e) => 
                  setColors(
                    colors.map((p, n) => n == index ? { ...p, color: e.currentTarget.value } : p)
                  )
                }
                value={pro.color||""}
                className="text-sm"
              />
            </div>
            {/* images */}
            <div className="col-span-full md:col-span-6 flex">
              <Input
                placeholder="image"
                type="file"
                onChange={async (e) => await uploadImagesHandler(e, setImages)}
                // value={pro.image?.[0]?.name}
                className="text-sm flex-1"
              />
              
            </div>
            {/* quantety */}
            <div className="col-span-full md:col-span-2">
              <Input
                placeholder="quantity"
                onChange={(e) => {
                  setColors(
                    colors.map((p, n) => n == index ? { ...p, quantity: e.target.value } : p)
                  )
                }}
                value={pro.quantity||""}
                className="text-sm"
              />
            </div>
            {/* remove button */}
            <div className="col-span-full md:col-span-1">
              <Button
                variant="outline-destructive"
                size="sm"
                onClick={() => setColors(colors.slice(0, -1))}
                className="font-bold text-3xl h-10 rounded-full"
                disabled={colors.length-1 != index}
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
            onClick={() => setColors([...colors, {public_id: "", secure_url: "", color: "", quantity: ""}])}
          className="font-bold mt-4 md:mt-0"
        >
          Add Proporty
        </Button>
      </div>
    </>
  )
}

export default ColorProperties
