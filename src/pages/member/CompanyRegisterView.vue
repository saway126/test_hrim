<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';
import LogoSection from '../common/LogoSection.vue';

const memberStore = useMemberStore();
const router = useRouter();

const form = ref({
  name: '',
  memberId: '',
  email: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  registrationNumber: ''
})

const file = ref(null);

const isModalOpen = ref(false)

// 파일 변경 핸들러
const handleFileChange = (event) => {
  file.value = event.target.files[0]
  if (file) {
    console.log('선택한 파일:', file)
  }
}

const fileInputRef = ref(null) // 숨겨진 input을 참조

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const submit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  console.log('기업 회원가입:', form.value)
  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(form.value)], { type: "application/json" }));
  if (file.value) {
    formData.append("file", file.value);
  }
  console.log(formData);
  const response = await memberStore.companySignup(formData);
  console.log(response);
  if(response.data.isSuccess){
    alert('회원가입이 완료되었습니다!');
    router.push("/login");
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <LogoSection />

    <!-- 회원가입 폼 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">관리자 회원 가입</h2>

        <form @submit.prevent="submit" class="space-y-3">
          <input v-model="form.name" type="text" placeholder="초기 관리자 이름" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.memberId" type="text" placeholder="초기 관리자 아이디" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.email" type="email" placeholder="초기 관리자 이메일" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.password" type="password" placeholder="초기 관리자 비밀번호" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.companyName" type="text" placeholder="회사명" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />
          <input v-model="form.registrationNumber" type="text" placeholder="사업자 등록 번호" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" />

          <!-- 사업자 등록 버튼 -->
          <button type="button"
                  @click="isModalOpen = true"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition font-semibold">
            사업자 등록 증명
          </button>

          <!-- 회원가입 -->
          <button type="submit"
                  class="w-full border border-slate-800 text-slate-800 py-2 rounded hover:bg-slate-100 transition font-semibold">
            회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">
            로그인
          </router-link>
        </div>
        
      </div>
    </div>
  </div>

  <!-- ✅ 사업자등록 모달 -->
  <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
      <h3 class="text-center font-semibold text-lg mb-4">사업자등록증명원을 첨부해주세요</h3>

      <!-- 이미지 안내 -->
      <div class="flex justify-center items-center gap-6 mb-4">
        <img src="/sample-doc-ok.png" alt="정상 증명서" class="w-24 h-32 object-contain" />
        <img src="/sample-doc-fail.png" alt="불량 증명서" class="w-24 h-32 object-contain" />
      </div>

      <!-- 파일 업로드 input (숨김 처리) -->
      <input ref="fileInputRef"
             type="file"
             accept="image/*,application/pdf"
             class="hidden"
             @change="handleFileChange" />

      <!-- 버튼으로 input 트리거 -->
      <button @click="triggerFileInput"
              class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition font-semibold">
        파일 선택
      </button>

      <!-- 파일명 표시 -->
      <p v-if="file" class="text-sm text-center mt-2 text-slate-600">
        선택된 파일: {{ file.name }}
      </p>

      <button @click="isModalOpen = false" class="mt-3 w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition font-semibold">
        확인
      </button>

      <!-- 닫기 -->
      <button @click="isModalOpen = false" class="absolute top-2 right-3 text-slate-500 hover:text-black text-lg">&times;</button>
    </div>
  </div>
</template>

<style scoped>
</style>