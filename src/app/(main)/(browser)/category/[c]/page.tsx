import React from 'react'

interface Props {
  params: {
    c?: string
  }
}

const Category = ({ params }: Props) => {
  return (
    <div>Category {params.c!}</div>
  )
}

export default Category