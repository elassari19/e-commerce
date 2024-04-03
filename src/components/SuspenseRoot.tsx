import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  loader?: React.ReactNode
}

const SuspenseRoot = ({ children, loader, className }: Props) => {
  return (
    <Suspense
      fallback={
        <div className='w-full h-[50rem] flex justify-center items-center'>
          {loader ??  <Loader2 className='mr-2 h-20 w-20 animate-spin text-primary' />}
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default SuspenseRoot