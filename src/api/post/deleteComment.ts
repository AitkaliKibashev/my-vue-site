import { postAPI } from '@/api/API'

export default async function deleteComment (commentId: number) {
  try {
    await postAPI.deleteComment(commentId)
  } catch (e) {}
}
