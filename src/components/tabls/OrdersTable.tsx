"use client"

import { cn } from "@/lib/utils"
import { useMemo, useState } from "react";
import Link from "next/link";
import { ZoomInIcon } from "lucide-react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { useDispatch, useSelector } from "react-redux";
import { dashboardHandler } from "@/store/dashboard";
import { RootState } from "@/store";
import { Action } from "@/store/actions/dashboardStoreActions";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import "ag-grid-enterprise"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data?: any
  action: Action
}

const OrdersTable = ({ className, data, action }: Props) => {

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

  // @ts-ignore select state based on state name ex: state.dashboard.catagories
  const dashboard = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()

  const handleCheckRow = (e: any) => {
    const product = e.node.selected
        // insert select item
      ? dashboard?.remove ? [ ...dashboard?.remove, e.data] : [e.data]
        // remove select item
      : dashboard.remove.filter((pre: any) => e.data["INVOICE NO"] != pre["INVOICE NO"])

      return dispatch(dashboardHandler({ [action]: { ...dashboard, remove: product } }))
  }
  const handleClickCheckRow = (e: any) => {
      return dispatch(dashboardHandler({ [action]: { ...dashboard, remove: [e.data] } }))
  }

  return <div className={cn("ag-theme-quartz min-h-screen", className)} style={{ height: 100 }}>
    <AgGridReact
      defaultColDef={defaultColDef}
      rowData={[...rowData, ...rowData, ...rowData, ...rowData, ...rowData]}
      
      // @ts-ignore
      columnDefs={colDefs}
      onCellValueChanged={(e) => console.log("changed", e)}
      onCellClicked={handleClickCheckRow}
      onRowSelected={handleCheckRow}
      pagination={true}
      rowSelection="multiple"
      className="h-full"
      paginationPageSize={20}
      onPaginationChanged={e => console.log(e)}
    /> 
  </div>
}

export default OrdersTable