import { StarIcon } from 'lucide-react'
import React from 'react'

interface Props {
  ratings: number
  size?: number
}

const Ratings = ({ ratings, size }: Props) => {
  return (
    <div className='flex gap-2 text-sm font-bold'>
      <div className='flex gap-1'>{Array(5).fill("").map((_, idx)=>(
        <StarIcon key={idx} size={size || 16} fill={idx<ratings?'black':'white'} className={"font-thin"} />
      ))}</div>
      <span> {ratings || 0} Rating</span>
    </div>
  )
}

export default Ratings