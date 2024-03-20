"use client"

import { Category } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Pen, Trash2 } from "lucide-react";
import DialogForm from "../modals/DialogForm";
import CategoryForm from "../forms/CategoryForm";
import DialogPopup from "../DialogPopup";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { deleteItems } from "@/helpers/actions/dashboardActions";
import toast from "react-hot-toast";
import { categoriesType } from "@/types/categories";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Category[]
  updateData: (values: categoriesType&{id: string}, action: string) => Promise<any>
}

const CategoriesTable = ({ data, updateData }: Props) => {

  const [rowData, setRowData] = useState<Category[]>([]);

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
        <DialogForm
          sheetTitle="Add Category"
          sheetDescription="Add your Category and necessary information from here"
          sheetTrigger={<Pen size={25} className="text-gray-500 ml-4 my-1 cursor-pointer" />}
          sheetContent={<CategoryForm categories={data} updateCategory={p.data} updateData={updateData} />}
          className="w-full md:w-3/4"
        />
      ),
      width: 100
    },
    { field: "Delete", cellRenderer: (p: ICellRendererParams) => (
        <DialogPopup
          dialogTrigger={<Trash2 size={25} className="text-destructive ml-4 my-1" />}
          dialogTitle={<p className="text-destructive">Confirm Delete Category Warning</p>}
          className='w-96 md:w-1/2 lg:w-1/3'
          dialogContent={<div className="flex flex-col gap-2">
            <p className="text-sm font-bold">By deleting the (<strong className="text-primary-dark">{p.data.name}</strong>) Category all relay categories and products will be deleting too</p>
            <div className="flex gap-8 items-center mt-8">
              <Button variant="destructive" onClick={() => deleteCategory(p.data)}>Delete</Button>
              <Button variant="outline">
                <DialogClose>Cancel</DialogClose>
              </Button>
            </div>
          </div>}
        />
      ), width: 100
    }
  ];

  useEffect(() => {
    setRowData(data)
  }, [data])

  const deleteCategory = async (data: Category) => {
    const res = await deleteItems([data.id], "categories")
    if(res < 400) {
      toast.success(`${data.name} category deleted successfully`)
      return
    }
    toast.error(`${data.name} category deleted failed`)
  }

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="categories"
    /> 
  )
}

export default CategoriesTable
