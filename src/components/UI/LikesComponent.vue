<template>
  <div class='likes-wrapper'>
    <div class="likes" v-show="showLikes">{{likes}}</div>
    <like-btn
      :class="{
        active: isLiked
      }"
      @mouseenter="showLikes = true"
      @mouseleave="showLikes = false"
      @click="likeBtnClickHandler"
    />
  </div>
</template>

<script lang="ts">
import LikeBtn from './LikeBtn.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'LikesComponent',
  components: { LikeBtn },
  props: {
    likes: {
      type: Number,
      required: true
    },
    likeBtnClickHandler: {
      type: Function,
      required: true
    },
    isLiked: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    const showLikes = ref(false)

    return {
      showLikes
    }
  }
})
</script>

<style scoped lang="scss">
.likes-wrapper {
  position: relative;

  .likes {
    position: absolute;
    left: 90%;
    top: -60px;
    padding: 15px;

    border-radius: 10px;
    background-color: white;
    transition: all 0.2s ease-in-out;
    transform: translateX(-75%);
  }
}
</style>
