import { projectAPI } from '@/api/API'

export default async function incrementProjectLike (projectId: number) {
  try {
    const response = await projectAPI.incrementLike(projectId)

    return response
  } catch (e) {}
}
