<template>
  <div>
    <AdminLogin v-if="!store.state.isAdminAuth" />
    <section class="admin-page" v-else>
      <div class="container">
        <h1 class="section-title">Админ панель</h1>
      </div>
      <div class="admin-page__inner">
        <div class="container">
          <div class="admin__tabs">
            <div class="admin__tabs__row">
              <h2
                :class="{active: currentTab === AdminPageTabs.POST_TAB}"
                @click="setCurrentTab(AdminPageTabs.POST_TAB)"
              >Пост</h2>
              <h2
                :class="{active: currentTab === AdminPageTabs.PROJECT_TAB}"
                @click="setCurrentTab(AdminPageTabs.PROJECT_TAB)"
              >Проект</h2>
              <h2
                :class="{active: currentTab === AdminPageTabs.TAG_TAB}"
                @click="setCurrentTab(AdminPageTabs.TAG_TAB)"
              >Тэг</h2>
            </div>
            <div class="admin__tabs__row">
              <button
                :class="{active: currentTab === AdminPageTabs.ARCHIVE_TAB}"
                @click="setCurrentTab(AdminPageTabs.ARCHIVE_TAB)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V21H3V8" stroke="#333333" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M23 3H1V8H23V3Z" stroke="#333333" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M10 12H14" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button
                :class="{active: currentTab === AdminPageTabs.NOTIFICATION_TAB}"
                @click="setCurrentTab(AdminPageTabs.NOTIFICATION_TAB)"
                class='notification-btn'
              >
                <span v-if="unreadNotifications.length">{{unreadNotifications.length}}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.05033 3.05025C8.36309 1.7375 10.1436 1 12.0001 1C13.8566 1 15.6371 1.7375 16.9498 3.05025C18.2626 4.36301 19.0001 6.14349 19.0001 8C19.0001 11.3527 19.7171 13.4346 20.378 14.6461C20.7098 15.2544 21.0329 15.6535 21.2573 15.8904C21.3698 16.0091 21.4581 16.0878 21.5114 16.1322C21.538 16.1544 21.5558 16.168 21.5635 16.1737C21.5647 16.1746 21.5657 16.1753 21.5664 16.1758C21.9249 16.4221 22.0835 16.8725 21.9572 17.2898C21.8295 17.7115 21.4407 18 21.0001 18H3.00008C2.55941 18 2.17068 17.7115 2.04299 17.2898C1.91664 16.8725 2.07528 16.4221 2.43377 16.1758C2.43447 16.1753 2.43542 16.1746 2.43663 16.1737C2.44432 16.168 2.46218 16.1544 2.4888 16.1322C2.54202 16.0878 2.6304 16.0091 2.74288 15.8904C2.9673 15.6535 3.29039 15.2544 3.62218 14.6461C4.28301 13.4346 5.00008 11.3527 5.00008 8C5.00008 6.14348 5.73758 4.36301 7.05033 3.05025ZM2.44388 16.169C2.44395 16.1689 2.44403 16.1688 2.44411 16.1688C2.44411 16.1688 2.4441 16.1688 2.4441 16.1688L2.44388 16.169ZM5.1494 16H18.8508C18.7747 15.8753 18.6983 15.7434 18.6222 15.6039C17.783 14.0654 17.0001 11.6473 17.0001 8C17.0001 6.67392 16.4733 5.40215 15.5356 4.46447C14.5979 3.52678 13.3262 3 12.0001 3C10.674 3 9.40223 3.52678 8.46454 4.46447C7.52686 5.40215 7.00008 6.67392 7.00008 8C7.00008 11.6473 6.21715 14.0654 5.37797 15.6039C5.30188 15.7434 5.22549 15.8753 5.1494 16Z"
                        fill="#333333"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.76792 20.1352C10.2457 19.858 10.8576 20.0207 11.1347 20.4984C11.2226 20.6499 11.3488 20.7757 11.5006 20.8632C11.6524 20.9506 11.8245 20.9966 11.9997 20.9966C12.1749 20.9966 12.347 20.9506 12.4988 20.8632C12.6506 20.7757 12.7768 20.6499 12.8647 20.4984C13.1418 20.0207 13.7537 19.858 14.2315 20.1352C14.7092 20.4123 14.8718 21.0242 14.5947 21.5019C14.331 21.9566 13.9525 22.3339 13.497 22.5962C13.0416 22.8586 12.5253 22.9966 11.9997 22.9966C11.4741 22.9966 10.9578 22.8586 10.5024 22.5962C10.0469 22.3339 9.66841 21.9566 9.4047 21.5019C9.12758 21.0242 9.2902 20.4123 9.76792 20.1352Z"
                        fill="#333333"/>
                </svg>
              </button>
            </div>
          </div>

          <transition>
            <PostForm v-if="currentTab === AdminPageTabs.POST_TAB"/>
          </transition>
          <transition>
            <ProjectForm v-if="currentTab === AdminPageTabs.PROJECT_TAB" />
          </transition>
          <transition>
            <TagForm v-if="currentTab === AdminPageTabs.TAG_TAB" />
          </transition>
          <transition>
            <NotificationList
              v-if="currentTab === AdminPageTabs.NOTIFICATION_TAB"
              :read-notifications="readNotifications"
              :unread-notifications="unreadNotifications"
              @notificationsRed="readNotificationsHandler"
              @deleted="deleteNotification"
            />
          </transition>
          <transition>
            <ArchivedPostList
              v-if="currentTab === AdminPageTabs.ARCHIVE_TAB"
              @changeTab="setCurrentTab"
            />
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import PostForm from '@/components/PostForm.vue'
import { AdminPageTabs, AdminPageTabsType } from '@/types/AdminPageTabs'
import ProjectForm from '@/components/ProjectForm.vue'
import TagForm from '@/components/TagForm.vue'
import NotificationList from '@/components/NotificationList.vue'
import ArchivedPostList from '@/components/ArchivedPostList.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useNotifications } from '@/hooks/post/useNotifications'
import { PostNotification } from '@/types/Post'

