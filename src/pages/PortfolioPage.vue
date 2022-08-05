<template>
  <section class="portfolio">
    <div class="container">
      <div class="portfolio__inner">
        <h1 class="section-title">Портфолио</h1>
        <div class="projects">
          <transition-group name="project-list">
            <project-component :project="project" v-for="project in store.state.project.projects" :key="project.id" />
          </transition-group>
        </div>
        <div
          v-if="!store.state.project.isProjectsLoading"
          class="projects-end"
          v-intersection="{
            callback: loadMoreProjects,
            totalPages: store.state.project.totalProjectPages,
            currentPage
          }"
        />
        <spinner v-if="store.state.project.isProjectsLoading" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import Spinner from '@/components/UI/Spinner.vue'
import ProjectComponent from '@/components/ProjectComponent.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PortfolioPage',
  components: { ProjectComponent, Spinner },
  setup () {
    const currentPage = ref(1)
    const store = useStore()

    function loadMoreProjects () {
      currentPage.value += 1
      store.dispatch('fetchProjects', currentPage.value)
    }

    onMounted(() => {
      store.dispatch('fetchProjects')
    })
    onUnmounted(() => {
      store.commit('setProjects', [])
    })

    return {
      store,
      loadMoreProjects,
      currentPage
    }
  }
})
</script>

<style scoped lang="scss">
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.4s ease;
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.projects-end {
  width: 100%;
  content: '&nbsp;';
  opacity: 0;
  height: 30px;
}
</style>
