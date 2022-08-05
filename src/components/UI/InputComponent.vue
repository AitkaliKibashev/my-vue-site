<template>
  <input class="input" :value="modelValue" type="text" @input="updateInput">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputComponent',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput (event: Event) {
      const target = (event.target as HTMLInputElement)
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>

<style scoped lang="scss">
.input {
  padding: 10px 20px;

  font-size: 16px;
  font-family: inherit;

  border: 1px solid #000000;
  border-radius: 50px;
  background-color: transparent;
}
</style>
