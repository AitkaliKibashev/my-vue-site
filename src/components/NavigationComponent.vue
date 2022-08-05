<template>
  <ul>
    <li><router-link to='/'>Главная</router-link></li>
    <li><router-link to='/about/'>Обо мне</router-link></li>
    <li><router-link to='/portfolio/'>Портфолио</router-link></li>
    <li><router-link to='/tags/'>Тэги</router-link></li>

    <li v-if="store.state.isAdminAuth"><router-link to='/admin/'>Админ панель</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NavigationComponent',
  setup () {
    const store = useStore()

    return {
      store
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

ul {
  display: flex;
  list-style: none;
  margin: 0 -20px;

  @include breakpoint($md-width) {
    display: block;
    margin: -20px 0;
  }

  li {
    margin: 0 20px;

    cursor: pointer;

    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      text-decoration: underline;
    }

    @include breakpoint($md-width) {
      margin: 20px 0;
      font-size: 18px;
    }
  }
}
</style>
