<template>
  <header-component @toggleSidebar="showSidebar = true"/>
  <sidebar :show="showSidebar"/>
  <router-view @click="showSidebar = false"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import HeaderComponent from '@/components/Header.vue'
import { useCheckAdmin } from '@/hooks/admin/useCheckAdmin'

export default defineComponent({
  components: { HeaderComponent, Sidebar },
  setup () {
    const showSidebar = ref(false)
    useCheckAdmin()

    return {
      showSidebar
    }
  }
})
</script>

<style lang="scss">

</style>
