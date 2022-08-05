<template>
  <div class="post" @click="showOptions = false">

    <div class="post__image" v-if="post.image">
      <img :src="APIUrl + post.image" :alt="post.title"/>
    </div>

    <div class="post__row-content">
      <div class="post__header">
        <h2 class="post__title">{{post.title ? post.title : 'Быстрый пост'}}</h2>
        <div class="post__header__end">
          <p class="post__date">{{postDate.toLocaleDateString()}}</p>
          <likes-component
            :likes="post.likes.length"
            :like-btn-click-handler="incrementPostLikeHandler"
            :is-liked="isLiked"
          />
          <options-btn @click.stop="showOptions = !showOptions" v-if="store.state.isAdminAuth"/>
          <options-component
            :show="showOptions"
            @delete="showModal = true"
            @edit="setEditPost"
          />
        </div>
      </div>

      <p class="post__text">
        {{post.short_text}}
      </p>

      <div class="post__footer">
        <div class="post__tags">
          <tag-component
            v-for="tag in postTags"
            :key="tag.id"
            :title="tag.title"
          />
        </div>

        <button-component v-if="!post.short_post" @click="$router.push('/post/' + post.id)">Читать</button-component>
      </div>
    </div>

    <modal-component
      :title="'Подтвердить действие'"
      :show="showModal"
      @closeModal="showModal = false"
    >
      <confirm-modal
        :title="'Вы действительно хотите удалить этот пост?'"
        @confirm="deletePostHandler"
        @decline="showModal = false"
      />
    </modal-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue'
import { Post, PostNotification } from '@/types/Post'
import { APIUrl } from '@/api/API'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import TagComponent from '@/components/TagComponent.vue'
import LikesComponent from '@/components/UI/LikesComponent.vue'
import OptionsBtn from '@/components/UI/OptionsBtn.vue'
import OptionsComponent from '@/components/UI/OptionsComponent.vue'
import ModalComponent from '@/components/UI/ModalComponent.vue'
import ConfirmModal from '@/components/UI/ConfirmModal.vue'
import { Tag } from '@/types/Tag'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import deletePost from '@/api/post/deletePost'
import incrementPostLike from '@/api/post/incrementPostLike'
import createNotification from '@/api/post/createNotification'

export default defineComponent({
  name: 'PostComponent',
  components: { ConfirmModal, ModalComponent, OptionsComponent, OptionsBtn, LikesComponent, TagComponent, ButtonComponent },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    },
    tags: {
      type: Array as PropType<Tag[]>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const postDate = ref(new Date(props.post.published_date))
    const showOptions = ref(false)
    const showModal = ref(false)
    const postTags = ref<Tag[]>()
    const isLiked = ref(false)

    function setEditPost () {
      store.commit('setEditPost', props.post)
      router.push('/admin')
    }

    function deletePostHandler () {
      showModal.value = false
      deletePost(props.post.id)
      store.dispatch('deletePost', props.post.id)
    }

    function incrementPostLikeHandler () {
      if (!isLiked.value) {
        incrementPostLike(props.post.id).then((res) => {
          store.dispatch('incrementPostLike', res?.data)
          isLiked.value = true
        })

        const notification: PostNotification = {
          id: 1,
          post: props.post.id,
          message: `Кто-то лайкнул пост <span>${props.post.title}</span>`
        }

        if (props.post.image) {
          notification.image = props.post.image
        }

        createNotification(notification)
      }
    }

    watchEffect(() => {
      if (props.post) {
        postTags.value = props.tags.filter(tag => props.post.tags.includes(+tag.id))
      }
    })

    return {
      postDate,
      APIUrl,
      showOptions,
      showModal,
      postTags,
      setEditPost,
      deletePostHandler,
      incrementPostLikeHandler,
      isLiked,
      store
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.post {
  margin-bottom: 40px;
  width: 100%;
  display: flex;

  background: #FFFFFF;
  border-radius: 30px;

  @include breakpoint($lg-width) {
    flex-direction: column;
  }

  .post__image {
    max-width: 250px;
    width: 100%;

    height: inherit;

    border-radius: 25px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      border-radius: 25px;
      object-position: center;
    }

    @include breakpoint($lg-width) {
      max-width: none;
    }
  }

  .post__row-content {
    width: 100%;
    padding: 40px;

    @include breakpoint($sm-width) {
      padding: 10px;
    }
  }

  .post__header {
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include breakpoint($sm-width) {
      flex-direction: column;
      align-items: normal;
    }
  }

  .post__header__end {
    margin-top: 1px;
    position: relative;
    display: flex;
    align-items: center;

    @include breakpoint($sm-width) {
      justify-content: flex-end;

      .post__date {
        margin-right: auto;
      }
    }
  }

  .post__date {
    margin-right: 25px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #A5A5A5;
  }

  .post__title {
    margin-right: 30px;

    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.02em;

    @include breakpoint($sm-width) {
      margin-bottom: 10px;
    }
  }

  .post__text {
    margin-bottom: 40px;

    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.03em;

    @include breakpoint($sm-width) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  .btn {
    width: 100%;
  }

  .post__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include breakpoint($sm-width) {
      flex-direction: column;
      align-items: normal;
    }

    button {
      width: 20%;
    }

    .post__tags {
      flex: 1;
      display: flex;
      margin: 0 -10px;
      margin-left: -17px;
      flex-wrap: wrap;

      p {
        margin: 10px;
      }

      @include breakpoint($sm-width) {
        margin: -5px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
    }
  }

}
</style>
