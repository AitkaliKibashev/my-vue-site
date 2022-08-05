<template>
  <form class="add-form" @submit.prevent="handleSubmit">
    <h2>{{isUpdateProject ? 'Изменить' : 'Добавить'}} проект</h2>
    <p v-if="isSuccess" class="success">Успешно добавлено/изменено</p>
    <p v-if="projectImage">{{ projectImage.name }}</p>
    <div class="form-header">
      <input-component
        v-model="title"
        placeholder='Заголовок проекта'
      />
      <image-input @changeImage="changeImage"/>
    </div>
    <div class="editor-wrapper">
      <ckeditor v-model="editorData" :editor="editor" />
    </div>
    <input-component
      v-model="link"
      placeholder='Ссылка на проект'
    />

    <button-component>{{isUpdateProject ? 'Изменить' : 'Добавить'}} проект</button-component>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import ImageInput from '@/components/UI/ImageInput.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import { Project } from '@/types/Project'
import { useStore } from 'vuex'
import { createProject } from '@/api/project/createProject'
import { updateProject } from '@/api/project/updateProject'

export default defineComponent({
  name: 'ProjectForm',
  components: { ButtonComponent, InputComponent, ImageInput },
  setup () {
    const store = useStore()
    const editor = ref(ClassicEditor)
    const editorData = ref('')
    const title = ref('')
    const link = ref('')
    const projectImage = ref<File | null>(null)
    const isUpdateProject = ref(false)
    const isSuccess = ref(false)

    function setProject () {
      const toEditProject: Project = store.state.toEditProject
      if (toEditProject) {
        editorData.value = toEditProject.content
        title.value = toEditProject.title
        link.value = toEditProject.link
        isUpdateProject.value = true
      }
    }

    function clearForm () {
      editorData.value = ''
      title.value = ''
      isUpdateProject.value = false
      projectImage.value = null
      link.value = ''
    }

    function changeImage (event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        projectImage.value = target.files[0]
      }
    }

    function handleSubmit () {
      const formData = new FormData()

      if (projectImage.value) {
        formData.append('image', projectImage.value)
      }

      formData.append('title', title.value)
      formData.append('link', link.value)
      formData.append('content', editorData.value)

      if (isUpdateProject.value) {
        updateProject(formData, store.state.toEditProject.id).then(() => {
          clearForm()
          isSuccess.value = true
        })
      } else {
        createProject(formData).then(() => {
          clearForm()
          isSuccess.value = true
        })
      }
    }

    onMounted(setProject)
    onUnmounted(() => {
      store.commit('setEditProject', null)
    })

    return {
      editor,
      editorData,
      title,
      link,
      projectImage,
      isUpdateProject,
      handleSubmit,
      changeImage,
      isSuccess
    }
  }
})
</script>
