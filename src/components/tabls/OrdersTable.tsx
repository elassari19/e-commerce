"use client"

import { cn } from "@/lib/utils"
import { useMemo, useState } from "react";
import Link from "next/link";
import { ZoomInIcon } from "lucide-react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-enterprise"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data?: any
}

const OrdersTable = ({ className, data }: Props) => {

  const [rowData, setRowData] = useState(data?.orders.map((item: any) => {
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
  }));

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "INVOICE NO", checkboxSelection: true },
    { field: "ORDER TIME", width: 200 },
    { field: "CUSTOMER NAME" },
    { field: "METHOD" },
    { field: "AMOUNT", cellRenderer: ({value}: {value: any}) => <span>${value}</span> },
    { field: "STATUS" },
    { field: "ACTION", editable: true },
    { field: "INVOICE", cellRenderer: () => <Link href={"/order/10631"} className="h-full flex items-center justify-center"><ZoomInIcon /></Link> },
  ]);
  const defaultColDef = useMemo(() => ({
    filter: true, // Enable filtering on all columns
    onSelectionChanged: true,
    width: 140
  }), [])

  return <div className={cn("ag-theme-quartz min-h-screen", className)} style={{ height: 100 }}>
    <AgGridReact
      defaultColDef={defaultColDef}
      rowData={rowData}
      // @ts-ignore
      columnDefs={colDefs}
      onCellValueChanged={(e) => console.log("changed", e)}
      pagination={true}
      rowSelection="multiple"
      className="h-full"
    /> 
  </div>
}

export default OrdersTable