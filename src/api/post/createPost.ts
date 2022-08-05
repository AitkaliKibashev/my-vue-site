import { postAPI } from '@/api/API'

export async function createPost (data: FormData) {
  try {
    await postAPI.addPost(data)
  } catch (e) {
  }
}
