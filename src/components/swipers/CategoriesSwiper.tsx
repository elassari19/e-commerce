import React, { Suspense } from 'react'
import { cn } from '@/lib/utils';
import { getRootCategories, getSubCategories } from '../../helpers/actions/categories';
import RootSwiper from './RootSwiper';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  path: string
  param?: string
}

const CategoriesSwiper = async ({ path, param, className }: Props) => {
  const categories = param === undefined
    ? await getRootCategories()
    : await getSubCategories(param!)

  return (
    <div className={cn('relative p-0 md:mx-8 mb-4', className)}>
      <RootSwiper>
        {categories.map((category, idx) => (
            <Suspense
              key={idx}
              fallback={<Skeleton className='w-full h-full' />}
            >
              <Link
                href={`/${path}/${category.parentId||category.id}?t=${category.name}`} 
                className='w-full h-full rounded-2xl flex flex-col gap-2 justify-center
                items-center shadow p-2 hover:shadow-primary/60'
              >
                <Image src={category?.images?.[0]?.secure_url} loading="eager" priority={false}
                  width={50} height={50} alt={`item image ${idx}`}
                  className={`w-36 h-36 rounded-full`}
                />
                <h4 className='font-bold text-sm text-center'>{category.name}</h4>
              </Link>
            </Suspense>
        ))}
      </RootSwiper>
    </div>
  )
}

export default CategoriesSwiper