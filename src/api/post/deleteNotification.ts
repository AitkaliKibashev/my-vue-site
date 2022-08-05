import { postNotificationAPI } from '@/api/API'

export default async function deleteNotification (notificationId: number) {
  try {
    await postNotificationAPI.deleteNotification(notificationId)
  } catch (e) {}
}
