import { createWebHistory, createRouter } from 'vue-router';

// 로그인 & 인증
import Login from '../pages/member/Login.vue';
import FindIdView from '../pages/member/FindIdView.vue'
import ResetPasswordView from '../pages/member/ResetPasswordView.vue'
import ChangePasswordView from '../pages/member/ChangePasswordView.vue'

// 회원가입
import CompanyRegisterView from '../pages/member/CompanyRegisterView.vue'
import EmployeeRegisterView from '../pages/member/EmployeeRegisterView.vue'

// 관리자
import PermissionSetting from '../pages/Staff/PermissionSetting.vue';
import StaffSearch from '../pages/Staff/StaffSearch.vue';
import StaffDetail from '../pages/Staff/StaffDetail.vue';
import DepartmentSetting from '../pages/department/DepartmentSetting.vue'

// 활동
import AllActivityDetails from '../pages/esg/AllActivityDetails.vue'
import ActivityList from '../pages/esg/ActivityList.vue'
import CampaignList from '../pages/esg/CampaignEventList.vue';
import CampaignMemberAdd from '../pages/esg/CampaignMemberAdd.vue';

// 교육
import EducationList from '../pages/esg/EducationList.vue'

// 보고서
import ReportListView from '../pages/report/reportList.vue'
import ReportDetailView from '../pages/report/reportDetail.vue'

// 제품
import ProductListView from '../pages/product/productList.vue'
import ProductDetailView from '../pages/product/productDetail.vue'
import ProductRegistView from '../pages/product/ProductRegist.vue'

// 캘린더
import Calendar from '../pages/Calendar/Calendar.vue';

// 대시보드 & 파트너
import DashboardView from '../pages/dashboard/Dashboard.vue';
import PartnerDashboard from '../pages/dashboard/PartnerDashboard.vue';
import PartnerListView from '../pages/partner/partnerList.vue';

// 피드백
import FeedbackForm from '../pages/feedback/FeedbackForm.vue';
import FeedbackDetail from '../pages/feedback/FeedbackDetail.vue';

// 마이페이지
import MyPageView from '../pages/mypage/MyPageView.vue';

const routes = [
  {
    path: '/',
    name: 'homeRedirect',
    beforeEnter: (to, from, next) => {
      const companyId = 1;
      if (companyId) {
        next(`/partner/${companyId}`);
      } else {
        next(`/partner/${companyId}`); // 또는 next('/login')
      }
    }
  },
  {
    path: '/dashboard/1',
    name: 'dashboard',
    component: DashboardView
  },

  // 로그인 & 인증
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { hideLayout: true }
  },
  {
    path: '/findId',
    name: 'findId',
    component: FindIdView,
    meta: { hideLayout: true }
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPasswordView,
    meta: { hideLayout: true }
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePasswordView,
    meta: { hideLayout: true }
  },
  {
    path: '/changePassword/:uuid',
    name: 'changePasswordUuid',
    component: ChangePasswordView,
    meta: { hideLayout: true }
  },

  // 회원가입
  {
    path: '/companySignup',
    name: 'companyRegister',
    component: CompanyRegisterView,
    meta: { hideLayout: true }
  },
  {
    path: '/employeeSignup',
    name: 'employeeRegister',
    component: EmployeeRegisterView,
    meta: { hideLayout: true }
  },

  // 관리자
  {
    path: '/staffSearch',
    name: 'staffSearch',
    component: StaffSearch
  },
  {
    path: '/staffDetail/:id',
    name: 'staffDetail',
    component: StaffDetail,
    props: true
  },
  {
    path: '/permissionSetting/:id',
    name: 'permissionSetting',
    component: PermissionSetting,
    props: true
  },

  // 활동
  {
    path: '/activityList',
    name: 'ActivityList',
    component: ActivityList
  },
  {
    path: '/activeDetails/:idx',
    name: 'allActivityDetails',
    component: AllActivityDetails
  },

  // 캘린더
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    props: true,
  },
  {
    path: '/campaignlist',
    name: 'campaignList',
    component: CampaignList
  },
  {
    path: '/memberadd/:idx',
    name: 'memberadd',
    component: CampaignMemberAdd
  },

  // 보고서
  {
    path: '/reportsList/1',
    name: 'reportList',
    component: ReportListView
  },
  {
    path: '/reports/1',
    name: 'reportDetail',
    component: ReportDetailView
  },

  // 교육
  {
    path: '/educationList/1',
    name: 'EducationList',
    component: EducationList
  },

  // 파트너사
  {
    path: '/partnerList/1',
    name: 'partnerList',
    component: PartnerListView
  },
  {
    path: '/partner/1',
    name: 'partnerDashboard',
    component: PartnerDashboard,
    props: true
  },

  // 부서 설정
  {
    path: '/departmentSetting/1',
    name: 'DepartmentSetting',
    component: DepartmentSetting
  },

  // 피드백
  {
    path: '/feedbackForm/1',
    name: 'feedbackForm',
    component: FeedbackForm,
  },
  {
    path: '/feedback/:id',
    name: 'feedbackDetail',
    component: FeedbackDetail,
    props: true
  },

  // 제품 등록
  {
    path: '/productRegist',
    name: 'productRegist',
    component: ProductRegistView
  },

  // 제품 목록 (회사별)
  {
    path: '/productList/:idx',
    name: 'ProductList',
    component: ProductListView,
    props: true,
  },

  // 제품 상세 (회사 idx + 제품 idx)
  {
    path: '/productDetail/:idx',
    name: 'productDetail',
    component: ProductDetailView,
    props: true,
  },

  // 마이 페이지
  {
    path: '/mypage',
    name: 'myPage',
    component: MyPageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
