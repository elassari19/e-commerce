"use client"

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { getProductsByCategory } from '../../helpers/actions/Products';
import ProductCard from '../cards/ProductCard';
import { ImageUrl, Product } from '@prisma/client';
import { IProductData } from '../../types/products';
import { cn } from '../../lib/utils';

interface Props extends React.HTMLProps<HTMLDivElement>{
  categoryId: string;
  productsList: IProductData[];
}

const LoadMore = ({ categoryId, productsList, className }: Props) => {

  const [ref, inView] = useInView();
  const [products, setProducts] = useState<IProductData[]>(productsList);
  const [offset, setOffset] = useState(1);
  const [done, setDone] = useState<boolean>(false)

  const handleLoadMore = async () => {
    setInterval(() => null, 1000)
    const nextOffset = offset + 1;
    const res = await getProductsByCategory(categoryId, nextOffset);
    if (!res.length) setDone(true);
    // @ts-ignore
    setProducts([...products, ...res]);
    setOffset(nextOffset);
  };

  useEffect(() => {
    if (inView && !done) {
      handleLoadMore();
    }
  }, [inView]);

  return (
    <>
      <div
        className={
          cn('grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-content-center px-2', className)
        }
      >
        {products.map((product: Product & { images: ImageUrl[] }, index: number) => (
          // @ts-ignore
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      {!done 
        ? (
          <div ref={ref} className='w-full h-40 flex justify-center items-center'>
            {inView && <Loader2 className='mr-2 h-[20%] w-[20%] animate-spin text-primary' />}
          </div>
          )
        : (
          <div className='w-full h-40 flex justify-center items-center'>
            <span className='text-primary text-xl font-bold'>No more products</span>
          </div>
        )
      }
    </>
  );
};

export default LoadMore;