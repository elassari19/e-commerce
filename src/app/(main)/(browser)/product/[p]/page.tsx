import React from 'react'
import { db } from '@/lib/db'
import ProductCard from '@/components/cards/ProductCard'

interface Props {
  params: {
    p?: string
  }
}

const page = async ({ params }: Props) => {
  const products = await db.product.findMany({
    where: { categoryId: params.p },
    include: {
      images: true
    }
  })

  return (
    <div className='grid grid-cols-12 gap-4'>
      <aside className='md:col-span-3 border'>
        filter
      </aside>
      
      <section className='col-span-12 md:col-span-9'>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center px-2">
          {
            products.map((product) => (<ProductCard key={product.id} product={product} />))
          }
        </div>
      </section>
    </div>
  )
}

export default page