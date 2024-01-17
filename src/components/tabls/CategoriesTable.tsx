"use client"

import { Category } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Category[]
}

const CategoriesTable = ({ data }: Props) => {

  // Column Definitions: Defines & controls grid columns. 6553e8ec4db1a77643a3b479
  const colDefs = [
    { field: "id", checkboxSelection: true },
    { field: "createdAt" },
    { field: "name" },
    { field: "slug" },
    { field: "description", },
    { field: "Category",
      cellRenderer: (p: ICellRendererParams) => {
        return data.map(d => d.id === p.data.parentId && d.name)[0]
      }
    },
    { field: "createdBy", cellRenderer: (p: ICellRendererParams) => p.data.User?.email },
  ];

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="categories"
    /> 
  )
}

export default CategoriesTable
