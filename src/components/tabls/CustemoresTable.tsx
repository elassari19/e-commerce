"use client"

import { User } from "@prisma/client";
import Table from "./Table";
import { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: User[]
}

const CustemoresTable = ({ data }: Props) => {

  // Column Definitions: Defines & controls grid columns
  const colDefs = [
    { field: "id", checkboxSelection: true },
    { field: "image",
      cellRenderer: (p: ICellRendererParams) => 
        <div className="h-full w-full flex justify-center items-center">
          {p.data.image.map((item: any, idx: string) =>
            <Image key={idx} src={item.secure_url} alt={item.secure_url} width={40} height={30} />)
          }
        </div>,
      editable: false
    },
    { field: "role", },
    { field: "firstName" },
    { field: "lastName" },
    { field: "gender" },
    { field: "age" },
    { field: "email" },
    { field: "password" },
    { field: "phone" },
    { field: "birthDate" },
    { field: "address.address" },
    { field: "address.city" },
    { field: "address.lat" },
    { field: "address.lng" },
    { field: "address.postalCode" },
    { field: "address.state" },
    { field: "bank.cardName" },
    { field: "bank.cardExpire" },
    { field: "bank.cardNumber" },
    { field: "bank.cardType" },
    { field: "bank.currency" },
    { field: "bank.iban" },
  ];

  return (
    <Table
      rowsData={data!}
      colsDefs={colDefs}
      action="profile"
    /> 
  )
}

export default CustemoresTable
