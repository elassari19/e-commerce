"use client"

import { cn } from "@/lib/utils"
import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { useDispatch, useSelector } from "react-redux";
import { dashboardHandler } from "@/store/dashboard";
import { RootState } from "@/store";import { Action } from "@/store/actions/dashboardStoreActions";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { CellEditingStoppedEvent, CellValueChangedEvent } from "ag-grid-community";
import toast from "react-hot-toast";
// import "ag-grid-enterprise"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  action: Action
  rowsData: any[]
  colsDefs: any[]
}

const Table = ({ className, action, rowsData, colsDefs }: Props) => {

  const [rowData, setRowData] = useState(rowsData);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState(colsDefs);

  const defaultColDef = useMemo(() => ({
    filter: true, // Enable filtering on all columns
    onSelectionChanged: true,
    width: 150,
    editable: true,
  }), [])

  // @ts-ignore select state based on state name ex: state.dashboard.catagories
  const dashboard = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()

  const handleCheckRow = (e: any) => {
    const product = e.node.selected
        // insert select item
      ? dashboard?.remove ? [ ...dashboard?.remove, e.data] : [e.data]
        // remove select item
        : dashboard.remove.filter((pre: any) => e.data[colDefs[0].field] != pre[colDefs[0].field])

    return dispatch(dashboardHandler({ [action]: { ...dashboard, remove: product } }))
  }

  const onCellValueChanged = useCallback(async (event: CellEditingStoppedEvent) => {
    let updateData
    let rowUpdated: boolean = true;
    const newRowsData = rowData.map((row) =>{
      if(row.id != event.data.id){
        return row
      } else {
        updateData = {
          id: event.data.id,
          value: event.newValue,
          name: [event.colDef.field]
        }
        rowUpdated = row[event.colDef.field as string] === event.newValue
        console.log(rowUpdated)
        return { ...row, [event.colDef.field as string]: event.newValue }
      }
    })
    // no change
    if(rowUpdated === true) return;
    
    setRowData(newRowsData)

    const res = await fetch(`/api/dashboard/${action}`, {
      method: "PATCH",
      body: JSON.stringify(updateData)
    });
    if(res.ok) {
      toast.success(`Update ${action} ${event.colDef.field} Succeeded`)
    } else {
      toast.success(`Update ${action} Failed`)
    }
  }, []);

  return <div className={cn("ag-theme-quartz min-h-screen", className)} style={{ height: 100 }}>
    <AgGridReact
      rowData={rowData}      
      columnDefs={colDefs}
      readOnlyEdit={true}
      defaultColDef={defaultColDef}
      onCellEditingStopped={onCellValueChanged}
      onRowSelected={handleCheckRow}
      stopEditingWhenCellsLoseFocus
      rowSelection="multiple"
      pagination
      paginationPageSize={20}
      className="h-full"
    /> 
  </div>
}

export default Table