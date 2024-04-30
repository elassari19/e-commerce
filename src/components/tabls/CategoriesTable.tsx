"use client"

import { Category } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";
import CategoryForm from "../forms/CategoryForm";
import EditButtons from "./EditButtons";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Category[]
}

const CategoriesTable = ({ data }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [take, setPageSize] = useState(20)

  // const getCategories = async () => {
  //   const res = await fetch(`/api/dashboard/categories?page=${page}&take=${take}`, {
  //     method: "GET",
  //   })
  //   const data = await res.json()

  //   setCategories(data["categories"][1])
  //   setCount(data["categories"][0])
  // }

  // useEffect(() => {
  //   getCategories()
  // }, [page, take])

  // Column Definitions: Defines & controls grid columns. 6553e8ec4db1a77643a3b479
  const colDefs = [
    { field: "id", checkboxSelection: true, width: 50},
    { field: "createdAt" },
    { field: "name" },
    { field: "slug" },
    { field: "description", },
    { field: "Category",
      cellRenderer: (p: ICellRendererParams) => {
        return data?.map(d => d.id === p.data.parentId && d.name)
      }
    },
    { field: "createdBy", cellRenderer: (p: ICellRendererParams) => p.data.User?.email },
    { 
      field: "Edit",
      cellRenderer: (p: ICellRendererParams) => (
        <div className="flex items-center justify-around">
          <DeleteButton p={p} route="categories" />
          <EditButtons Form={CategoryForm} data={data} p={p} />
        </div>
      ),
      width: 150
    }
  ];

  // if(!categories?.length) return null

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      pageSize={take}
      setPageSize={setPageSize}
      action="categories"
    /> 
  )
}

export default CategoriesTable
