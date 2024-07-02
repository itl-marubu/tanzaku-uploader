'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProject } from '@/api'
import { IconMisskey, IconTwitter } from '@/components/Icons/generated'
import styles from './index.module.scss'

type Props = {
  projectId: string
}

type ProjectContent = {
  id: string
  name: string
  description: string
}

export const SubmittedTanzaku: React.FC<Props> = ({ projectId }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [project, setProject] = useState({} as ProjectContent)

  const text = searchParams.get('text') || ''
  const name = searchParams.get('name') || ''

  const linkTw = `https://twitter.com/intent/post?text=%23iTL%E4%B8%83%E5%A4%95%E7%A5%AD%20%E3%81%AB%E7%9F%AD%E5%86%8A%E3%82%92%E6%8A%95%E7%A8%BF%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%20%0A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E3%83%AD%E3%83%93%E3%83%BC%E3%81%A7%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%EF%BC%81%0A%40itl_marubu%0A%0A${text}%0A%0A%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A${name}`

  const linkMisskey = `https://misskeyshare.link/share.html?text=%23iTL%E4%B8%83%E5%A4%95%E7%A5%AD%20%E3%81%AB%E7%9F%AD%E5%86%8A%E3%82%92%E6%8A%95%E7%A8%BF%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%20%0A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E3%83%AD%E3%83%93%E3%83%BC%E3%81%A7%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%EF%BC%81%0A%0A%0A${text}%0A%0A%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A${name}`

  useEffect(() => {
    const fetchProject = async () => {
      await getProject(projectId).then((data) => {
        setProject(data)
      })
    }
    fetchProject().catch((e) => {
      console.error(e)
      sendGTMEvent({
        event: 'error_get_project',
        category: 'click',
      })
      router.push('/')
    })
  }, [projectId, router])

  return (
    <main className={styles.main}>
      <p className={styles.topHeading}>
        {project.name}に投稿いただきありがとうございました。
      </p>
      <p>ぜひSNSでシェアしてください!</p>
      <div className={styles.icons}>
        <Link
          href={linkTw}
          className={styles.snsIcon}
          onClick={() => {
            sendGTMEvent({
              event: 'click_share',
              to: 'twitter',
              category: 'click',
            })
          }}
          target="_blank"
        >
          <IconTwitter />
        </Link>
        <Link
          href={linkMisskey}
          className={styles.snsIcon}
          onClick={() => {
            sendGTMEvent({
              event: 'click_share',
              to: 'misskey',
              category: 'click',
            })
          }}
          target="_blank"
        >
          <IconMisskey />
        </Link>
      </div>
    </main>
  )
}
