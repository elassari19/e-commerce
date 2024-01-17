import '@/app/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: 'e-com',
  description: 'e-commerce',
}

interface Props {
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RootLayout({ children, searchParams }: Props) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
