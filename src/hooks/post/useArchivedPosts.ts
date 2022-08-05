import { ref, onMounted } from 'vue'
import { Post } from '@/types/Post'
import { postAPI } from '@/api/API'

export function useArchivedPosts () {
  const posts = ref<Post[]>([])
  const isPostsLoading = ref(true)

  const fetching = async () => {
    try {
      const response = await postAPI.fetchArchivedPosts()

      posts.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      isPostsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    posts,
    isPostsLoading
  }
}
