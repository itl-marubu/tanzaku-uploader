import { Navbar } from '@/components/Navbar'
import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <Navbar showContent={true} />
      <main className={styles.main}>
        <h2>短冊の登録</h2>
        <p>登録するには短冊画面に設置のQRコードを読み込んでください。</p>
      </main>
    </>
  )
}
