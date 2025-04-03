<template>
  <div class="flex h-screen">
    <!-- 좌측 설명 -->
    <div class="w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col justify-center items-center">
      <h1 class="text-5xl font-bold mb-4">IM HR</h1>
      <p class="text-lg text-center w-3/4 leading-relaxed">
        기업의 모든 이해 관계자 가치를 높이고 <br />
        지속가능한 미래를 실현합니다.
      </p>
    </div>

    <!-- 우측 로그인 폼 -->
    <div class="w-1/2 flex justify-center items-center bg-white">
      <div class="w-[400px] border-2 border-blue-300 rounded-xl p-8">
        <p class="text-center text-gray-600 mb-4">
          <span class="text-blue-600 font-semibold">IMHR</span>에 오신 걸 환영합니다.
        </p>

        <form @submit.prevent="login" class="space-y-4">
          <input v-model="form.email" type="email" placeholder="이메일" class="input" />
          <input v-model="form.password" type="password" placeholder="비밀번호" class="input" />

          <!-- 역할 선택 -->
          <div class="flex justify-between items-center text-sm text-gray-700">
            <label><input type="radio" value="admin" v-model="form.role" /> 관리자</label>
            <label><input type="radio" value="employee" v-model="form.role" /> 임직원</label>
          </div>

          <button type="submit"
                  class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            로그인
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-gray-500">
          <router-link to="/find-id" class="hover:underline">아이디 찾기</router-link>
          &nbsp;|&nbsp;
          <router-link to="/reset-password" class="hover:underline">비밀번호 재설정</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  email: '',
  password: '',
  role: 'admin'
})

const login = () => {
  console.log('로그인 정보:', form.value)
  alert('로그인 시도')
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
}
</style>
