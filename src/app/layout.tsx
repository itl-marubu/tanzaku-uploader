import { Noto_Sans_JP } from 'next/font/google'
import 'normalize.css/normalize.css'
import { CookieBanner, GoogleTagManager } from '@/components/gtm'
import '@/styles/colors.scss'
import '@/styles/variables.scss'
import type { Metadata } from 'next'

const nsjp = Noto_Sans_JP({
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      {' '}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body className={nsjp.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
