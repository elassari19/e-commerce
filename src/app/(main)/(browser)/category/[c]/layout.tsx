import '@/app/globals.css'
import type { Metadata } from 'next'
import { db } from '@/lib/db'

export async function generateMetadata({ params }: { params: { c: string } }) {
  const category = await db.category.findFirst({
    where: { id: params.c }
  })
  return {
    title: category?.name,
    description: category?.description,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
