import { createRouter, createWebHistory } from 'vue-router'

// 로그인 및 인증 관련
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import FindIdView from '../views/auth/FindIdView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'
import ChangePasswordView from '../views/auth/ChangePasswordView.vue'

// 홈
import HomeView from '../views/home/HomeView.vue'

// 회원가입
import CompanyRegisterView from '../views/register/CompanyRegisterView.vue'
import EmployeeRegisterView from '../views/register/EmployeeRegisterView.vue'

// 관리자 관련
import AdminUserApprovalView from '../views/admin/AdminUserApprovalView.vue'
import AdminUserSearchView from '../views/admin/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../views/admin/AdminPermissionTransferView.vue'

// 활동 인증 관리
import ActivityManageView from '../views/activity/ActivityManageView.vue'
import ActivityCampaignView from '../views/activity/ActivityCampaignView.vue'

// 대시보드
import DashboardView from '../views/dashboard/DashboardView.vue'

// 컴포넌트 (필요 시 모달이나 테이블만 import)
import BusinessCertModal from '../views/admin/components/BusinessCertModal.vue'
// import PermissionTable from '../views/admin/components/PermissionTable.vue'

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
