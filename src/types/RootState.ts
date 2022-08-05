import { Project } from '@/types/Project'
import { Post } from '@/types/Post'

export interface RootState {
  postsQuery: string,
  isAdminAuth: boolean,
  toEditProject: Project | null,
  toEditPost: Post | null
}
