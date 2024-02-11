"use client"

import { Product } from "@prisma/client";
import Table from "./Table";
import View from "./View"
import { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Product[]
}

const ProductsTable = ({ data }: Props) => {

  // structure head table
  const colDefs = [
    { field: "id", checkboxSelection: true },
    { field: "images",
      cellRenderer: (p: ICellRendererParams) => 
        <div className="h-full w-full flex justify-center items-center">
          {p.data.images.map((item: any, idx: string) =>
            <Image key={idx} src={item.secure_url} alt={item.secure_url} width={40} height={30} />)
          }
        </div>,
      editable: false
    },
    { field: "name" },
    { field: "description", },
    { field: "slug" },
    { field: "brand", cellRenderer: (p: ICellRendererParams) => p.data?.Category?.name },
    { field: "price" },
    { field: "quantity" },
    { field: "view", cellRenderer: View },
    // { field: "color" },
    { field: "createdAt" },
    { field: "createdBy", cellRenderer: (p: ICellRendererParams) => p.data?.User?.email },
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
