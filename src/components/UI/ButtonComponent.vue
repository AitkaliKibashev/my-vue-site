<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent'
}
</script>

<style scoped lang="scss">
.btn {
  padding: 9px 22px;

  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.03em;
  font-family: inherit;

  color: #4A3AFF;
  background: #E8E6FF;
  border: 2px solid #E8E6FF;
  border-radius: 25px;

  transition: all 0.2s linear;
  cursor: pointer;

  &:hover {
    background-color: transparent;
  }
}
</style>
