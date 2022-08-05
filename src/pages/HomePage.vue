<template>
  <section class="home">
  <div class="container">
    <div class="home__inner">
      <h1 class="section-title">{{query ? 'Результаты поиска' : 'Все посты'}}</h1>

      <div class="no-posts" v-if="!store.state.post.posts.length && !store.state.post.isPostsLoading">
        <h2 >Постов не найдено :(</h2>
        <button-component @click="$router.go(-1)">Вернуться назад</button-component>
      </div>

      <div class="posts">
        <transition-group name="post-list">
          <post-component
            v-for="post in store.state.post.posts"
            :post="post"
            :key="post.id"
            :tags="tags"
          />
        </transition-group>
      </div>
      <spinner-component v-if="store.state.post.isPostsLoading" />
      <div
        v-if="!store.state.post.isPostsLoading"
        class="posts__end"
        v-intersection="{
          callback: loadMorePosts,
          totalPages: store.state.post.totalPostPages,
          currentPage
        }"
      ></div>
    </div>
  </div>
  </section>
</template>

<script lang="ts">

import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import PostComponent from '@/components/PostComponent.vue'
import SpinnerComponent from '@/components/UI/Spinner.vue'
import { useTags } from '@/hooks/tag/useTags'
import { useStore } from 'vuex'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

export default defineComponent({
  name: 'HomePage',
  components: { ButtonComponent, SpinnerComponent, PostComponent },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const currentPage = ref(1)
    const store = useStore()
    const { tags } = useTags()

    const fetchPayload = {
      page: currentPage.value,
      query: props.query,
      fetchMore: false
    }

    function loadMorePosts () {
      currentPage.value += 1

      store.dispatch('fetchPosts', fetchPayload.fetchMore = true)
    }

    onMounted(() => {
      store.dispatch('fetchPosts', fetchPayload)
    })
    onUnmounted(() => {
      store.commit('setPosts', [])
    })

    return {
      currentPage,
      loadMorePosts,
      tags,
      store
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.home__add-post {
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home__add-post__file-btn {
  margin-left: 50px;

  background-color: transparent;
  cursor: pointer;

  @include breakpoint($sm-width) {
    margin-left: 20px;
  }
}

.section-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
}

.posts__end {
  height: 30px;
}
</style>
