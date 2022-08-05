import { Project } from '@/types/Project'

export interface ProjectState {
  projects: Project[],
  isProjectsLoading: boolean,
  projectError: string,
  totalProjectPages: number
}
