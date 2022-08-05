import { postAPI } from '@/api/API'

export default async function deletePost (postId: number | string) {
  try {
    await postAPI.deletePost(postId)
  } catch (e) {}
}
