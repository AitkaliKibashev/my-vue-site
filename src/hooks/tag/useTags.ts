import { ref, onMounted } from 'vue'
import { tagAPI } from '@/api/API'
import { Tag } from '@/types/Tag'

export function useTags () {
  const tags = ref<Tag[]>([])
  const isTagsLoading = ref(true)
  const tagsError = ref('')

  const fetching = async () => {
    try {
      const response = await tagAPI.fetchTags()

      tags.value = response.data

      if (tagsError.value) {
        tagsError.value = ''
      }
    } catch (e) {
      tagsError.value = 'Произошла ошибка при получении тэгов'
    } finally {
      isTagsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    tags,
    isTagsLoading,
    tagsError
  }
}
