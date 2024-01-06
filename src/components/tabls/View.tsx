import React from 'react'
import { MousePointerSquare } from 'lucide-react';
import Link from 'next/link';
import { ICellRendererParams } from 'ag-grid-community';

interface IProps {
  href: string
}

const View = (props: ICellRendererParams) => {
  console.log(props.data)
  return (
    <Link href={`/dashboard/product/${props.data.id}`} className='w-full h-full flex justify-start items-center'>
      <MousePointerSquare size={24} color='#000e' />
    </Link>
  )
}

export default View