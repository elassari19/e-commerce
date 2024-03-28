import React from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'

const page = async () => {
  const categories = await db.category.findMany({
    include: {
      images: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl pl-2 ml-2 md:ml-8 py-4 bg-foreground">
        All Categories
      </h1>

      <div className='grid grid-cols-12 gap-4 my-8 mx-1 md:mx-4'>
        {
          categories.map((category) => (
            <div key={category.id} className='col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-xl py-8 hover:shadow-primary/40 relative'>
              <Link href={`/category/${category.id}`} className='w-full h-full rounded-2xl flex flex-col gap-2 justify-center items-center'>
                <Image src={category?.images?.[0]?.secure_url} loading="lazy" priority={false}
                  width={50} height={50} alt={`item image ${category.name}`}
                  className={`w-32 h-32 rounded-full hover:absolute hover:w-36 hover:h-36 transition-all duration-300 ease-in-out`}
                />
                <h4 className='font-bold text-sm text-center'>{category.name}</h4>
              </Link>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default page