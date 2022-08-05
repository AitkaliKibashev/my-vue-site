import { Module } from 'vuex'
import { RootState } from '@/types/RootState'
import { PostState } from '@/types/PostState'
import { Post } from '@/types/Post'
import { postAPI } from '@/api/API'

export const post: Module<PostState, RootState> = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    postError: '',
    totalPostPages: 1
  }),
  mutations: {
    setPosts (state, payload: Post[]) {
      state.posts = payload
    },
    setPostsLoading (state, payload: boolean) {
      state.isPostsLoading = payload
    },
    setPostError (state, payload: string) {
      state.postError = payload
    },
    setTotalPostPages (state, payload: number) {
      state.totalPostPages = payload
    }
  },
  actions: {
    async fetchPosts ({ commit, state }, payload = {
      query: '',
      fetchMore: false,
      page: 1
    }) {
      const { query, fetchMore, page } = payload
      try {
        commit('setPostsLoading', true)

        let response

        if (query) {
          response = await postAPI.queryPosts(page, query)
        } else {
          response = await postAPI.fetchPosts(page)
        }

        if (fetchMore) {
          commit('setPosts', [...state.posts, ...response.data.posts])
        } else {
          commit('setTotalPostPages', response.data.pages)
        }

        commit('setPosts', response.data.posts)
      } catch (e) {
        commit('setPostError', 'Произошла ошибка при получении постов')
      } finally {
        commit('setPostsLoading', false)
      }
    },
    deletePost ({ commit, state }, id: number) {
      commit('setPosts', state.posts.filter(post => post.id !== id))
    },
    incrementPostLike ({ commit, state }, like: { id: number, post: number, like: number }) {
      commit('setPosts', state.posts.map(post => {
        if (post.id === like.post) {
          post.likes.push(like)
        }
        return post
      }))
    }
  }
}
