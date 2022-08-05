import { Post } from '@/types/Post'

export interface PostState {
  posts: Post[],
  isPostsLoading: boolean,
  postError: string,
  totalPostPages: number
}
