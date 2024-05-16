import '@/app/globals.css'
import type { Metadata } from 'next'
import HeaderNav from '@/components/nav/HeaderNav'

export const metadata: Metadata = {
  title: 'Search and Browser Products Page',
  description: 'Search Proudcuts and Browser Products Page display random products, brands and more...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-primary-foreground text-white top-0 sticky z-50">
        <HeaderNav />
      </div>

      {children}
    </div>
  )
}
