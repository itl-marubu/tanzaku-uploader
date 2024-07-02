import { SubmittedTanzaku } from './_components/submittedTanzaku'
import styles from './page.module.scss'

export const runtime = 'edge'

export default function submitted({ params }: { params: { id: string } }) {
  return (
    <>
      <main className={styles.main}>
        <SubmittedTanzaku projectId={params.id} />
      </main>
    </>
  )
}
