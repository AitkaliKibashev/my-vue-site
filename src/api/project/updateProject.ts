import { projectAPI } from '@/api/API'

export async function updateProject (data: FormData, id: number) {
  try {
    await projectAPI.updateProject(data, id)
  } catch (e) {
  }
}
