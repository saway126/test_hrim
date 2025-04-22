<script setup>
import { onMounted, ref } from 'vue'
import { useMemberStore } from '../../stores/useMemberStore'
import { useRoute, useRouter } from 'vue-router';

const memberStore = useMemberStore();
const route = useRoute();
const router = useRouter();
const user = ref({})

let memberIdx = route.params.id;

const departments = ref([]);

const save = async () => {
  let form = {
    department: user.value.department,
    isAdmin: user.value.isAdmin,
    hasProdAuth: user.value.hasProdAuth,
    hasPartnerAuth: user.value.hasPartnerAuth,
    hrRoles: user.value.hrRoles,
  }
  console.log(form);
  const response = await memberStore.staffModify(user.value.idx, form);
  if(response.data.isSuccess) {
    alert('✅ 회원 정보 수정 완료!');
    router.go(0);
  }
  
}

const terminate = () => {
  const confirmed = confirm('정말 탈퇴 처리하시겠습니까?')
  if (confirmed) {
    alert('❌ 탈퇴 처리 완료')
  }
}
onMounted(async () => {
  const response = await memberStore.staffDetail(memberIdx);
  console.log(response);
  user.value = response.data.data.info;
  departments.value = response.data.data.departments;
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- 메인 영역 -->
    <main class="flex-1 bg-gray-100 p-6 md:p-10">
      <!-- 프로필 카드 -->
      <div class="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row justify-between gap-8">
        <!-- 왼쪽: 프로필 정보 -->
        <div class="flex-1 space-y-4">
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ user.name }}</h3>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
          <div>
            <label class="block text-sm mb-1 text-gray-700">부서 선택</label>
            <select v-model="user.department" class="w-full border px-4 py-2 rounded">
              <option disabled value="">부서를 선택하세요</option>
              <option v-for="dept in departments" :value="dept" :key="dept">{{ dept.name }}</option>
            </select>
          </div>
          <p class="text-sm text-gray-400 mt-2">등록일: {{ user.joinedAt }}</p>
        </div>

        <!-- 오른쪽: 접근 권한 섹션 -->
        <div class="flex-1">
          <h4 class="font-semibold text-lg mb-4">접근 권한</h4>
          <div class="mb-6">
            <!-- 그룹 타이틀 -->
            <h5 class="font-bold mb-2">관리자 권한</h5>
            <!-- 그리드 형태로 -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="user.isAdmin"
                  class="mr-2"
                />
                <label class="text-sm">관리자</label>
              </div>
            </div>
          </div>

          <div class="mb-6" v-if="!user.isAdmin">
            <!-- 그룹 타이틀 -->
            <h5 class="font-bold mb-2">인사 권한</h5>
            <!-- 인사 권한이면 스크롤 박스 처리 -->
            <div class="border p-2 max-h-40 overflow-y-auto">
              <div
                v-for="dept in departments"
                :key="dept"
                class="flex items-center mb-2"
              >
                <input
                  type="checkbox"
                  :value="String(dept.idx)"
                  v-model="user.hrRoles"
                  class="mr-2"
                />
                <label class="text-sm">{{ dept.name }}</label>
              </div>
            </div>
          </div>

          <div class="mb-6" v-if="!user.isAdmin">
            <!-- 그룹 타이틀 -->
            <h5 class="font-bold mb-2">경영 권한</h5>
            <!-- 기타 그룹은 그리드 형태로 -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="user.hasPartnerAuth"
                  class="mr-2"
                />
                <label class="text-sm">협력사 관리</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="user.hasProdAuth"
                  class="mr-2"
                />
                <label class="text-sm">친환경 제품 추적</label>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- 버튼 영역 -->
      <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
        <button
          @click="save"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          저장
        </button>
        <button
          @click="terminate"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          탈퇴
        </button>
      </div>
    </main>
  </div>
</template>
