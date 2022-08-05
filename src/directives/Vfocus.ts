import { DirectiveBinding } from 'vue'

export default {
  mounted (el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value) {
      el.focus()
    }
  },
  updated (el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value) {
      el.focus()
    }
  },
  name: 'focus'
}
