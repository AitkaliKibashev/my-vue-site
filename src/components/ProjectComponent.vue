<template>
  <div class='project'>
    <div class="project__image" v-if="project.image">
      <img :src="APIUrl + project.image" :alt="project.title"/>
    </div>

    <div class="project__row-content">
      <div class="project__header">
        <h2 class="project__title">{{ project.title }}</h2>
        <div class="project__header__end">
          <p class="project__date">{{ projectDate.toLocaleDateString() }}</p>
          <likes-component
            :likes="project.likes?.length"
            :like-btn-click-handler="handleProjectLikeIncrement"
            :is-liked="isLiked"
          />
          <options-btn @click.stop="showOptions = !showOptions" v-if="store.state.isAdminAuth"/>
          <options-component
            :show="showOptions"
            @delete="showModal = true"
            @edit="setEditProject"
          />
        </div>
      </div>

      <p class="project__text" v-html="project.content" />

      <div class="project__footer" v-if="project.link">
        <a :href="project.link" target='_blank' rel='noreferrer'>
          Ссылка на проект
        </a>
      </div>

    </div>

    <modal-component
      :title="'Подтвердить действие'"
      :show="showModal"
      @closeModal="showModal = false"
    >
      <confirm-modal
        :title="'Вы действительно хотите удалить этот пост?'"
        @decline="showModal = false"
        @confirm="handleDeleteProject"
      />
    </modal-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ConfirmModal from '@/components/UI/ConfirmModal.vue'
import ModalComponent from '@/components/UI/ModalComponent.vue'
import OptionsComponent from '@/components/UI/OptionsComponent.vue'
import OptionsBtn from '@/components/UI/OptionsBtn.vue'
import LikesComponent from '@/components/UI/LikesComponent.vue'
import { Project } from '@/types/Project'
import { APIUrl } from '@/api/API'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { deleteProject } from '@/api/project/deleteProject'
import incrementProjectLike from '@/api/project/incrementProjectLike'

export default defineComponent({
  name: 'ProjectComponent',
  components: { ConfirmModal, ModalComponent, OptionsComponent, OptionsBtn, LikesComponent },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const projectDate = new Date(props.project.published_date)
    const showOptions = ref(false)
    const showModal = ref(false)
    const isLiked = ref(false)

    function setEditProject () {
      store.commit('setEditProject', props.project)
      router.push('/admin?project=true')
    }

    function handleDeleteProject () {
      deleteProject(props.project.id)
      showModal.value = false
      store.dispatch('deleteProject', props.project.id)
    }

    function handleProjectLikeIncrement () {
      if (!isLiked.value) {
        incrementProjectLike(props.project.id).then((res) => {
          store.dispatch('incrementProjectLike', res?.data)
          isLiked.value = true
        })
      }
    }

    return {
      projectDate,
      showOptions,
      showModal,
      APIUrl,
      setEditProject,
      handleDeleteProject,
      handleProjectLikeIncrement,
      isLiked,
      store
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/style/vars";
@import "../assets/style/mixins";

.project {
  margin-bottom: 100px;
  width: 100%;

  background: #FFFFFF;
  border-radius: 30px;

  .project__row-content {
    width: 100%;
    padding: 40px;

    @include breakpoint($sm-width) {
      padding: 10px;
    }
  }

  .project__image {
    width: 100%;

    border-radius: 25px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
      border-radius: 25px;
    }

    @include breakpoint($sm-width) {
      margin-bottom: 15px;
    }
  }

  .project__header {
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include breakpoint($sm-width) {
      flex-direction: column;
      align-items: normal;
    }
  }

  .project__header__end {
    position: relative;
    display: flex;
    align-items: center;

    @include breakpoint($sm-width) {
      justify-content: flex-end;
      margin-bottom: 10px;

      .project__date {
        margin-right: auto;
      }
    }
  }

  .project__title {
    margin-right: 30px;

    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.02em;

    @include breakpoint($sm-width) {
      margin-bottom: 10px;
    }
  }

  .project__date {
    margin-right: 25px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #A5A5A5;
  }

  .project__text {
    margin-bottom: 50px;

    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.03em;

    @include breakpoint($sm-width) {
      font-size: 16px;
      margin-bottom: 40px;
    }

    ol, ul {
      padding: 10px 30px;
    }
  }

  .project__footer {
    display: flex;
    flex-direction: row;

    a {
      width: 100%;

      font-size: 20px;

      color: #4a3aff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
