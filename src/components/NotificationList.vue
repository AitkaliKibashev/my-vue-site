<template>
  <div class="notifications-block">
    <h2 v-if="unreadNotifications.length">Не прочитанные уведомления</h2>

    <transition-group name="notification-list">
      <notification-component
        v-for="notification in unreadNotifications"
        :key="notification.id"
        :notification="notification"
        @deleted="deleteNotificationHandler"
      />
    </transition-group>

    <h2>Прочитанные уведомления</h2>

    <transition-group name="notification-list">
      <notification-component
        v-for="notification in readNotifications"
        :key="notification.id"
        :notification="notification"
        @deleted="deleteNotificationHandler"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType } from 'vue'
import { PostNotification } from '@/types/Post'
import NotificationComponent from '@/components/NotificationComponent.vue'
import readNotification from '@/api/post/readNotification'

export default defineComponent({
  name: 'NotificationList',
  components: { NotificationComponent },
  props: {
    unreadNotifications: {
      type: Array as PropType<PostNotification[]>,
      default: () => []
    },
    readNotifications: {
      type: Array as PropType<PostNotification[]>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    function deleteNotificationHandler (notificationId: number) {
      emit('deleted', notificationId)
    }

    onUnmounted(() => {
      props.unreadNotifications.forEach(notification => {
        readNotification({ is_read: true }, notification.id)
        emit('notificationsRed')
      })
    })

    return {
      deleteNotificationHandler
    }
  }
})
</script>

<style scoped lang="scss">
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.5s ease;
}
.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.notifications-block {
  margin-top: 30px;

  h2 {
    margin-bottom: 40px;

    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;

    color: #333333;
  }
}
</style>
