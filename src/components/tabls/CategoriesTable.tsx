"use client"

import { Category } from "@prisma/client";
import Table from "./Table";

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
    { field: "parentId" },
    { field: "createdBy" },
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
