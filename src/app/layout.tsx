import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Noto_Sans_JP, Shippori_Mincho_B1 } from 'next/font/google'
import 'normalize.css/normalize.css'
import { CookieBanner } from '@/components/gtm'
import '@/styles/colors.scss'
import '@/styles/variables.scss'
import type { Metadata } from 'next'

const nsjp = Noto_Sans_JP({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-sans',
})

const sm = Shippori_Mincho_B1({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-mincho',
})

export const metadata: Metadata = {
  title: 'iTL短冊登録サイト',
  description: 'iTL七夕祭に，あなたの短冊を飾りましょう。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body className={clsx(nsjp.className, sm.variable)}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
