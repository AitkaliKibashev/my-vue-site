import { Module } from 'vuex'
import { ProjectState } from '@/types/ProjectState'
import { RootState } from '@/types/RootState'
import { Project } from '@/types/Project'
import { projectAPI } from '@/api/API'

export const project: Module<ProjectState, RootState> = {
  state: () => ({
    projects: [],
    projectError: '',
    totalProjectPages: 1,
    isProjectsLoading: false
  }),
  mutations: {
    setProjects (state, payload: Project[]) {
      state.projects = payload
    },
    setProjectError (state, payload: string) {
      state.projectError = payload
    },
    setProjectsLoading (state, payload: boolean) {
      state.isProjectsLoading = payload
    },
    setTotalProjectPages (state, payload: number) {
      state.totalProjectPages = payload
    }
  },
  actions: {
    async fetchProjects ({ commit, state }, page = 1) {
      try {
        commit('setProjectsLoading', true)

        const response = await projectAPI.fetchProjects(page)

        commit('setTotalProjectPages', response.data.pages)

        if (state.projects.length) {
          commit('setProjects', [...state.projects, ...response.data.projects])
        } else {
          commit('setProjects', response.data.projects)
        }
        if (state.projectError) {
          commit('setProjectError', '')
        }
      } catch (e) {
        commit('setProjectError', 'Произошла ошибка при получении проектов')
      } finally {
        commit('setProjectsLoading', false)
      }
    },
    deleteProject ({ commit, state }, id) {
      commit('setProjects', state.projects.filter(project => project.id !== id))
    },
    incrementProjectLike ({ commit, state }, like: { id: number, project: number, like: number }) {
      commit('setProjects', state.projects.map(project => {
        if (project.id === like.project) {
          project.likes.push(like)
        }
        return project
      }))
    }
  }
}
