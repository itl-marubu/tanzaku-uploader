import Link from 'next/link'
import style from './index.module.scss'
type NavbarProps = {
  showContent?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ showContent = true }) => {
  return (
    <>
      <div className={style.wrap}>
        <div className={style.inde}>
          <Link href="/" className={style.logo}>
            <h1>短冊の登録</h1>
          </Link>
        </div>
      </div>
      {showContent && <div style={{ height: '80px' }} />}
    </>
  )
}
