<template>
  <div class='confirm-modal'>
    <h4 class='confirm-modal__title'>{{ title }}</h4>
    <div class="confirm-modal__btns">
      <button-component @click="$emit('confirm')">Да</button-component>
      <button-component class="red" @click="$emit('decline')">Нет</button-component>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
export default {
  name: 'ConfirmModal',
  components: { ButtonComponent },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.confirm-modal {
  text-align: center;

  .confirm-modal__title {
    margin-bottom: 50px;

    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.02em;
  }

  .red {
    color: #FF3A3A;
  }

  .confirm-modal__btns {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 45%;
  }
}
</style>
