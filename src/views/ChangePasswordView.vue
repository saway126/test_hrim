<!-- src/views/ChangePasswordView.vue -->
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
  
      <!-- 우측 비밀번호 재설정 -->
      <div class="w-1/2 flex justify-center items-center bg-white">
        <div class="w-[400px] border-2 border-blue-300 rounded-xl p-8">
          <h2 class="text-xl font-semibold text-center mb-6">비밀번호 재설정</h2>
  
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="text-sm text-gray-700 block mb-1">비밀번호 재설정</label>
              <input v-model="form.password" type="password" placeholder="새로운 비밀번호" class="input" />
              <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="input mt-2" />
            </div>
  
            <button type="submit"
                    class="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50">
              비밀번호 변경
            </button>
          </form>
  
          <div class="mt-4 text-center text-sm text-gray-500">
            <router-link to="/login" class="hover:underline">로그인</router-link>
            &nbsp;|&nbsp;
            <router-link to="/find-id" class="hover:underline">아이디찾기</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    password: '',
    confirmPassword: ''
  })
  
  const changePassword = () => {
    if (form.value.password !== form.value.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
  
    console.log('비밀번호 변경:', form.value.password)
    alert('비밀번호가 성공적으로 변경되었습니다.')
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
  }
  </style>
  