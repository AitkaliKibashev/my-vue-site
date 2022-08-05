<template>
  <div
    class="notification-wrapper"
  >
    <div class="notification__post-image">
      <img
        :src="notification.image ?
          (APIUrl + notification.image):
          'https://cdnb.artstation.com/p/assets/images/images/018/262/883/large/lucas-gomes-paisagem03.jpg?1558740462'"
        alt="notification"
      />
    </div>
    <div
      class="notification__inner"
      @click="$router.push('/post/' + notification.post)"
      v-html="notification.message"
    >

    </div>
    <span class="notification__close" @click="deleteNotificationHandler">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#333333" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#333333" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostNotification } from '@/types/Post'
import { APIUrl } from '@/api/API'
import deleteNotification from '@/api/post/deleteNotification'

export default defineComponent({
  name: 'NotificationComponent',
  props: {
    notification: {
      type: Object as PropType<PostNotification>,
      required: true
    }
  },
  setup (props, { emit }) {
    function deleteNotificationHandler () {
      deleteNotification(props.notification.id)
      emit('deleted', props.notification.id)
    }

    return {
      APIUrl,
      deleteNotificationHandler
    }
  }
})
</script>

<style lang="scss">
.notification-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;

  color: black;
  text-decoration: none;

  background: #FFFFF5;
  border-radius: 30px;

  span {
    color: #4A3AFF;
  }

  .notification__close {
    position: absolute;
    top: 20px;
    right: 20px;

    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      svg path {
        stroke: #4a3aff;
      }
    }
  }

  .notification__inner {
    max-width: 600px;
    margin-left: 40px;

    font-size: 18px;

    color: black;
    text-decoration: none;

    &:hover {
      span {
        text-decoration: underline;
      }
    }
  }

  .notification__post-image {
    width: 100px;
    height: 100px;

    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }
}
</style>
