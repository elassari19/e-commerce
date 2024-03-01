import { Category } from '@prisma/client'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import DialogNav from '../DialogNav';
import { createList } from '../../helpers/methods/functions';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>{
  Categories: Category[]
}

const AllCategories = ({ Categories, className }: Props) => {
  const categoriesTree = createList(Categories)

  return (
    <>
      <div className='hidden md:block'>
        <DropdownMenu>
          <DropdownMenuTrigger className={cn('outline-none ring-0', className)} >
            <div className='flex items-center gap-2 border rounded-full p-1 px-3 bg-primary-light text-primary-dark hover:bg-primary hover:text-white'>
              <MenuIcon size={18} /> <span className='hidden md:inline'>All Categories</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='p-4 flex flex-col gap-2 max-h-[50vh] overflow-y-auto w-80 right-0'>
            {
              categoriesTree.map((cat, idx) => (
                <Accordion key={idx} type='multiple'>
                  <AccordionItem value={cat.name!}>
                    <AccordionTrigger className='font-normal'>{cat.name}</AccordionTrigger>
                    <AccordionContent className='ml-16'>
                      {
                        cat.children?.map((item) => {
                          return (
                            <Link key={item.id} href={`/?category=${item.id}`} className='block my-1'>
                              {item.name}
                            </Link>
                          )
                        })
                      }
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='md:hidden'>
        <DialogNav
          className="max-h-[60vh] overflow-y-auto p-4 top-0 rigth-0 translate-y-[0%]"
          dialogTrigger={<MenuIcon size={28} className="text-white" />}
          dialogHeader={
            <div className='flex gap-2 w-full text-center font-bold'>
              <span className=''>All Categories</span>
            </div>}
          dialogContent={
            Categories.map((cat, idx) => (
              <Accordion key={idx} type='multiple'>
                <AccordionItem value={cat.name}>
                  <AccordionTrigger className='font-normal'>{cat.name}</AccordionTrigger>
                  <AccordionContent className='ml-16'>
                    {
                      Categories.map((item) => (
                        <Link key={item.id} href={`/category/${item.id}`} className='block my-1'>
                          {item.name}
                        </Link>
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          }
        />
      </div>
    </>
  )
}

export default AllCategories