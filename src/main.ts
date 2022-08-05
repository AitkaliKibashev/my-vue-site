import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/main.scss'
import directives from '@/directives'
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(store).use(router).use(CKEditor).mount('#app')
