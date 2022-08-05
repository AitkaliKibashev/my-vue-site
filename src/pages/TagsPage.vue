<template>
  <section class="tags-page">
    <div class="container">
      <h1 class="section-title">Тэги</h1>

      <spinner-component v-if="isTagsLoading" />

      <div class="tags-page__tags">
        <tag-component
          v-for="tag in tags"
          :key="tag.id"
          :title="tag.title"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TagComponent from '@/components/TagComponent.vue'
import { useTags } from '@/hooks/tag/useTags'
import SpinnerComponent from '@/components/UI/Spinner.vue'

export default defineComponent({
  name: 'TagsPage',
  components: { SpinnerComponent, TagComponent },
  setup () {
    const { tags, isTagsLoading } = useTags()

    return {
      tags,
      isTagsLoading
    }
  }
})
</script>

<style scoped lang="scss">
.tags-page {
  .tags-page__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -10px;
    margin-bottom: 80px;

    & > * {
      margin: 10px 10px 10px 5px;
    }
  }
}
</style>
