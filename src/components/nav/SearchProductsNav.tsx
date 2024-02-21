import React from 'react'
import MotionSlide from '../framerMotion/MotionSlide'
import { ImageUrl, Product } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '../../lib/db'

interface Props {
  products: Partial<Product & { images: ImageUrl[] }>[]
  searchParams: {
    q?: string,
  }
}

const SearchProductsNav = async ({ searchParams, products }: Props) => {

  return (
    <div className="shadow-2xl max-h-40 w-full py-4 overflow-auto">
      {
        products.length > 0 && searchParams?.q && searchParams?.q.length > 2 && (
            <div className="flex flex-col gap-1">
            {
              products.map((product, idx) => (
                <MotionSlide bottom={10} delay={.2*(idx+2)} key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-4 py-1 px-4 hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-sm">
                      <Image src={product.images![0].secure_url} priority alt={product.name || ""} width={40} height={40} />
                    </div>
                    <div>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                    </div>
                  </Link>
                </MotionSlide>
              ))
            }
            </div>
            
        )
      }
      {
        products.length === 0 && searchParams?.q && searchParams?.q.length > 2 && (
          <div className="left-0 w-full h-full">
            <p className="text-center py-2">No Products Found</p>
          </div>
        )
      }
    </div>
  )
}

export default SearchProductsNav