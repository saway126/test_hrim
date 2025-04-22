import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', component: HomeView },

  // 로그인 & 인증
  { path: '/login', component: AdminLoginView },
  { path: '/find-id', component: FindIdView },
  { path: '/reset-password', component: ResetPasswordView },
  { path: '/change-password', component: ChangePasswordView },

  // 관리자 기능
  { path: '/admin/user-approval', component: AdminUserApprovalView },
  { path: '/admin/user-search', component: AdminUserSearchView },
  { path: '/admin/user-permission', component: AdminPermissionTransferView },

  // 회원가입
  { path: '/register/company', component: CompanyRegisterView },
  { path: '/register/employee', component: EmployeeRegisterView },

  // 활동 인증
  { path: '/admin/activity-manage', component: ActivityManageView },
  { path: '/admin/activity-campaign', component: ActivityCampaignView },

  // 대시보드
  { path: '/dashboard', component: DashboardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
