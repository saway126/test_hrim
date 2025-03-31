import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
import AdminDetail from '../components/AdminDetail.vue' // 추가

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignUpForm },
  { path: '/admin/:id', component: AdminDetail }, // 관리자 상세 페이지
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
