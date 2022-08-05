import { DirectiveBinding } from 'vue'

interface Binding {
  callback: () => void,
  totalPages: number,
  currentPage: number
}

export default {
  mounted (el: HTMLElement, binding: DirectiveBinding<Binding>) {
    const totalPages = binding.value.totalPages
    const currentPage = binding.value.currentPage

    const options = {
      rootMargin: '10px',
      threshold: 1.0
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        binding.value.callback()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  name: 'intersection'
}
