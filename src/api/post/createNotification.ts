import { postNotificationAPI } from '@/api/API'
import { PostNotification } from '@/types/Post'

export default async function createNotification (notification: PostNotification) {
  try {
    const response = await postNotificationAPI.createNotifications(notification)

    return response
  } catch (e) {}
}
