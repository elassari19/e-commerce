import '@/app/globals.css'
import { db } from '@/lib/db'

export async function generateMetadata({ params }: { params: { p: string } }) {
  const product = await db.product.findFirst({
    where: { categoryId: params.p }
  })
  return {
    title: product?.name,
    description: product?.description,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
