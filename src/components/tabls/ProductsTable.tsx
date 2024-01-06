"use client"

import { Product } from "@prisma/client";
import Table from "./Table";
import View from "./View"
import { ICellRendererParams } from "ag-grid-community";
interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Product[]
}

const ProductsTable = ({ data }: Props) => {

  // structure head table
  const colDefs = [
    { field: "id", checkboxSelection: true },
    { field: "name" },
    { field: "description", },
    { field: "slug" },
    { field: "brand", cellRenderer: (p: ICellRendererParams) => p.data.Category.name },
    { field: "price" },
    { field: "quantity" },
    { field: "view", cellRenderer: View },
    // { field: "color" },
    { field: "createdAt" },
    { field: "userId" },
    // { field: "categoryId" },
  ];

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="products"
    /> 
  )
}

export default ProductsTable
