import React from 'react'

interface Props {
  params: {
    productId?: string
  }
}
const page = ({ params }: Props) => {
  return (
    <div>product {params.productId}</div>
  )
}

export default page