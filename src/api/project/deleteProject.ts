import { projectAPI } from '@/api/API'

export async function deleteProject (id: number) {
  try {
    await projectAPI.deleteProject(id)
  } catch (e) {
  }
}
