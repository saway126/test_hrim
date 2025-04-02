import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
import AdminUserApprovalView from '../views/AdminUserApprovalView.vue'



const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignUpForm },
  { path: '/admin/user-approval', name: 'admin-user-approval', component: AdminUserApprovalView }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
