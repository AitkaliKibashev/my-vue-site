<template>
  <textarea class="textarea" :value="modelValue" @input="updateTextarea" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextareaComponent',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateTextarea (event: Event) {
      const target = event.target as HTMLTextAreaElement
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>

<style scoped lang="scss">
.textarea {
  min-height: 160px;
  padding: 10px 20px;

  font-size: 16px;
  font-family: inherit;

  border: 1px solid #000000;
  border-radius: 30px;
  resize: vertical;
  background-color: transparent;
}

</style>
