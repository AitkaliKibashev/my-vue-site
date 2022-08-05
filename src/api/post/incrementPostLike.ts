import { postAPI } from '@/api/API'

export default async function incrementPostLike (postId: number) {
  try {
    const response = await postAPI.incrementLike(postId)

    return response
  } catch (e) {}
}
