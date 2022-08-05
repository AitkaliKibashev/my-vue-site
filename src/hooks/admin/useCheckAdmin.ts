import { adminAPI } from '@/api/API'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export function useCheckAdmin () {
  const store = useStore()

  const checkAdminAuth = async () => {
    try {
      await adminAPI.checkAdmin()

      store.commit('setAdminAuth', true)
    } catch (e) {
      store.commit('setAdminAuth', false)
    }
  }

  onMounted(checkAdminAuth)
}
