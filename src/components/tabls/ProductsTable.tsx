"use client"

import { Category, Product } from "@prisma/client";
import Table from "./Table";
import View from "./View"
import { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import EditButtons from "./EditButtons";
import ProductForm from "../forms/ProductForm";
import DeleteButton from "./DeleteButton";
import { useState } from "react";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Product[]
  categories: Category[]
}

const ProductsTable = ({ data, categories }: Props) => {
  const [take, setPageSize] = useState(20)

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
    { field: "brand", cellRenderer: (p: ICellRendererParams) => p.data?.Category?.name, width: 100 },
    { field: "price", width: 100 },
    { field: "quantity", width: 100 },
    { field: "tags", cellRender: (p: ICellRendererParams) => p.data.tags.join(", "), width: 250},
    { field: "createdBy", cellRenderer: (p: ICellRendererParams) => p.data?.User?.email },
    { 
      field: "Edit",
      cellRenderer: (p: ICellRendererParams) => (
        <div className="flex items-center justify-around">
          <View {...p} />
          <EditButtons Form={ProductForm} data={categories} p={p} />
          <DeleteButton p={p} route="products" />
        </div>
      ), width: 150
    }
  ];

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      pageSize={take}
      setPageSize={setPageSize}
      action="products"
    /> 
  )
}

export default ProductsTable
