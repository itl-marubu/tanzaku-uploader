'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProject } from '@/api'
import styles from './index.module.scss'
import { TanzakuForm } from '../tanzakuForm'

type Props = {
  projectId: string
}

type ProjectContent = {
  id: string
  name: string
  description: string
}

export const CreateTanzaku: React.FC<Props> = ({ projectId }) => {
  const router = useRouter()
  const [project, setProject] = useState({} as ProjectContent)

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
      {/* <Logo logoColor="#fff" className={styles.logo} /> */}
      <h2>{project.name}に，あなたの短冊を飾りましょう。</h2>
      <TanzakuForm eventId={projectId} />
      <div style={{ fontSize: '0.6rem' }}>
        <p>
          お知らせ:
          このウェブサイトでは利用状況等を調査・分析するため、本サービス上に
          Google Inc.が提供する Google アナリティクスを利用しています。
          <br />
          Google アナリティクスの利用規約に関する説明については Google
          アナリティクスのサイトを、Google
          社のプライバシーポリシーに関する説明については同社のサイトをご覧ください。
          <br />
          Google アナリティクス 利用規約：
          <Link
            href="https://www.google.com/analytics/terms/jp.html"
            style={{ color: '#fff' }}
          >
            https://www.google.com/analytics/terms/jp.html
          </Link>
          <br />
          プライバシーポリシー：
          <Link
            style={{ color: '#fff' }}
            href="http://www.google.com/intl/ja/policies/privacy/"
          >
            http://www.google.com/intl/ja/policies/privacy/
          </Link>
          <br />
          <br />
          Google アナリティクスは Cookie
          等の仕組みでお客様の利用状況等を把握しています。お客様は、ご自身のデータが
          Google アナリティクスで使用されることを望まない場合は、Google
          社の提供する Google アナリティクス オプトアウト
          アドオンをご利用ください。
          <br />
          Google アナリティクス オプトアウト アドオン：
          <Link
            style={{ color: '#fff' }}
            href="
        https://tools.google.com/dlpage/gaoptout?hl=ja"
          >
            https://tools.google.com/dlpage/gaoptout?hl=ja
          </Link>
        </p>
      </div>
    </main>
  )
}
