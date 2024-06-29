import { CreateTanzaku } from './_components/tanzakuCreate'
import { Shippori_Mincho_B1 } from 'next/font/google'
import styles from './page.module.scss'
import clsx from 'clsx'

const sm = Shippori_Mincho_B1({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-mincho',
})

export const runtime = 'edge'

export default function Home({ params }: { params: { id: string } }) {
  return (
    <main className={clsx(styles.main, sm.variable)}>
      <div>
        <CreateTanzaku projectId={params.id} />
      </div>
    </main>
  )
}
