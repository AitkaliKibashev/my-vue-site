<template>
  <form class="add-form" @submit.prevent="submitHandler">
    <h2>Добавить тэг</h2>
    <p v-if="isSuccess" class="success">Успешно добавлено</p>
    <input-component
      placeholder='Название тэга'
      v-model="title"
    />
    <input-component
      placeholder='Слаг название'
      v-model="slug"
    />

    <button-component>Добавить тэг</button-component>
  </form>
</template>

<script lang="ts">
import InputComponent from './UI/InputComponent.vue'
import { defineComponent, ref } from 'vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import { createTag } from '@/api/tag/createTag'

export default defineComponent({
  name: 'TagForm',
  components: { ButtonComponent, InputComponent },
  setup: function () {
    const title = ref('')
    const slug = ref('')
    const isSuccess = ref(false)

    function submitHandler () {
      createTag({ title: title.value, slug: slug.value }).then(() => {
        title.value = ''
        slug.value = ''
        isSuccess.value = true
      })
    }

    return {
      title,
      slug,
      submitHandler,
      isSuccess
    }
  }
})
</script>
