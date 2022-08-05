import { ref, onMounted } from 'vue'
import { projectAPI } from '@/api/API'
import { Project } from '@/types/Project'

export function useProjects () {
  const projects = ref<Project[]>([])
  const totalPages = ref(0)
  const isProjectsLoading = ref(false)
  const projectError = ref('')

  const fetching = async (page = 1) => {
    try {
      isProjectsLoading.value = true

      const response = await projectAPI.fetchProjects(page)

      totalPages.value = response.data.pages

      if (projects.value) {
        projects.value = [...projects.value, ...response.data.projects]
      } else {
        projects.value = response.data.projects
      }
      if (projectError.value) {
        projectError.value = ''
      }
    } catch (e) {
      projectError.value = 'Произошла ошибка при получении проектов'
    } finally {
      isProjectsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    projects,
    isProjectsLoading,
    totalPages,
    fetching
  }
}
