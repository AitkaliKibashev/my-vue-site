import { postAPI } from '@/api/API'
import { ref } from 'vue'

export async function updatePost (data: FormData, id: number) {
  const postError = ref('')
  try {
    await postAPI.updatePost(data, id)

    if (postError.value) {
      postError.value = ''
    }
  } catch (e) {
    postError.value = 'Произошла ошибка'
  }

  return {
    postError
  }
}
