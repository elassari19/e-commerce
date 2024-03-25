"use client"

import { Category } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";
import CategoryForm from "../forms/CategoryForm";
import { Button } from "../ui/button";
import { deleteItems } from "@/helpers/actions/dashboardActions";
import toast from "react-hot-toast";
import { categoriesType } from "@/types/categories";
import EditButtons from "./EditButtons";
import DeleteButton from "./DeleteButton";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Category[]
  updateData: (values: categoriesType&{id: string}, action: string) => Promise<any>
}

const CategoriesTable = ({ data, updateData }: Props) => {

  // Column Definitions: Defines & controls grid columns. 6553e8ec4db1a77643a3b479
  const colDefs = [
    { field: "id", checkboxSelection: true, width: 50},
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
        <EditButtons Form={CategoryForm} data={data} p={p} updateData={updateData} />
      ),
      width: 100
    },
    { field: "Delete", cellRenderer: (p: ICellRendererParams) => (
      <DeleteButton p={p} route="categories" />
      ), width: 100
    }
  ];

  // const deleteCategory = async (data: Category) => {
  //   const res = await deleteItems([data.id], "categories")
  //   if(res < 400) {
  //     toast.success(`${data.name} category deleted successfully`)
  //     return
  //   }
  //   toast.error(`${data.name} category deleted failed`)
  // }

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="categories"
    /> 
  )
}

export default CategoriesTable
