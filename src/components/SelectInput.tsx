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
}

const SelectInput = ({ placeholder, data, onSelect }: Props) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className={cn("w-full")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {/* {selectTrigger} */}
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
