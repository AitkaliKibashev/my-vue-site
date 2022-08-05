<template>
  <div class="archived-post">
    <div class="archived-post__image" v-if="post.image">
      <img :src="APIUrl + post.image" :alt="post.title"/>
    </div>

    <div class="archived-post__content">
      <div class="archived-post__header">
        <h2>{{ post.title ? post.title : 'Быстрый пост' }}</h2>

        <options-btn @click.stop="showOptions = !showOptions"/>
        <options-component
          :show="showOptions"
          @delete="showModal = true"
          @edit="setEditPost"
        />
      </div>
      <p>{{ post.short_text }}</p>
    </div>

    <modal-component
      :title="'Подтвердить действие'"
      :show="showModal"
      @closeModal="showModal = false"
    >
      <confirm-modal
        :title="'Вы действительно хотите удалить этот пост?'"
        @decline="showModal = false"
      />
    </modal-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ModalComponent from '@/components/UI/ModalComponent.vue'
import ConfirmModal from '@/components/UI/ConfirmModal.vue'
import OptionsBtn from '@/components/UI/OptionsBtn.vue'
import OptionsComponent from '@/components/UI/OptionsComponent.vue'
import { APIUrl } from '@/api/API'
import { Post } from '@/types/Post'
import { useStore } from 'vuex'
import { AdminPageTabs } from '@/types/AdminPageTabs'

export default defineComponent({
  name: 'ArchivedPost',
  components: { OptionsComponent, OptionsBtn, ConfirmModal, ModalComponent },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup (props, { emit }) {
    const showModal = ref(false)
    const showOptions = ref(false)
    const store = useStore()

    function setEditPost () {
      store.commit('setEditPost', props.post)
      emit('changeTab', AdminPageTabs.POST_TAB)
    }

    return {
      showModal,
      showOptions,
      APIUrl,
      setEditPost
    }
  }
})
</script>

<style scoped lang="scss">
.archived-post {
  margin-bottom: 20px;
  padding: 30px 40px;
  width: 100%;
  display: flex;
  align-items: center;

  background: #FFFFF5;
  border-radius: 30px;

  .archived-post__content {
    width: 100%;
  }

  .archived-post__header {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .archived-post__image {
    margin-right: 40px;
    width: 100%;
    max-width: 120px;
    height: 120px;

    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 20px;
  }

  p {
    max-width: 600px;

    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
