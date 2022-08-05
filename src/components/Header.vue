<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <button class="burger-menu-btn" @click="$emit('toggleSidebar')">
          <span/>
        </button>
        <nav class="header__nav">
          <navigation-component/>
        </nav>
        <button
          class="search-btn"
          @click="searchHandler"
        />
        <div class="search-input-wrapper" :class="{active: showSearchInput}">
          <input-component v-focus="inputFocus" v-model="searchValue" />
          <button
            class="close"
            @click="closeBtnClickHandler"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import NavigationComponent from '@/components/NavigationComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import { defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderComponent',
  components: { InputComponent, NavigationComponent },
  setup () {
    const store = useStore()
    const router = useRouter()
    const searchValue = ref('')
    const showSearchInput = ref(false)
    const inputFocus = ref(false)

    watchEffect(() => {
      if (showSearchInput.value) {
        inputFocus.value = true
        return
      }
      inputFocus.value = false
    })

    function closeBtnClickHandler () {
      showSearchInput.value = false
      searchValue.value = ''
      store.commit('setPostsQuery', searchValue.value)
    }

    function searchHandler () {
      if (showSearchInput.value) {
        store.commit('setPostsQuery', searchValue.value)
        store.commit('setPosts', [])
        router.push('/search')
        return
      }
      showSearchInput.value = true
    }

    return {
      searchValue,
      showSearchInput,
      inputFocus,
      searchHandler,
      closeBtnClickHandler
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.header {
  overflow: hidden;
  margin-left: $sidebar-width;
  position: relative;

  @include breakpoint($md-width) {
    margin-left: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;

    background: radial-gradient(50% 50% at 50% 50%, #e2e1e1 0%, rgba(219, 219, 219, 0) 100%);
  }

  .header__inner {
    padding: 30px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .burger-menu-btn {
    display: none;
    position: relative;
    width: 24px;
    height: 21px;

    background-color: transparent;

    @include breakpoint($md-width) {
      display: block;
    }

    &::before,
    &::after,
    span {
      content: '';
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 3px;

      background-color: black;
    }

    span {
      top: 9px;
    }

    &::after {
      top: auto;
      bottom: 0;
    }
  }

  &__nav {
    @include breakpoint($md-width) {
      display: none;
    }
  }

  .search-btn {
    width: 24px;
    height: 24px;

    cursor: pointer;
    background-image: url("../assets/images/search.svg");
    background-color: transparent;
  }

  .search-input-wrapper {
    position: absolute;
    right: 30px;
    z-index: -1;
    display: flex;
    align-items: center;

    opacity: 0;
    transform: translateX(40%);
    transition: all 0.2s ease-in-out;

    &.active {
      opacity: 1;
      z-index: 1;
      transform: translateX(0);
    }

    .close {
      position: relative;
      left: -30px;
      width: 18px;
      height: 18px;

      cursor: pointer;
      background-image: url("../assets/images/close.png");
      background-size: cover;
      background-color: transparent;
    }

    .search-input {
      width: 250px;
      background-color: #F7F5FF;
    }
  }
}
</style>
