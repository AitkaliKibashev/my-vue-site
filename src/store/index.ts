import { createStore } from 'vuex'
import { Project } from '@/types/Project'
import { Post } from '@/types/Post'
import { RootState } from '@/types/RootState'
import { post } from '@/store/post'
import { project } from '@/store/project'

export default createStore<RootState>({
  state: {
    postsQuery: '',
    isAdminAuth: false,
    toEditPost: null,
    toEditProject: null
  },
  getters: {
  },
  mutations: {
    setPostsQuery (state, payload: string) {
      state.postsQuery = payload
    },
    setAdminAuth (state, payload: boolean) {
      state.isAdminAuth = payload
    },
    setEditPost (state, payload: Post) {
      state.toEditPost = payload
    },
    setEditProject (state, payload: Project) {
      state.toEditProject = payload
    }
  },
  actions: {

  },
  modules: {
    post,
    project
  }
})