export default defineComponent({
  name: 'AdminPage',
  components: { AdminLogin, ArchivedPostList, NotificationList, TagForm, ProjectForm, PostForm },
  setup () {
    const currentTab = ref<AdminPageTabsType>(AdminPageTabs.POST_TAB)
    const store = useStore()
    const route = useRoute()
    const { notifications } = useNotifications()
    const unreadNotifications = ref<PostNotification[]>([])
    const readNotifications = ref<PostNotification[]>([])

    watchEffect(() => {
      if (!unreadNotifications.value.length) {
        notifications.value.forEach(notification => {
          if (notification.is_read) {
            return readNotifications.value.push(notification)
          }
          return unreadNotifications.value.push(notification)
        })
      }
    })

    function setCurrentTab (tab: AdminPageTabsType) {
      currentTab.value = tab
    }

    function readNotificationsHandler () {
      notifications.value = notifications.value.map(notification => {
        notification.is_read = true
        return notification
      })
      unreadNotifications.value = []
    }

    function deleteNotification (notificationId: number) {
      notifications.value = notifications.value.filter(notification => notification.id !== notificationId)
      unreadNotifications.value = []
      readNotifications.value = []
    }

    onMounted(() => {
      if (route.query.project) {
        setCurrentTab(AdminPageTabs.PROJECT_TAB)
      }
    })

    return {
      currentTab,
      AdminPageTabs,
      store,
      setCurrentTab,
      readNotifications,
      readNotificationsHandler,
      unreadNotifications,
      deleteNotification
    }
  }
})
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.admin__tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .admin__tabs__row {
    display: flex;
  }

  button {
    background-color: transparent;

    svg path {
      transition: all 0.2s linear;
    }

    &.active,
    &:hover {
      svg path {
        stroke: #4A3AFF;
      }
    }

    &:last-of-type {
      margin-left: 35px;
    }
  }

  .notification-btn {
    position: relative;

    &.active,
    &:hover {
      svg path {
        stroke: none;
        fill: #4A3AFF;
      }
    }

    span {
      padding: 1px 7px;
      position: absolute;
      right: -10px;
      top: -5px;

      background-color: #FF6565;
      color: #fff;
      border-radius: 6px;
    }
  }

  h2 {
    position: relative;
    margin-left: 36px;
    padding-bottom: 8px;

    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #9D9D9D;
    cursor: pointer;
    transition: all 0.2s linear;

    &:first-of-type {
      margin-left: 0;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;

      opacity: 0;
      background-color: #333333;
      transition: all 0.2s linear;
    }

    &:hover,
    &.active {
      color: #333333;

      &::before {
        opacity: 1;
      }
    }
  }
}
</style>
