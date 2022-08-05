import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PortfolioPage from '@/pages/PortfolioPage.vue'
import TagsPage from '@/pages/TagsPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
const AdminPage = () => import('@/pages/AdminPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/post/:id',
    name: 'postDetail',
    component: PostDetail
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioPage
  },
  {
    path: '/tags',
    name: 'tags',
    component: TagsPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
