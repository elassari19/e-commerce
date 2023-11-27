import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RowStack } from "./layout"

interface Props {
  children?: React.ReactNode
  defaultValue: React.ReactNode
  items: any[]
}

const SelectInput = ({ children, defaultValue, items }: Props) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{defaultValue}</SelectLabel>
          {children}
          {
            items.map((item, idx) => (<SelectItem key={idx} value={item.name}>
              <RowStack className="gap-4">
                <span>{item.flag}</span>
                <span>{item.name}</span>
              </RowStack>
            </SelectItem>))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectInput
