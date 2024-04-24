'use client'

import React, { ChangeEvent, memo, useState } from 'react'
import { Category } from '@prisma/client'
import { Input } from './ui/input'
import { FormikProps } from 'formik'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  formik: FormikProps<any>
  categories: Category[]
}

const ProductTags = ({ formik, categories }: Props) => {

  const [filterTag, setFilterTag] = useState<string>("")

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, tag: string) => {
    e.target.value
    if(e.target.checked) {
      formik.values.tags.indexOf(tag) === -1 && formik.setFieldValue("tags", [...formik.values.tags, tag])
    } else {
      const ind = formik.values.tags.indexOf(tag)
      ind !== -1 && formik.setFieldValue("tags", formik.values.tags?.filter((item: string) => item !== tag))
    }
  }

  return (
    <div className="bg-white border border-primary/30 rounded-lg p-4 h-72 overflow-auto">
    <h2 className='font-bold text-black mb-4'>Select Related Tags</h2>
      <Input
        placeholder="Search for Tags"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="w-full border-none bg-primary/10 text-black p-2 rounded-lg mb-4 px-4"
      />
      {/* list checked tags */}
      <div className="flex flex-wrap gap-2 my-2">
        {formik.values.tags.map((tag: string) => (
          <Tag
          key={tag}
          tag={tag} checked={formik.values.tags.indexOf(tag) !== -1}
          onChange={(e) => handleChecked(e, formik, tag)}
        />
        
        ))}
      </div>
      {/* list of unchecked tags */}
      <div className="flex gap-2 flex-wrap">
      {
        categories.filter(
          (cate) => cate.parentId !== ""
          && cate.name.toLowerCase().includes(filterTag.toLowerCase())
          && formik.values.tags.indexOf(cate.name) === -1
        ).map((tag) =>(
          <Tag
            key={tag.name}
            tag={tag.name} checked={formik.values.tags.indexOf(tag.name) !== -1}
            onChange={(e) => handleChecked(e, formik, tag.name)}
          />
        ))
      }
      </div>
  </div>
)
}

interface TagProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tag: string
}
const Tag = ({ tag, onChange, checked }: TagProps) => {
  return (
    <div className="bg-primary/80 rounded-md p-2 flex items-center gap-2">
      <input
        key={tag} type="checkbox"
        name={tag} value={tag}
        onChange={onChange}
        checked={checked}
        className="p-1 bg-primary-foreground text-white rounded-lg w-4 h-4 border-primary"
      />
      <label htmlFor={tag} className="text-xs font-bold">{tag}</label>
    </div>
  )
}

export default memo(ProductTags)