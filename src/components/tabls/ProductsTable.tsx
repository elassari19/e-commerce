"use client"

import { Product } from "@prisma/client";
import Table from "./Table";

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
    { field: "brand" },
    { field: "price" },
    { field: "quantity" },
    { field: "tags" },
    { field: "barcode" },
    { field: "size" },
    { field: "color" },
    { field: "createdAt" },
    { field: "userId" },
    { field: "categoryId" },
  ];

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="categories"
    /> 
  )
}

export default ProductsTable
