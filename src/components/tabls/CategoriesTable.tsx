"use client"

import { Category } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import DialogForm from "../modals/DialogForm";
import CategoryForm from "../forms/CategoryForm";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Category[]
}

const CategoriesTable = ({ data }: Props) => {

  const [rowData, setRowData] = useState<Category[]>([]);

  // Column Definitions: Defines & controls grid columns. 6553e8ec4db1a77643a3b479
  const colDefs = [
    { field: "id" },
    { field: "createdAt" },
    { field: "name" },
    { field: "slug" },
    { field: "description", },
    { field: "Category",
      cellRenderer: (p: ICellRendererParams) => {
        return data.map(d => d.id === p.data.parentId && d.name)
      }
    },
    { field: "createdBy", cellRenderer: (p: ICellRendererParams) => p.data.User?.email },
    { 
      field: "Edit",
      cellRenderer: (p: ICellRendererParams) => (
        <DialogForm
          sheetTitle="Add Category"
          sheetDescription="Add your Category and necessary information from here"
          sheetTrigger={<Pen size={30} className="text-primary" />}
          sheetContent={<CategoryForm categories={data} updateCategory={p.data} />}
          className="w-full md:w-3/4"
        />
      ) 
    },
  ];

  useEffect(() => {
    setRowData(data)
  }, [data])

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="categories"
    /> 
  )
}

export default CategoriesTable
