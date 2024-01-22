import React from 'react'
import { MousePointerSquare } from 'lucide-react';
import Link from 'next/link';
import { ICellRendererParams } from 'ag-grid-community';
import { UseMemo } from '../layout';

interface IProps {
  href: string
}

const View = (props: ICellRendererParams) => {
  console.log("view", props.data)
  return (
    <UseMemo dependencies={props.data}>
      <Link href={`/dashboard/product/${props.data.id}`} className='w-full h-full flex justify-start items-center'>
        <MousePointerSquare size={24} color='#000e' />
      </Link>
    </UseMemo>
  )
}

export default View