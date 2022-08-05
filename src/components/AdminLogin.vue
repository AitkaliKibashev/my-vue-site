<template>
  <section class='admin-login'>
    <div class="container">
      <h1 class="section-title">Войти</h1>
      <h2 v-if="loginError">{{loginError}}</h2>
      <form @submit.prevent="login({ username, password })">
        <input-component
          placeholder='Логин'
          v-model="username"
        />
        <input-component
          type="password"
          placeholder='Пароль'
          v-model="password"
        />
        <button-component>Войти</button-component>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import ButtonComponent from './UI/ButtonComponent.vue'
import InputComponent from './UI/InputComponent.vue'
import { defineComponent, ref } from 'vue'
import { useLogin } from '@/hooks/admin/useLogin'
export default defineComponent({
  name: 'AdminLogin',
  components: { InputComponent, ButtonComponent },
  setup () {
    const username = ref('')
    const password = ref('')
    const { loginError, login } = useLogin()

    return {
      username,
      password,
      login,
      loginError
    }
  }
})
</script>

<style scoped lang="scss">
.admin-login {
  .section-title {
    text-align: center;
  }

  form {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
