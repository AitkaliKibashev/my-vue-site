<template>
  <div class="comment">

    <span v-if="store.state.isAdminAuth" class="comment__delete" @click="deleteCommentHandler">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#333333" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#333333" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
    </span>

    <div class="comment__header">
      <div class="comment__ava" :style="{background: avaColors[randomNumber]}">
        {{ comment.user[0] }}
      </div>
      <div class="comment__header__row">
        <h3 class="comment__author">
          {{ comment.user }}
        </h3>
        <p class="comment__date">
          {{ commentDate.toLocaleDateString() }}
        </p>
      </div>
    </div>
    <div class="comment__content">
      {{ comment.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { PostComment } from '@/types/Post'
import { useStore } from 'vuex'
import deleteComment from '@/api/post/deleteComment'

export default defineComponent({
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object as PropType<PostComment>,
      required: true
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const commentDate = ref(new Date(props.comment.created_date))
    const avaColors = ['#D4FFD3', '#FEFFD3', '#FFD3D3', '#D3FFFC', '#D3DDFF', '#FCD3FF']
    const randomNumber = Math.floor(Math.random() * avaColors.length)

    function deleteCommentHandler () {
      deleteComment(props.comment.id)
      emit('deleted', props.comment.id)
    }

    return {
      commentDate,
      avaColors,
      randomNumber,
      deleteCommentHandler,
      store
    }
  }
})
</script>

<style scoped lang="scss">
.comment {
  margin-bottom: 60px;
  padding-bottom: 20px;
  position: relative;

  border-bottom: 1px solid #BFBFBF;

  .comment__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .comment__ava {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 36px;
    font-weight: 900;

    border-radius: 50%;
    overflow: hidden;

    color: #333333;
  }

  .comment__delete {
    position: absolute;
    top: 0;
    right: 10px;

    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      svg path {
        stroke: #4a3aff;
      }
    }
  }

  .comment__header__row {
    margin-left: 30px;
  }

  .comment__author {
    margin-bottom: 20px;

    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
  }

  .comment__date {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #A5A5A5;
  }

  .comment__content {
    max-width: 600px;

    font-weight: 400;
    font-size: 16px;
    line-height: 140%;

    letter-spacing: 0.03em;
  }
}
</style>
