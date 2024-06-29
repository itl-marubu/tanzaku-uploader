'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProject } from '@/api'
import { Logo } from '@/components/Logo'
import { TanzakuForm } from '../tanzakuForm'
import styles from './index.module.scss'
import { event } from '@/components/gtm'

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
      event({
        event: 'error_get_project',
        category: 'click',
      })
      router.push('/')
    })
  }, [projectId, router])

  return (
    <main className={styles.main}>
      <Logo logoColor="#fff" className={styles.logo} />
      <h2>{project.name}に，あなたの短冊を飾りましょう。</h2>
      <TanzakuForm eventId={projectId} />
    </main>
  )
}
