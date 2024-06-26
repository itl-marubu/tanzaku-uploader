'use client'

import { getProject } from '@/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TanzakuForm } from './_components/tanzakuForm'

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
  }, [projectId])

  return (
    <main>
      <h2>短冊の登録: {project.name}</h2>
      <TanzakuForm eventId={projectId} />
    </main>
  )
}
