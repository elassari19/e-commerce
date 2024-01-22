import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "../lib/utils"

interface Props {
  placeholder: React.ReactNode
  children?: React.ReactNode
  data: any[]
  onSelect: (event: any) => void
  value?: string
}

const SelectInput = ({ placeholder, data, onSelect, value }: Props) => {
  return (
    <Select onValueChange={onSelect} defaultValue={value}>
      <SelectTrigger className={cn("w-full")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {/* {render select options} */}
          {
            data.map((item, idx) => (
              <SelectItem key={idx} value={item.slug}>
                {item.slug}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectInput
