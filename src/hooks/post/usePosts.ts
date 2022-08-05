import { ref, onMounted } from 'vue'
import { Post } from '@/types/Post'
import { postAPI } from '@/api/API'
import { useStore } from 'vuex'

export function usePosts () {
  const posts = ref<Post[]>([])
  const totalPages = ref(0)
  const isPostsLoading = ref(true)
  const postsError = ref('')
  const store = useStore()
  const query = store.state.postsQuery

  const fetching = async (page = 1) => {
    try {
      let response

      if (query) {
        response = await postAPI.queryPosts(page, query)
      } else {
        response = await postAPI.fetchPosts(page)
      }

      totalPages.value = response.data.pages

      if (postsError.value) {
        postsError.value = ''
      }
      if (posts.value) {
        posts.value = [...posts.value, ...response.data.posts]
      } else {
        posts.value = response.data.posts
      }
    } catch (e) {
      postsError.value = 'Произошла ошибка при получении постов'
    } finally {
      isPostsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    posts, isPostsLoading, totalPages, fetching
  }
}
