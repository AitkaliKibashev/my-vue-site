import { postAPI } from '@/api/API'

export async function createComment (data: { text: string, user: string, post: number }) {
  try {
    const response = await postAPI.createComment(data)

    return response
  } catch (e) {
  }
}
