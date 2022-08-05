<template>
  <HomePage :key="0" :query="store.state.postsQuery" />
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import HomePage from '@/pages/HomePage.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SearchPage',
  components: { HomePage },
  setup () {
    const store = useStore()
    const router = useRouter()

    watchEffect(() => {
      if (store.state.postsQuery) {
        store.dispatch('fetchPosts', {
          page: 1,
          query: store.state.postsQuery
        })
      } else {
        router.push('/')
      }
    })

    return {
      store
    }
  }
})
</script>
