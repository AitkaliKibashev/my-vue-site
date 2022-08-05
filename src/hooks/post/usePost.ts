import { ref, onMounted } from 'vue'
import { Post } from '@/types/Post'
import { postAPI } from '@/api/API'

export function usePost (postId: number) {
  const post = ref<Post>()
  const isPostLoading = ref(true)

  const fetching = async () => {
    try {
      const response = await postAPI.getPost(postId)

      post.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      isPostLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    post,
    isPostLoading
  }
}
