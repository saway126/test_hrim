<!-- src/views/EmployeeRegisterView.vue -->
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
  
      <!-- 우측 회원가입 폼 -->
      <div class="w-1/2 flex justify-center items-center bg-white">
        <div class="w-[400px] border-2 border-blue-300 rounded-xl p-8">
          <h2 class="text-xl font-bold text-blue-500 text-center mb-6">HRIM</h2>
  
          <form @submit.prevent="submitForm" class="space-y-4">
            <input v-model="form.name" type="text" placeholder="이름" class="input" />
            <input v-model="form.username" type="text" placeholder="아이디" class="input" />
            <input v-model="form.password" type="password" placeholder="비밀번호" class="input" />
            <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="input" />
            <input v-model="form.email" type="email" placeholder="이메일" class="input" />
            <input v-model="form.companyCode" type="text" placeholder="회사코드" class="input" />
            <input v-model="form.employeeCode" type="text" placeholder="사원코드(선택)" class="input" />
  
            <button type="submit" class="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50">
              회원가입
            </button>
  
            <router-link to="/login" class="block mt-2 w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              로그인
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    companyCode: '',
    employeeCode: ''
  })
  
  const submitForm = () => {
    if (form.value.password !== form.value.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
  
    console.log('사원 회원가입 정보:', form.value)
    alert('회원가입 완료!')
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
  }
  </style>
  