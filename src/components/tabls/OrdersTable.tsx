"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { ZoomInIcon } from "lucide-react";
import Table from "./Table";
// import "ag-grid-enterprise"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data?: any
}

const OrdersTable = ({ className, data }: Props) => {

  const rowData = data?.orders.map((item: any) => {
    return ({
      "INVOICE NO": item._id,
      "ORDER TIME": item.updatedAt,
      "CUSTOMER NAME": item.user_info.name,
      METHOD: item.paymentMethod,
      AMOUNT: item.total,
      STATUS: item.status,
      ACTION: item.status,
      INVOICE: ""
    })
  });

  // Column Definitions: Defines & controls grid columns.
  const colDefs = [
    { field: "INVOICE NO", checkboxSelection: true },
    { field: "ORDER TIME", width: 200 },
    { field: "CUSTOMER NAME" },
    { field: "METHOD" },
    { field: "AMOUNT", cellRenderer: ({value}: {value: any}) => <span>${value}</span> },
    { field: "STATUS" },
    { field: "ACTION", editable: true },
    { field: "INVOICE", cellRenderer: () => <Link href={"/order/10631"} className="h-full flex items-center justify-center"><ZoomInIcon /></Link> },
  ];

  return (
    <Table
      rowsData={rowData}
      colsDefs={colDefs}
      action="order"
    /> 
  )
}

export default OrdersTable