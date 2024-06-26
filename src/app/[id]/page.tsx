import { CreateTanzaku } from './_components/tanzakuCreate'
import styles from './page.module.scss'

export const runtime = 'edge'

export default function Home({ params }: { params: { id: string } }) {
  return (
    <main className={styles.main}>
      <CreateTanzaku projectId={params.id} />
    </main>
  )
}
