import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
import AdminUserApprovalView from '../views/AdminUserApprovalView.vue'
import AdminUserSearchView from '../views/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../views/AdminPermissionTransferView.vue'





const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignUpForm },
  { path: '/admin/user-approval', name: 'admin-user-approval', component: AdminUserApprovalView },
  {
    path: '/admin/user-search',
    name: 'admin-user-search',
    component: AdminUserSearchView
  },
  {
    path: '/admin/user-permission',
    name: 'admin-user-permission',
    component: AdminPermissionTransferView
  }
  
  
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
