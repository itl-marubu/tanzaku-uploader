'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProject } from '@/api'
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
      router.push('/')
    })
  }, [projectId, router])

  return (
    <main>
      <h2>短冊の登録: {project.name}</h2>
      <TanzakuForm eventId={projectId} />
    </main>
  )
}
