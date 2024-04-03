import React from 'react'
import { db } from '@/lib/db'
import ProductCard from '@/components/cards/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SuspenseRoot from '../../../../../components/SuspenseRoot'
import { cn } from '../../../../../lib/utils'

interface Props {
  params: {
    p?: string
  }
  searchParams: {
    sort?: string
    view?: string
  }
}


const page = async ({ params, searchParams }: Props) => {
  const sort = searchParams?.sort === "match" ? { name: "asc" }
  : searchParams?.sort === "price" ? { price: "asc" } : { sold: "asc" }

  const products = await db.product.findMany({
    where: { categoryId: params.p },
    include: {
      images: true,
      reviews: true,
    },
    orderBy: {
      sold: searchParams.sort === "order" ? "asc" : undefined,
      name: searchParams.sort === "match" ? "asc" : undefined,
      price: searchParams.sort === "price" ? "asc" : undefined,
    }
  })

  return (
    <div className='grid grid-cols-12 gap-4'>
      <aside className='md:col-span-3 border'>
        filter
      </aside>
      
      <section className='col-span-12 md:col-span-9'>
        {/* sort and view */}
        <div className='flex justify-end items-center gap-16 my-2 px-4'>
          {/* sort */}
          <div className='flex gap-4 items-center text-sm font-bold'>
            <span>Sort by:</span>
            <div className='flex'>
              <Button href={`?sort=order&&view=${searchParams.view}`}
                variant={searchParams.sort === "order"? "secondary" :"outline"}
                size="sm" className='rounded-full rounded-r-none w-28 font-normal'
              > Orders </Button>
              <Button  href={`?sort=match&&view=${searchParams.view}`}
                variant={searchParams.sort === "match"? "secondary" :"outline"} size="sm"
                className='rounded-none w-28 font-normal'
              > Best Match </Button>
              <Button href={`?sort=price&view=${searchParams.view}`}
                variant={searchParams.sort === "price"? "secondary" :"outline"} size="sm" 
                className='rounded-full rounded-l-none w-28 font-normal'
              > Price </Button>
            </div>
          </div>

          {/* view */}
          <div className='flex items-center'>
            <span className='mr-4 text-sm font-bold'>View: </span>
            <Button variant={searchParams.view === "grid" ?"secondary":"outline"}
              size="sm" className='rounded-full rounded-r-none w-20'
              href={`?sort=${searchParams.sort}&view=grid`}
            >
              Grid
            </Button>
            <Button variant={searchParams.view === "list" ?"secondary":"outline"}
              size="sm" className='rounded-full rounded-l-none w-20'
              href={`?sort=${searchParams.sort}&view=list`}
            >
              List
            </Button>
          </div>
        </div>

        {/* products list */}
        <SuspenseRoot>
          <div
            className={cn(
              "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center px-2",
              searchParams.view === "list" && "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
            )}
          >
            {
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  list={searchParams.view === "list"}
                />
              ))
            }
          </div>
        </SuspenseRoot>
      </section>
    </div>
  )
}

export default page