<template>
  <form class="comment-form" @submit.prevent="submitHandler">
    <InputComponent v-model="username" placeholder="Имя"/>
    <TextareaComponent v-model="text" placeholder="Комментарий"/>

    <button-component>Оставить комментарий</button-component>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import TextareaComponent from '@/components/UI/TextareaComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import { createComment } from '@/api/post/createComment'

export default defineComponent({
  name: 'CommentForm',
  components: { ButtonComponent, TextareaComponent, InputComponent },
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    const username = ref('')
    const text = ref('')

    function submitHandler () {
      const comment = {
        text: text.value,
        user: username.value,
        post: props.postId
      }

      createComment(comment).then((res) => {
        emit('created', res?.data)
      })
    }

    return {
      username,
      text,
      submitHandler
    }
  }
})
</script>

<style scoped lang="scss">
.comment-form {
  display: flex;
  flex-direction: column;

  textarea {
    margin-bottom: 30px;
  }

  input {
    margin-bottom: 30px;

    border-radius: 30px!important;
  }

  button {
    width: 300px;
    align-self: flex-end;
  }
}
</style>
