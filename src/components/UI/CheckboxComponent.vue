<template>
  <label>
    <input :checked="modelValue" @change="updateInput" type="checkbox">
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxComponent',
  props: {
    modelValue: Boolean
  },
  methods: {
    updateInput (event: Event) {
      const target = (event.target as HTMLInputElement)
      this.$emit('update:modelValue', target.checked)
    }
  }
})
</script>

<style scoped lang="scss">
label {
  width: fit-content;
  padding: 10px 20px;
  display: flex;
  align-items: center;

  font-size: 16px;

  border: 1px solid #000;
  border-radius: 30px;

  input {
    margin-right: 10px;
  }
}
</style>
