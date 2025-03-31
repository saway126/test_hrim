import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'

// 관리자 상세 관련 분할 컴포넌트
import AdminProfile from '../components/AdminProfile.vue'
import AdminPermissions from '../components/AdminPermissions.vue'
import AdminLogs from '../components/AdminLogs.vue'
import AdminDeactivate from '../components/AdminDeactivate.vue'
import AdminMgmtUpdateCycle from '../components/AdminMgmtUpdateCycle.vue'
import AdminPartnerCycle from '../components/AdminPartnerCycle.vue'

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignUpForm },
  { path: '/admin/:id/profile', component: AdminProfile },
  { path: '/admin/:id/permissions', component: AdminPermissions },
  { path: '/admin/:id/logs', component: AdminLogs },
  { path: '/admin/:id/deactivate', component: AdminDeactivate },
  { path: '/admin/:id/mgmt-update-cycle', component: AdminMgmtUpdateCycle },
  { path: '/admin/:id/partner-cycle', component: AdminPartnerCycle },
  { path: '/', redirect: '/login' }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
