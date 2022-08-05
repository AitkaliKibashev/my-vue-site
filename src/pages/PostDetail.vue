<template>
  <section class="post-detail" @click="showOptions = false">
    <div class="container">
      <div class="post" v-if="post && !isPostLoading">
        <div class="post-detail__header">
          <h1 class="section-title">{{post.title || 'Быстрый пост'}}</h1>
          <div class="post-detail__header__end">
            <p class="post-detail__date">{{postDate.toLocaleDateString()}}</p>
            <likes-component
              :likes="post.likes.length"
              :is-liked="isLiked"
              :like-btn-click-handler="incrementPostLikeHandler"
            />
            <options-btn @click.stop="showOptions = !showOptions" v-if="store.state.isAdminAuth"/>
            <options-component :show="showOptions"/>
          </div>
        </div>
        <div class="post-detail__tags">
          <tag-component
            v-for="tag in postTags"
            :key="tag.id"
            :title="tag.title"
          />
        </div>

        <div class="post-detail__image">
          <img :src="APIUrl + post.image" :alt="post.title"/>
        </div>

        <div class="post-detail__content" v-html="post.content" />
        <div v-if="!post.content" class="post-detail__content">
          <p>
            {{post.short_text}}
          </p>
        </div>

        <div class="post-detail__tabs">
          <h2
            class="post-detail__tabs-title"
            :class="{active: currentTab === Tabs.COMMENTS}"
            @click="currentTab = Tabs.COMMENTS"
          >
            Комментарии
          </h2>
          <h2
            class="post-detail__tabs-title"
            :class="{active: currentTab === Tabs.COMMENT_FORM}"
            @click="currentTab = Tabs.COMMENT_FORM"
          >
            Написать
          </h2>
        </div>
        <transition>
          <div v-if="currentTab === Tabs.COMMENTS">
            <TransitionGroup name="comment-list" >
              <comment-component
                :comment="comment"
                v-for="comment in post.comments"
                :key="comment.id"
                @deleted="deleteCommentHandler"
              />
            </TransitionGroup>
          </div>

        </transition>

        <transition>
          <comment-form
            v-if="currentTab === Tabs.COMMENT_FORM"
            :post-id="post.id"
            @created="handleComment"
          />
        </transition>
      </div>
      <spinner-component v-else />
    </div>
  </section>
</template>

<script lang="ts">
import TagComponent from '../components/TagComponent.vue'
import LikesComponent from '../components/UI/LikesComponent.vue'
import OptionsBtn from '../components/UI/OptionsBtn.vue'
import OptionsComponent from '../components/UI/OptionsComponent.vue'
import { defineComponent, ref, watchEffect } from 'vue'
import { APIUrl } from '@/api/API'
import CommentComponent from '@/components/CommentComponent.vue'
import CommentForm from '@/components/CommentForm.vue'
import { usePost } from '@/hooks/post/usePost'
import { useRoute } from 'vue-router'
import SpinnerComponent from '@/components/UI/Spinner.vue'
import { PostComment, PostNotification } from '@/types/Post'
import { useTags } from '@/hooks/tag/useTags'
import { Tag } from '@/types/Tag'
import incrementPostLike from '@/api/post/incrementPostLike'
import createNotification from '@/api/post/createNotification'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PostComponent',
  components: {
    SpinnerComponent, CommentForm, CommentComponent, OptionsComponent, OptionsBtn, LikesComponent, TagComponent
  },
  setup () {
    enum Tabs {
      COMMENTS = 'COMMENTS',
      COMMENT_FORM = 'COMMENT_FORM'
    }

    const store = useStore()
    const route = useRoute()
    const { post, isPostLoading } = usePost(+route.params.id)
    const { tags } = useTags()
    const showOptions = ref(false)
    const currentTab = ref<string>(Tabs.COMMENTS)
    const postDate = ref(new Date())
    const postTags = ref<Tag[]>()
    const isLiked = ref(false)

    watchEffect(() => {
      if (post.value) {
        postDate.value = new Date(post.value.published_date)
        postTags.value = tags.value.filter(tag => post.value?.tags.includes(tag.id))
      }
    })

    function createNotificationHandler (message: string) {
      if (post.value) {
        const notification: PostNotification = {
          id: 1,
          post: post.value.id,
          message
        }

        if (post.value?.image) {
          notification.image = post.value?.image
        }

        createNotification(notification)
      }
    }

    function handleComment (comment: PostComment) {
      post.value?.comments?.push(comment)
      currentTab.value = Tabs.COMMENTS
      if (post.value) {
        const message = `<span>${comment.user}</span> оставил комментарий на пост <span>${post.value?.title}</span>`
        createNotificationHandler(message)
      }
    }

    function deleteCommentHandler (commentId: number) {
      if (post.value) {
        post.value.comments = post.value.comments?.filter(comment => comment.id !== commentId)
      }
    }

    function incrementPostLikeHandler () {
      if (!isLiked.value && post.value) {
        incrementPostLike(post.value.id).then((res) => {
          post.value?.likes.push(res?.data)
          isLiked.value = true
        })

        const message = `Кто-то лайкнул пост <span>${post.value.title}</span>`
        createNotificationHandler(message)
      }
    }

    return {
      postDate,
      APIUrl,
      showOptions,
      isPostLoading,
      post,
      Tabs,
      currentTab,
      handleComment,
      deleteCommentHandler,
      postTags,
      incrementPostLikeHandler,
      isLiked,
      store
    }
  }
})
</script>

