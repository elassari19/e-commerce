'use client'
import Image from 'next/image'
import React, { MouseEventHandler } from 'react'

const ImageMagnify = ({ src }: { src: string }) => {

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    const x = e.clientX - e.target.offsetLeft, y = e.clientY - e.target.offsetTop;

    const img = document.getElementById('overview-image') as HTMLImageElement
    img.style.transformOrigin = `${x}px ${y}px`
    img.style.transform = 'scale(1.5)'
  }

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = document.getElementById('overview-image') as HTMLImageElement
    img.style.transform = 'scale(1)'
  }

  return (
    <div
      onMouseMove={handleMouseOver}
      onMouseOut={handleMouseOut}
      className='w-full h-[23rem] overflow-hidden transform transition-transform duration-300 ease-in-out
      text-center p-4'
    >
      <Image
        src={src} alt="Product Image"
        width={400} height={400}
        loading="eager"
        className="w-full h-full border rounded-lg"
        id='overview-image'
      />
    </div>
  )
}

export default ImageMagnify