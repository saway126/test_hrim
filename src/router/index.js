import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
import AdminUserApprovalView from '../views/AdminUserApprovalView.vue'
import AdminUserSearchView from '../views/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../views/AdminPermissionTransferView.vue'
//import CompanyRegisterView from '../views/CompanyRegisterView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import FindIdView from '../views/FindIdView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'





const routes = [
  { path: '/login', component: AdminLoginView }, // 하나만!
  { path: '/signup', component: SignUpForm },
  { path: '/admin/user-approval', component: AdminUserApprovalView },
  { path: '/admin/user-search', component: AdminUserSearchView },
  { path: '/admin/user-permission', component: AdminPermissionTransferView },
  { path: '/login', component: AdminLoginView },
  { path: '/signup', component: SignUpForm },
  { path: '/find-id', component: FindIdView }, // ✅ 아이디 찾기 라우트 추가
  { path: '/reset-password', component: ResetPasswordView }
  // CompanyRegisterView는 추후 복구
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
