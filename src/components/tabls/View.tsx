import React from 'react';
import { MousePointer } from 'lucide-react';
import Link from 'next/link';
import { ICellRendererParams } from 'ag-grid-community';
import { UseMemo } from '../layout';

const View = (props: ICellRendererParams) => {
  return (
    <UseMemo dependencies={[props.data]}>
      <Link
        href={`/products/${props.data.categoryId}/${props.data.id}`}
        className=""
      >
        <MousePointer size={24} color="#000e" />
      </Link>
    </UseMemo>
  );
};

export default View;
