import { postNotificationAPI } from '@/api/API'

// eslint-disable-next-line
export default async function readNotification (data: { is_read: boolean }, postId: number) {
  try {
    const response = await postNotificationAPI.patchNotification(data, postId)

    return response
  } catch (e) {}
}
