import { projectAPI } from '@/api/API'

export async function createProject (data: FormData) {
  try {
    await projectAPI.createProject(data)
  } catch (e) {
  }
}
