import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus, X } from "lucide-react"

type Tpro = {
  name: string
    value: string
}

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  properties: Tpro[]
  setProperties: (properties: Tpro[]) => void
}

const OptionsProperties = ({ properties, setProperties }: Props) => {
  return (
    <>
    {
      properties.map((pro, index) => {
        return (
        <div
          key={properties+index.toString()}
          className="col-span-full grid md:grid-cols-12 items-start md:gap-4 my-1"
        >
          <label className="col-span-full md:col-span-4 text-sm ml-4">property {index+1}</label>
          <div className="col-span-full md:col-span-8 grid grid-cols-12 gap-4">
            <div className="col-span-full md:col-span-5">
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
            <div className="col-span-full md:col-span-5">
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
            {/* remove option button */}
            <div className="col-span-full md:col-span-2 px-4">
              <Button
                variant="outline-destructive"
                onClick={() => setProperties(properties.slice(0, -1))}
                className="font-extrbold text-3xl h-10 rounded-full"
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
          onClick={() => setProperties([...properties, {name: "", value: ""}])}
          className="mt-4 md:mt-0"
        >
          <Plus size={18}/> Add Proporty
        </Button>
      </div>
    </>
  )
}

export default OptionsProperties