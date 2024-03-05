"use client"

import { cn } from "@/lib/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { useDispatch, useSelector } from "react-redux";
import { dashboardHandler } from "@/store/dashboard/dashboard";
import { RootState } from "@/store";import { Action } from "@/store/actions/dashboardStoreActions";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { CellEditingStoppedEvent, GridOptionsService } from "ag-grid-community";
import toast from "react-hot-toast";
// import "ag-grid-enterprise"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  action: Action
  rowsData: any[]
  colsDefs: any[]
}

const Table = ({ className, action, rowsData, colsDefs }: Props) => {

  const [rowData, setRowData] = useState<any[]>([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState(colsDefs);
  const gridRef = useRef<any>(null); // Create a reference to the grid
  
  const defaultColDef = useMemo(() => ({
    filter: true, // Enable filtering on all columns
    onSelectionChanged: true,
    width: 150,
    // editable: true,
  }), [])

  // @ts-ignore select state based on state name ex: state.dashboard.catagories
  const dashboard = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()

  const selected = () => {
    if (!gridRef.current?.api) return [];
    const result = gridRef.current?.api.rowModel.rowsToDisplay.filter((node: any) => node.selected);
    return result.map((node: any) => node.data.id)
  }

  const handleCheckRow = useCallback(() => {
    dispatch(dashboardHandler({ [action]: { ...dashboard, remove: selected() } }))
  }, [selected()])
  
  useEffect(() => {
    setRowData(rowsData)
  }, [rowsData])

  return <div className={cn("ag-theme-quartz min-h-screen", className)} style={{ height: 100 }}>
    <AgGridReact
      ref={gridRef}
      rowData={rowData}      
      columnDefs={colDefs}
      readOnlyEdit={true}
      defaultColDef={defaultColDef}
      // onCellEditingStopped={onCellValueChanged}
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