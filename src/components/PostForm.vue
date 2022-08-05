<template>
  <form class="add-form" @submit.prevent="handleSubmit">
    <h2>{{isUpdatePost ? 'Изменить' : 'Добавить'}} пост</h2>
    <p v-if="isSuccess" class="success">Успешно добавлено/изменено</p>
    <p v-if="postImage">{{ postImage.name }}</p>

    <div class="form-header">
      <input-component placeholder="Заголовок поста" v-model="title"/>
      <image-input @changeImage="changeImage"/>
    </div>
    <textarea-component v-model="shortText" placeholder="Короткая запись поста" />
    <div class="editor-wrapper">
      <ckeditor v-model="editorData" :editor="editor" />
    </div>

    <h3>Тэги</h3>
    <div class="tags-wrapper">

      <label v-for="tag in tags" :key="tag.id" class="tag">
        <input
          type="checkbox"
          :checked="selectedTags.includes(tag.id)"
          :value="tag.id"
          @change="selectTag"
        />
        #{{ tag.title }}
      </label>

    </div>

    <div class="checkboxes__wrapper">
      <checkbox-component :model-value="isPublish" @update:modelValue="updatePublish">
        Опубликовать
      </checkbox-component>
      <checkbox-component :model-value="isShortPost" @update:modelValue="updateShortPost">
        Короткий пост
      </checkbox-component>
    </div>

    <button-component>{{isUpdatePost ? 'Изменить' : 'Добавить'}} пост</button-component>
  </form>
</template>

<script lang="ts">
import InputComponent from './UI/InputComponent.vue'
import TextareaComponent from './UI/TextareaComponent.vue'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CheckboxComponent from '@/components/UI/CheckboxComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import ImageInput from '@/components/UI/ImageInput.vue'
import { useStore } from 'vuex'
import { Post } from '@/types/Post'
import { createPost } from '@/api/post/createPost'
import { useTags } from '@/hooks/tag/useTags'
import { updatePost } from '@/api/post/updatePost'

export default defineComponent({
  name: 'PostForm',
  components: { ImageInput, ButtonComponent, CheckboxComponent, TextareaComponent, InputComponent },
  setup () {
    const store = useStore()
    const editor = ref(ClassicEditor)
    const editorData = ref('')
    const isPublish = ref(false)
    const isShortPost = ref(false)
    const title = ref('')
    const shortText = ref('')
    const postImage = ref<File | null>(null)
    const isUpdatePost = ref(false)
    const { tags } = useTags()
    const selectedTags = ref<(number)[]>([])
    const isSuccess = ref(false)

    function updatePublish (value: boolean) {
      isPublish.value = value
    }

    function updateShortPost (value: boolean) {
      isShortPost.value = value
    }

    function selectTag (event: Event) {
      const target = event.target as HTMLInputElement
      if (selectedTags.value.includes(+target.value)) {
        selectedTags.value = selectedTags.value.filter(tag => tag !== +target.value)
      }
      selectedTags.value.push(+target.value)
    }

    function setPost () {
      const toEditPost: Post = store.state.toEditPost
      if (toEditPost) {
        editorData.value = toEditPost.content
        title.value = toEditPost.title
        isPublish.value = toEditPost.published
        shortText.value = toEditPost.short_text
        isUpdatePost.value = true
      }
    }

    function changeImage (event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        postImage.value = target.files[0]
      }
    }

    function clearForm () {
      editorData.value = ''
      title.value = ''
      shortText.value = ''
      isShortPost.value = false
      isPublish.value = false
      isUpdatePost.value = false
      selectedTags.value = []
      postImage.value = null
    }

    function handleSubmit () {
      const formData = new FormData()

      if (postImage.value) {
        formData.append('image', postImage.value)
      }
      if (isPublish.value) {
        formData.append('published', 'true')
      }
      if (isShortPost.value) {
        formData.append('short_post', 'true')
      }

      formData.append('title', title.value)
      formData.append('short_text', shortText.value)
      formData.append('content', editorData.value)

      for (let i = 0; i < selectedTags.value.length; i++) {
        formData.append('tags', selectedTags.value[i].toString())
      }

      if (isUpdatePost.value) {
        updatePost(formData, store.state.toEditPost.id).then(() => {
          clearForm()
          isSuccess.value = true
        })
      } else {
        createPost(formData).then(() => {
          clearForm()
          isSuccess.value = true
        })
      }
    }

    onMounted(setPost)
    onUnmounted(() => {
      store.commit('setEditPost', null)
    })

    return {
      postImage,
      editor,
      editorData,
      isPublish,
      isShortPost,
      updatePublish,
      updateShortPost,
      title,
      shortText,
      changeImage,
      isUpdatePost,
      tags,
      selectedTags,
      selectTag,
      handleSubmit,
      isSuccess
    }
  }
})
</script>
