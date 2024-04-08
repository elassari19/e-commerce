import React from 'react'
import { db } from '@/lib/db'
import ProductCard from '@/components/cards/ProductCard'
import { Button } from '@/components/ui/button'
import SuspenseRoot from '@/components/SuspenseRoot'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@/components/ui/radio-group'
import Ratings from '@/components/atoms/Ratings'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    p?: string
  }
  searchParams: {
    sort?: string
    view?: string
    min?: string
    max?: string
    review?: string
    plaza?: string
    ship?: string
    radio?: string
  }
}

const page = async ({ params, searchParams }: Props) => {

  const gteMin = searchParams.min ? (+searchParams.min*100) : 0
  const lteMax = searchParams.max ? (+searchParams.max*100) : 999999999

  const products = await db.product.findMany({
    where: {
      categoryId: params.p,
    },
    include: {
      images: true,
      reviews: true,
    },
    orderBy: {
      sold: searchParams.sort === "order" ? "asc" : undefined,
      name: searchParams.sort === "match" ? "asc" : undefined,
      price: searchParams.sort === "price" ? "asc" : undefined,
    }
  }).then((res) => res.filter((product) => +product.price >= gteMin && +product.price <= lteMax))

  const handleForm = async(formData: FormData) => {
    'use server'
    const min = formData.get('min')
    const max = formData.get('max')
    const review = formData.get('review')
    const plaza = formData.get('plaza')
    const ship = formData.get('ship')
    const { sort, view } = searchParams

    redirect(`?sort=${sort||"order"}&view=${view||"grid"}&min=${min}&max=${max}&review=${review}&plaza=${plaza}&ship=${ship}`)
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      {/* aside filter options */}
      <aside
        className='md:col-span-3 my-4 hidden lg:flex relative'
      >
        <form action={handleForm}
          className='w-[24vw] fixed top-20 left-0 h-[85vh] overflow-auto flex flex-col gap-4 p-4 bg-white'
        >
          {/* delivery and services */}
          <div className=''>
            <h2 className='font-bold mb-4'>Delivery & Servieces</h2>
            <div className='flex items-center space-x-2 mb-2'>
              <Input type="checkbox" name="plaza" id='DHL-Delivery'
                className='w-5 h-5 rounded-sm border-none'
                defaultChecked={searchParams.plaza=="on"}
              />
              <label
                htmlFor="DHL-Delivery"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Plaza
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Input type="checkbox" name="ship" id='Free-Delivery'
                className='w-5 h-5 rounded-sm border-none'
                defaultChecked={searchParams.ship=="on"}
              />
              <label
                htmlFor="Free-Delivery"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Free shipping
              </label>
            </div>
          </div>
          <hr className='mt-8 mb-4' />

          {/* price options */}
          <div className=''>
            <h2 className='font-bold mb-4'>Delivery & Servieces</h2>
            <div className='flex items-center gap-2'>
              <Input name='min' className='py-0 w-24 border-black' type='number' placeholder='0' preIcon={"$"}
                defaultValue={searchParams.min||""}
              />
              <Input name='max' className='py-0 w-24 border-black' type='number' placeholder='0' preIcon={"$"}
                defaultValue={searchParams.max||""}
              />
            </div>
            {/* <div className='my-4'>
              <RadioGroup
                defaultValue={"under 10"}
                className="flex flex-col space-y-1"
              >
                {
                [
                  { value: 'under 10', label: 'Under $10' },
                  { value: '10-50', label: '$10 - $50' },
                  { value: '50-100', label: '$50 - $100' },
                  { value: '100-150', label: '$100 - $150' },
                  { value: '150-200', label: '$150 - $200' },
                  { value: 'over 200', label: 'Over 200' },
                ].map((radio, index) => (
                  <div key={index} className='flex items-center gap-2 text-sm w-fit'>
                    <Input type='radio' name="radio" value={radio.value} id={radio.value} className='border-none'/>
                    <label htmlFor={radio.value}>{radio.label}</label>
                  </div>
                ))
                }
              </RadioGroup>
            </div> */}
          </div>
          <hr className='mt-4 mb-4' />

          {/* reviews filter */}
          <div>
            <h2 className='font-bold mb-4'>Reviews</h2>
            <RadioGroup
              defaultValue='4'
              className="flex flex-col space-y-1"
            >
              {
              [
                { value: '1', label: <Ratings ratings={1}/> },
                { value: '2', label:  <Ratings ratings={1}/> },
                { value: '3', label:  <Ratings ratings={1}/> },
                { value: '4', label:  <Ratings ratings={1}/> },
              ].map((radio, index) => (
                <div key={index} className='flex items-center gap-2 text-sm'>
                  <Input type='radio' name="review" value={radio.value} id={radio.value} className='border-none'
                    defaultChecked={searchParams.review === radio.value}
                  />
                  <label htmlFor={radio.value}>
                    <Ratings ratings={index+1}/>
                  </label>
                </div>
              ))
              }
            </RadioGroup>
          </div>
          {/* <FilterButton  /> */}
          <Button type='submit' variant="primary" size="sm" className='fixed left-8 bottom-4 w-60 p-4 font-bold bg-black'>OK</Button>
        </form>
      </aside>
      
      {/* section of products */}
      <section className='col-span-12 lg:col-span-9 mb-20'>
        {/* sort and view */}
        <div className='flex justify-end items-center gap-16 my-2 px-4'>
          {/* sort */}
          <div className='flex gap-4 items-center text-sm font-bold'>
            <span>Sort by:</span>
            <div className='flex'>
              <Button href={`?sort=order&&view=${searchParams.view||"grid"}`}
                variant={!searchParams.sort||searchParams.sort === "order"? "secondary" :"outline"}
                size="sm" className='rounded-full rounded-r-none w-28 font-normal'
              > Orders </Button>
              <Button  href={`?sort=match&&view=${searchParams.view||"grid"}`}
                variant={searchParams.sort === "match"? "secondary" :"outline"} size="sm"
                className='rounded-none w-28 font-normal'
              > Best Match </Button>
              <Button href={`?sort=price&view=${searchParams.view||"grid"}`}
                variant={searchParams.sort === "price"? "secondary" :"outline"} size="sm" 
                className='rounded-full rounded-l-none w-28 font-normal'
              > Price </Button>
            </div>
          </div>

          {/* view */}
          <div className='flex items-center'>
            <span className='mr-4 text-sm font-bold'>View: </span>
            <Button variant={!searchParams.view||searchParams.view === "grid" ?"secondary":"outline"}
              size="sm" className='rounded-full rounded-r-none w-20'
              href={`?sort=${searchParams.sort||"order"}&view=grid`}
            >
              Grid
            </Button>
            <Button variant={searchParams.view === "list" ?"secondary":"outline"}
              size="sm" className='rounded-full rounded-l-none w-20'
              href={`?sort=${searchParams.sort||"order"}&view=list`}
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