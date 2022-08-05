import { ref } from 'vue'
import { adminAPI } from '@/api/API'
import { useStore } from 'vuex'

export function useLogin () {
  const loginError = ref('')
  const store = useStore()

  const login = async (data: {username: string, password: string}) => {
    try {
      const response = await adminAPI.adminLogin(data)

      localStorage.setItem('token', response.data.token)
      store.commit('setAdminAuth', true)

      if (loginError.value) {
        loginError.value = ''
      }
    } catch (e) {
      loginError.value = 'Произошла ошибка при входе'
    }
  }

  return {
    loginError,
    login
  }
}
