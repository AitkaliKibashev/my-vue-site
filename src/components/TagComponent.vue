<template>
  <p class="tag" @click="handleClick">
    #{{ title }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TagComponent',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()

    function handleClick () {
      store.commit('setPostsQuery', 'tag:'.concat(props.title))
      router.push('/search')
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.tag {
  margin: 0 10px;
  padding: 9px 16px;

  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.03em;

  background: #E6FFEC;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
     background: #cff5d7;
   }

  @include breakpoint($sm-width) {
    margin: 5px;
    padding: 5px 12px;
    font-size: 14px;
  }
}
</style>
