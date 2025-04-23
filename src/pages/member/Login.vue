<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useMemberStore } from '../../stores/useMemberStore';
import LogoSection from "../common/LogoSection.vue";

const memberStore = useMemberStore();
const router = useRouter();
const form = ref({
  memberId: '',
  password: '',
  way: '0',
});

const goToFindId = () => router.push("/findId");
const goToResetPassword = () => router.push("/resetPassword");
const goToCompanyRegister = () => router.push("/companySignup");
const goToEmployeeRegister = () => router.push("/employeeSignup");

const login = async () => {
  console.log("login clicked")
  const response = await memberStore.login(form.value);
  console.log(response);
  if (response.status == 200) {
    router.push("/")
  } else {
    alert("계정이 존재하지 않거나 비밀번호가 틀렸습니다.")
  }
}


</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 왼쪽 로고 영역 -->
    <LogoSection />

    <!-- 로그인 영역 -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-center mb-6 text-xl text-gray-800 font-semibold">
          IMHR에 오신 걸 환영합니다.
        </h2>

        <form @submit.prevent="login">
          <label class="block mb-2 text-sm text-gray-700">ID</label>
          <input
            v-model="form.memberId"
            type="text"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <label class="block mb-2 text-sm text-gray-700">비밀번호</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <!-- 권한 선택 -->
          <div class="flex items-center space-x-4 mb-4 text-sm text-gray-700">
            <label class="flex items-center">
              <input
                type="radio"
                name="role"
                value="0"
                checked
                class="mr-1"
                v-model="form.way"
              />
              관리자
            </label>
            <label class="flex items-center">
              <input type="radio" name="role" value="1" class="mr-1" v-model="form.way"/>
              임직원
            </label>
          </div>

          
          <button
            type="submit"
            class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition"
          >
            로그인
          </button>
          
        </form>

        <!-- 회원가입 버튼 영역 -->
        <div class="flex flex-col gap-2 mt-4">
          <button
            @click="goToCompanyRegister"
            class="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
          >
            기업 회원가입
          </button>
          <button
            @click="goToEmployeeRegister"
            class="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
          >
            임직원 회원가입
          </button>
        </div>

        <!-- 하단 링크 -->
        <div class="flex justify-between text-sm mt-4 text-slate-400">
          <button @click="goToFindId" class="hover:underline">
            아이디 찾기
          </button>
          <span>|</span>
          <button @click="goToResetPassword" class="hover:underline">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
