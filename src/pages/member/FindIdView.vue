<script setup>
import { ref } from 'vue'
import LogoSection from '../common/LogoSection.vue'
import { useMemberStore } from '../../stores/useMemberStore'

const memberStore = useMemberStore();

const form = ref({
  name: '',
  email: '',
  way: '0',
})

const submit = async () => {
  console.log('입력된 정보:', form.value)
  const response = await memberStore.findId(form.value)
  if(response.data.isSuccess)
    alert('이메일 전송 완료!')
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 좌측 브랜드 영역 -->
    <LogoSection />

    <!-- 우측 ID 찾기 폼 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">아이디 찾기</h2>

        <form @submit.prevent="submit" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="이름" class="input" />
          <input v-model="form.email" type="email" placeholder="이메일" class="input" />
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
          <button type="submit"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
            이메일 전송 요청
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">로그인</router-link>
          &nbsp;|&nbsp;
          <router-link to="/resetpassword" class="hover:underline">비밀번호 재설정</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500;
}
</style>
