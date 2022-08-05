<template>
  <div class="archived-posts">
    <spinner-component v-if="isPostsLoading" />
    <div v-if="posts.length" >
      <archived-post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @changeTab="changeAdminTab"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArchivedPost from '@/components/ArchivedPost.vue'
import { useArchivedPosts } from '@/hooks/post/useArchivedPosts'
import SpinnerComponent from '@/components/UI/Spinner.vue'
import { AdminPageTabsType } from '@/types/AdminPageTabs'

export default defineComponent({
  name: 'ArchivedPostList',
  components: { SpinnerComponent, ArchivedPost },
  setup (_, { emit }) {
    const { posts, isPostsLoading } = useArchivedPosts()

    function changeAdminTab (tab: AdminPageTabsType) {
      emit('changeTab', tab)
    }

    return {
      posts,
      isPostsLoading,
      changeAdminTab
    }
  }
})
</script>

<style scoped lang="scss">
.archived-posts {
  margin-top: 60px;
}
</style>
