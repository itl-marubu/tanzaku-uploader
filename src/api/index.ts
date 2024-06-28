import createClient from 'openapi-fetch'
import type { paths } from './client'

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const getProject = async (projId: string) => {
  const response = await client.GET('/pub/{projectId}', {
    params: {
      path: {
        projectId: projId,
      },
    },
  })

  if (response.error) {
    throw new Error(response.error)
  }

  if (response.data == null) {
    throw new Error('Project not found')
  }
  return response.data
}

type tanzaku = {
  textLine1: string
  textLine2?: string
  nameLine: string
}

export const createTanzaku = async (projId: string, tanzaku: tanzaku) => {
  const response = await client.POST('/tanzaku/{id}', {
    params: {
      path: {
        id: projId,
      },
    },
    body: tanzaku,
  })
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data
}
