import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { X } from "lucide-react"

type Tpro = {
  name: string
    value: string
}

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  properties: Tpro[]
  setProperties: (properties: Tpro[]) => void
}

const Properties = ({ properties, setProperties }: Props) => {
  return (
    <>
    {
      properties.map((pro, index) => {
        return (
        <div
          key={properties+index.toString()}
          className="col-span-full grid md:grid-cols-12 items-start md:gap-4 my-1"
        >
          <div className="col-span-full md:col-span-3">
            <label className="col-span-full text-sm ml-4">property {index+1}</label>
          </div>
          <div className="col-span-full md:col-span-4">
            <Input
              placeholder="name"
              onChange={(e) => 
                setProperties(
                  properties.map((p, n) => n == index ? { name: e.target.value, value: p.value } : p)
                )
              }
              value={pro.name}
              className="text-sm"
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <Input
              placeholder="value"
              onChange={(e) => {
                setProperties(
                  properties.map((p, n) => n == index ? { name: pro.name, value: e.target.value } : p)
                )
              }}
              value={pro.value}
              className="text-sm"
            />
          </div>
          <div className="col-span-full md:col-span-1">
            <Button
              variant="destructive"
              onClick={() => setProperties(properties.slice(0, -1))}
              className="font-bold text-3xl h-10"
              disabled={properties.length-1 != index}
            >
              <X />
            </Button>
          </div>
        </div>
      )})
    }
      <div className="col-span-full md:col-span-3 md:col-start-10">
        <Button
          variant="primary"
          onClick={() => setProperties([...properties, {name: "", value: ""}])}
          className="font-bold mt-4 md:mt-0"
        >
          Add Proporty
        </Button>
      </div>
    </>
  )
}

export default Properties