<style lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.comment-list-enter-active,
.comment-list-leave-active {
  transition: all 0.5s ease;
}
.comment-list-enter-from,
.comment-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-detail {
  margin-bottom: 160px;

  overflow-x: hidden;

  .section-title {
    font-size: 32px;
    margin-bottom: 0;

    @include breakpoint($sm-width) {
      margin-bottom: 20px;
    }
  }

  .post-detail__header {
    margin-bottom: 30px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include breakpoint($sm-width) {
      flex-direction: column;
      margin-bottom: 15px;
    }
  }

  .post-detail__header__end {
    margin-top: 8px;
    display: flex;
    align-items: center;

    @include breakpoint($sm-width) {
      align-self: start;
      width: 100%;
      justify-content: space-between;
    }
  }

  .post-detail__date {
    margin-right: 25px;

    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #A5A5A5;
  }

  .post-detail__image {
    margin-bottom: 30px;
    width: 100%;
    max-height: 450px;

    border-radius: 25px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
    }
  }

  .post-detail__tags {
    display: flex;
    margin: 0 -10px;
    margin-bottom: 30px;
  }

  .post-detail__content {
    font-family: inherit;
    margin-bottom: 100px;

    p {
      max-width: 750px;

      font-weight: 400;
      font-size: 18px;
      line-height: 150%;

      letter-spacing: 0.03em;
    }

    h1 {
      max-width: 800px;

      font-weight: 400;
      font-size: 28px;
      line-height: 28px;
      letter-spacing: 0.02em;
    }

    h3 {
      font-size: 24px;
    }

    img {
      max-width: 100%;
    }

    a {
      color: inherit;
    }

    blockquote {
      max-width: 700px;
      padding-left: 30px;

      font-style: italic;
      font-size: 24px;

      color: #6a6969;
      border-left: 2px solid #6a6969;

      p {
        font-size: 24px;
      }
    }

    ul, ol {
      padding: 20px 0 0 20px;
      font-size: 18px;

      li {
        padding: 5px 0;
      }
    }
  }

  .post-detail__tabs {
    margin-bottom: 50px;
    display: flex;

    border-bottom: 1px solid #BFBFBF;;

    .post-detail__tabs-title {
      cursor: pointer;
      position: relative;

      margin-right: 70px;
      padding-bottom: 20px;
      display: inline-block;

      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 30px;

      color: #000000;

      &::before {
        content: '';
        position: absolute;
        bottom: -2%;
        height: 2px;
        width: 100%;

        background: black;
        opacity: 0;
        transition: all 0.2s linear;
      }

      &.active,
      &:hover {
        &::before {
          opacity: 1;
        }
      }

      &:last-of-type {
        margin-right: 0;
      }

      @include breakpoint($sm-width) {
        font-size: 20px;
        margin-right: 50px;
      }
    }
  }
}

.no-posts {
  margin-top: 100px;
  text-align: center;

  h2 {
    margin-bottom: 30px;
  }
}
</style>
