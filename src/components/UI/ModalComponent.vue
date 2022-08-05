<template>
  <div class="modal" :class="{active: show}" @click="$emit('closeModal')">
    <div class="modal__content" @click.stop>
      <h2 class="modal__title">{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ModalComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  z-index: -1;
  background-color: rgba(0,0,0, 0.4);
  transition: all 0.2s ease-in-out;

  &.active {
    opacity: 1;
    z-index: 1;

    .modal__content {
      transform: scale(1);
    }
  }

  .modal__content {
    padding: 50px 90px;

    transform: scale(0.2);
    background-color: white;
    transition: all 0.2s ease-in-out;
    border-radius: 25px;
  }

  .modal__title {
    margin-bottom: 35px;

    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.02em;
  }
}
</style>
