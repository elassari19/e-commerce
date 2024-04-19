'use client'

import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { getCategories } from '../helpers/actions/Products'
import { Category } from '@prisma/client'

interface Props {
  children: (tags: any[]) => JSX.Element[]
}

const ProductTags = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<string[]>([])

  const fetchCategories = async() => {
    const res = await getCategories()
    setCategories(res)
  }

  useLayoutEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    categories.filter((category) => category.parentId == "" && category.tags.length)
      .map((category) => {
        setTags([...category.tags])
      })
  }, [categories])

  return (
    <div className="bg-white border border-primary/30 rounded-lg p-4">
      <h2 className='font-bold text-black mb-4'>Select Related Tags</h2>
      <div className='flex flex-wrap gap-4'>
        {children(tags)}
      </div>
    </div>
  )
}

export default memo(ProductTags)