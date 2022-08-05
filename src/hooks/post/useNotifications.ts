import { ref, onMounted } from 'vue'
import { PostNotification } from '@/types/Post'
import { postNotificationAPI } from '@/api/API'

export function useNotifications () {
  const notifications = ref<PostNotification[]>([])
  const isNotificationsLoading = ref(true)
  const notificationError = ref('')

  const fetching = async () => {
    try {
      const response = await postNotificationAPI.fetchNotifications()

      if (notificationError.value) {
        notificationError.value = ''
      }

      notifications.value = response.data
    } catch (e) {
      notificationError.value = 'Произошла ошибка при получении уведомлений'
    } finally {
      isNotificationsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    notifications,
    isNotificationsLoading,
    notificationError
  }
}
