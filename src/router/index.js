import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/BusinessCertModal.vue'
import AdminUserApprovalView from '../views/AdminUserApprovalView.vue'
import AdminUserSearchView from '../views/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../views/AdminPermissionTransferView.vue'
import CompanyRegisterView from '../views/CompanyRegisterView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import FindIdView from '../views/FindIdView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import HomeView from '../views/HomeView.vue'
import EmployeeRegisterView from '../views/EmployeeRegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ActivityManageView from '../views/ActivityManageView.vue'
import CampaignActivityView from '../views/CampaignActivityView.vue'


const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: AdminLoginView },
  { path: '/signup', component: SignUpForm },
  { path: '/admin/user-approval', component: AdminUserApprovalView },
  { path: '/admin/user-search', component: AdminUserSearchView },
  { path: '/admin/user-permission', component: AdminPermissionTransferView },
  { path: '/find-id', component: FindIdView },
  { path: '/reset-password', component: ResetPasswordView },
  { path: '/change-password', component: ChangePasswordView },
  { path: '/register/company', component: CompanyRegisterView }, // 만들었다면 사용
  { path: '/register/employee', component: SignUpForm },
  { path: '/register/employee', component: EmployeeRegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/admin/activity-manage', name: 'activity-manage', component: ActivityManageView },
  { path: '/admin/campaign-activity', name: 'CampaignActivity', component: CampaignActivityView },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
